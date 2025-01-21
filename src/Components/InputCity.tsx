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
        if (a.city.startsWith(query) && b.city.startsWith(query)) {
          return 0;
        } else if (a.city.startsWith(query)) {
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
