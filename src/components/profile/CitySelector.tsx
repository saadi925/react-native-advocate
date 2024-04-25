import React, { useEffect, useState } from 'react';
import { Select } from 'native-base';

interface CitySelectorProps {
  cities: string[];
  selectedCity: string;
  onSelectCity: (city: string) => void;
  query : string
}

const CitySelector: React.FC<CitySelectorProps> = ({ cities, selectedCity, onSelectCity, query }) => {
    const [Cities, setFilteredCities] = useState<string[]>(cities);
 useEffect(()=>{
    const filteredCities = cities.filter(city => city.toLowerCase().includes(query.toLowerCase()));
    setFilteredCities(filteredCities)
 },[cities, query])
  return (
    <Select color={'white'}
      selectedValue={selectedCity}
      minWidth={200}
      accessibilityLabel="Select city"
      placeholder="Select city"
     
      onValueChange={(itemValue) => onSelectCity(itemValue)}
    >
      {Cities.map((city, index) => (
        <Select.Item color={'white'} key={index} label={city} value={city} />
      ))}
    </Select>
  );
};

export default CitySelector;
