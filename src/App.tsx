import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import TaskScreen from './screens/TaskScreen';
import AddEditScreen from './screens/AddEditScreen';
import { RootStackParamList } from '../types';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="taskItems">
        <Stack.Screen name="taskItems" component={TaskScreen} />
        <Stack.Screen name="task" component={AddEditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
