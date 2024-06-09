import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HeaderButton from './components/ui/HeaderButton';
import FavPlace from './screens/FavPlace';
import AddPlace from './screens/AddPlace';
import { colors } from './constants/colors';
import Map from './screens/Map';

// import * as SQLite from 'expo-sqlite/legacy';
import { creatTable } from './utils/database';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isInitailized, setIsInitailized] = useState(false);
  useEffect(() => {
    if (!isInitailized) {
      creatTable()
        .then(() => {
          setIsInitailized(true);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, []);

  return (
    <>
      <StatusBar style='light' />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.primary500 },
            headerTitleAlign: 'center',
            headerTintColor: colors.gray700,
            contentStyle: { backgroundColor: colors.gray700 },
          }}
        >
          <Stack.Screen
            name='yourFavPlace'
            component={FavPlace}
            options={({ navigation }) => ({
              headerRight: ({ tintColor }) => (
                <HeaderButton
                  icon='add'
                  color={tintColor}
                  size={24}
                  onPress={() => navigation.navigate('addPlace')}
                />
              ),
              title: 'Your Favorite Place',
            })}
          />
          <Stack.Screen
            name='addPlace'
            options={{ title: 'Add a New Place' }}
            component={AddPlace}
          />
          <Stack.Screen name='Map' component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
