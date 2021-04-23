import 'react-native-gesture-handler';
import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MenuProvider } from 'react-native-popup-menu';

import Login from './pages/Login';
import Register from './pages/Register';
import TabNav from './nav/TabNav';
import CreateTopic from './pages/CreateTopic';
import Chatting from './pages/Chatting';

const Stack = createStackNavigator();

export default class MobileApp extends Component {
  render() {
    return (
      <MenuProvider>
        <NavigationContainer>
          <Stack.Navigator headerMode={'none'} mode={'modal'}>
              <Stack.Screen name="LoginPage" component={Login} />
              <Stack.Screen name="RegisterPage" component={Register} />
              <Stack.Screen name="TabNav" component={TabNav} />
              <Stack.Screen name="CreateTopic" component={CreateTopic} />
              <Stack.Screen name="ChattingRoom" component={Chatting} />
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    );
  }
}
