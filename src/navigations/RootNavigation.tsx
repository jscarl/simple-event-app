import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthScreen} from '../auth/screens/AuthScreen';
import EventScreen from '../events/screens/EventScreen';

const Stack = createStackNavigator();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="authScreen">
        <Stack.Screen
          name="authScreen"
          component={AuthScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="eventScreen"
          component={EventScreen}
          options={{
            title: 'Welcome',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
