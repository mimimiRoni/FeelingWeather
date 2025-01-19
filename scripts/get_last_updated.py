import urllib.request
import zipfile
import os
import json
from datetime import datetime

# JSONファイルのパス
CONFIG_FILE = "citiesdata.config.json"

# TODO:固定の文字列をconfig.jsonなどで設定してそれを読み込めるようにする
# TODO:ダウンロードURLなどもconfig.jsonで複数設定し、それぞれ更新日を比較してダウンロードするようにする
# →（今はすべてのデータをダウンロードしているので不要なデータがほとんど）
# ターゲットURL
URL = "https://catalog.registries.digital.go.jp/rc/dataset/ba000001"
DOWNLOAD_URL = "https://catalog.registries.digital.go.jp/rsc/address/address_all.csv.zip"
ZIP_FILE_NAME = "address_all.csv.zip"
EXTRACT_DIR = "citiesdata"

# 日付を比較するための関数
def is_update_available(last_update_date: str, new_date: str) -> bool:
    last_update = datetime.fromisoformat(last_update_date)
    new_update = datetime.fromisoformat(new_date)
    return new_update > last_update

# JSONファイルから比較用の日付を読み取る
def load_last_update_date(json_file: str) -> str:
    with open(json_file, "r", encoding="utf-8") as f:
        data = json.load(f)
        return data["lastUpdateDate"]

# JSONファイルに日付を保存する
def save_last_update_date(json_file: str, new_date: str):
    with open(json_file, "w", encoding="utf-8") as f:
        json.dump({"lastUpdateDate": new_date}, f, ensure_ascii=False, indent=4)

# ZIPファイルを再帰的に解凍する関数
def extract_zip(zip_file: str, extract_to: str):
    with zipfile.ZipFile(zip_file, "r") as zip_ref:
        zip_ref.extractall(extract_to)
        print(f"解凍しました: {zip_file} -> {extract_to}")
        
        # 解凍したフォルダ内のZIPファイルをさらに解凍
        for file_name in os.listdir(extract_to):
            file_path = os.path.join(extract_to, file_name)
            if file_name.endswith(".zip"):
                print(f"ZIPファイルを解凍: {file_path}")
                extract_zip(file_path, file_path.replace(".zip", ""))  # 再帰的に解凍

    # 解凍後にZIPファイルを削除
    os.remove(zip_file)
    print(f"解凍後にZIPファイルを削除しました: {zip_file}")

# メイン処理
def main():
    # JSONから比較用の日付を取得
    try:
        last_update_date = load_last_update_date(CONFIG_FILE)
    except FileNotFoundError:
        print(f"JSONファイル '{CONFIG_FILE}' が見つかりません。初期値を設定してください。")
        return
    except KeyError:
        print(f"JSONファイルに 'lastUpdateDate' キーがありません。")
        return

    # HTTPリクエストでHTMLを取得
    headers = {"Accept-Language": "ja_JP"}
    req = urllib.request.Request(URL, headers=headers)

    try:
        with urllib.request.urlopen(req) as res:
            body = res.read().decode("utf-8")
    except urllib.error.HTTPError as e:
        print(f"HTTPエラー: {e.reason}")
        return

    # HTMLから最終更新日を抽出
    start_idx = body.find('<th scope="row" class="dataset-label">最終更新日</th>')
    if start_idx == -1:
        print("最終更新日が見つかりませんでした。")
        return

    body_fragment = body[start_idx:]
    data_datetime_start = body_fragment.find('data-datetime="') + len('data-datetime="')
    data_datetime_end = body_fragment.find('"', data_datetime_start)
    latest_date_from_body = body_fragment[data_datetime_start:data_datetime_end]

    # UTCオフセット部分を修正 (+0000 -> +00:00)
    latest_date = latest_date_from_body[:-2] + ':' + latest_date_from_body[-2:]

    print(f"JSONファイルの最終更新日: {last_update_date}")
    print(f"Webページの最終更新日: {latest_date}")

    # 日付を比較
    if is_update_available(last_update_date, latest_date):
        print("更新が必要です。データをダウンロードします。")

        # データをダウンロード
        urllib.request.urlretrieve(DOWNLOAD_URL, ZIP_FILE_NAME)
        print(f"{ZIP_FILE_NAME} をダウンロードしました。")

        # ZIPファイルを解凍（再帰的に解凍）
        extract_zip(ZIP_FILE_NAME, EXTRACT_DIR)
        print(f"ZIPファイルを {EXTRACT_DIR} に解凍しました。")

        # ダウンロード成功後にJSONを更新
        save_last_update_date(CONFIG_FILE, latest_date)
        print(f"JSONファイルを更新しました。")
    else:
        print("更新の必要はありません。")

if __name__ == "__main__":
    main()
