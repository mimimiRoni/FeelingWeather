import csv
import json
import os

def load_csv_to_dict(file_path, key_column, required_columns):
    """
    CSVファイルを読み込み、指定したカラムを抽出して辞書に変換します。
    
    :param file_path: CSVファイルのパス
    :param key_column: 辞書のキーとして使用するカラム名
    :param required_columns: 必要なカラム名のリスト
    :return: 市区町村コードをキーにした辞書
    """
    data = {}
    
    with open(file_path, mode='r', newline='', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            key = row[key_column]
            data[key] = {col: row[col] for col in required_columns}
    
    return data

def merge_data(city_data, pos_data):
    """
    市区町村データと位置データを市区町村コードでマージします。
    
    :param city_data: 市区町村データの辞書（市区町村コードがキー）
    :param pos_data: 位置データの辞書（市区町村コードがキー）
    :return: マージされたデータ
    """
    merged_data = {}
    
    for city_code, city_info in city_data.items():
        if city_code in pos_data:
            merged_data[city_code] = {**city_info, **pos_data[city_code]}
    
    return merged_data

def convert_latitude_longitude_to_float(merged_data):
    """
    merged_data内の緯度と経度を数値（float）に変換します。
    
    :param merged_data: マージされたデータ（市区町村コードをキーとする辞書）
    :return: 緯度・経度が数値に変換されたデータ
    """
    for city_code, city_info in merged_data.items():
        # 緯度と経度を数値に変換
        if 'rep_lat' in city_info:
            city_info['rep_lat'] = float(city_info['rep_lat']) if city_info['rep_lat'] else None
        if 'rep_lon' in city_info:
            city_info['rep_lon'] = float(city_info['rep_lon']) if city_info['rep_lon'] else None
    return merged_data

def save_to_json(data, output_file):
    """
    データをJSONファイルとして保存します。
    
    :param data: 保存するデータ
    :param output_file: 出力するJSONファイルのパス
    """
    with open(output_file, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

def process_csv_files(input_folder, output_file):
    """
    指定されたフォルダ内のCSVファイルを処理し、必要なデータを抽出して1つのJSONファイルにまとめます。
    
    :param input_folder: 入力フォルダのパス
    :param output_file: 出力するJSONファイルのパス
    """
    # mt_city_all.csvの処理（市区町村コード、名前、その他必要なデータを抽出）
    city_file = os.path.join(input_folder, 'mt_city_all.csv/mt_city_all.csv')
    city_data = load_csv_to_dict(city_file, 'lg_code', ['city', 'ward','pref'])
    
    # mt_city_pos_all.csvの処理（市区町村コード、緯度、経度を抽出）
    pos_file = os.path.join(input_folder, 'mt_city_pos_all.csv/mt_city_pos_all.csv')
    pos_data = load_csv_to_dict(pos_file, 'lg_code', ['rep_lat', 'rep_lon'])
    
    # データをマージ
    merged_data = merge_data(city_data, pos_data)
    
    convert_latitude_longitude_to_float(merged_data)

    # JSONとして保存
    save_to_json(merged_data, output_file)

    print(f"処理が完了しました: {output_file}")

# TODO: ファイルパスをconfig.jsonなどで設定できるようにする
input_folder = 'citiesdata_modules'  # CSVファイルが格納されているフォルダ
output_file = 'public/citiesData.json'  # 結果のJSONファイル名

process_csv_files(input_folder, output_file)
