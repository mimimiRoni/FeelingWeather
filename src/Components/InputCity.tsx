import CitiesData from '../data/citiesData.json';
import { SearchableDropdown } from './common/SearchableDropdown/SearchableDropdown';
import { CitiesDatabase, CityData } from '../data/CitiesData.type';

type InputCityProps = {
  onSelected: (city: [string, CityData]) => void;
  onError: (errorMassage: string) => void;
};

const InputCity: React.FC<InputCityProps> = ({ onSelected, onError }) => {
  const data: CitiesDatabase = CitiesData;
  const getFilteredData = (query: string) => {
    if (!query.trim()) {
      onError('都市名を入力してください');
      return [];
    }

    return Object.entries(data)
      .filter(([, value]) => {
        return value.city.includes(query) || value.ward.includes(query);
      })
      .sort(([, a], [, b]) => {
        const aText = a.city + a.ward;
        const bText = b.city + b.ward;
        if (aText.startsWith(query) && bText.startsWith(query)) {
          return aText.localeCompare(bText);
        } else if (aText.startsWith(query)) {
          return -1;
        } else {
          return 1;
        }
      });
  };

  const displayOption = ([, value]: [string, CityData]) => {
    return value.city + value.ward + '(' + value.pref + ')';
  };

  return (
    <form role="form">
      <SearchableDropdown
        placeholder={'市区町村名を入力……'}
        getFilteredOptions={getFilteredData}
        displayOption={displayOption}
        onSelected={onSelected}
      />
    </form>
  );
};

export default InputCity;
