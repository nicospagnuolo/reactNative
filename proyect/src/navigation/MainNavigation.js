import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from '../screens/Register';
import Login from '../screens/Login'
import TabNavigation from './TabNavigation';
import Coments from '../screens/Coments';
import UserProfile from '../screens/UserProfile';
import AdicionalInfo from '../screens/AdicionalInfo';

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen 
        name = 'register'
        component={Register}
        options={{'headerShown': false}}
        />
        <Stack.Screen 
        name = 'login'
        component={Login}
        options={{'headerShown': false}}
        />
        <Stack.Screen 
        name = 'tabNavigation'
        component={TabNavigation}
        options={{
            headerShown:false
        }}
        />
        <Stack.Screen 
        name = 'coments'
        component={Coments}
        />
        <Stack.Screen 
        name = 'userProfile'
        component={UserProfile}
        />
        <Stack.Screen 
        name = 'AdicionalInfo'
        component={AdicionalInfo}
        options={{
          headerShown:false
      }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}