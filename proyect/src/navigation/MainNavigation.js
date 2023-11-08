import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from '../screens/Register';
import Login from '../screens/Login'
import TabNavigation from './TabNavigation';

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name = 'login'
        component={Login}
        options={{'headerShown': false}}
        />
        <Stack.Screen 
        name = 'register'
        component={Register}
        options={{'headerShown': false}}
        />
        <Stack.Screen 
        name = 'tabNavigation'
        component={TabNavigation}
        options={{
            headerShown:false
        }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}