import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Lobby from '../pages/Lobby';
import Me from '../pages/Me';

const Tab = createBottomTabNavigator();

export default function TabNav() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Lobby') {
                        iconName = focused
                          ? 'globe'
                          : 'globe-outline';
                      } else if (route.name === 'Me') {
                        iconName = focused ? 'person' : 'person-outline';
                      }
          
                      // You can return any component that you like here!
                      return <Ionicons name={iconName} size={size} color={color} />;
                }
            })}
            tabBarOptions={{
                activeTintColor: '#99DCFA',
                inactiveTintColor: 'white',
                style: {
                    backgroundColor: '#212121'
                }
              }}
        >
            <Tab.Screen name="Lobby" component={Lobby} />
            <Tab.Screen name="Me" component={Me} />
        </Tab.Navigator>
    );
  }