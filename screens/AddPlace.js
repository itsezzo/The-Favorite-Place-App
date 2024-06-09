import PlacesForm from '../components/places/PlacesForm';
import { insertPlace } from '../utils/database';

export default function AddPlace({navigation}) {
  
  
  async function createPlace(place) {
    await insertPlace(place);
    navigation.navigate('yourFavPlace', {
      place: place
    })
  }
  
  return (
    <PlacesForm onPlaceCreation={createPlace} />
  );
}
