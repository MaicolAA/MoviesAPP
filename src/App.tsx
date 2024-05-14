import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import MovieListScreen from './screens/MovieListScreen';
import AddEditMovieScreen from './screens/AddEditMovieScreen';
import { RootStackParamList } from './utils/types';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MovieList">
        <Stack.Screen name="MovieList" component={MovieListScreen} />
        <Stack.Screen name="ModifyMovie" component={AddEditMovieScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
