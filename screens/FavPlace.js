import { useEffect, useState } from 'react';
import PlacesList from '../components/places/PlacesList';
import { useIsFocused } from '@react-navigation/native';

export default function FavPlace({route}) {
  const [placesList, setPlacesList] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if(isFocused && route.params) {
      setPlacesList(curPlacesList => [...curPlacesList, route.params.place])
    }
  }, [isFocused, route]);


  return <PlacesList items={placesList} />;
}

