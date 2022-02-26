import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MainStackNavigator from './MainStackNavigator';
import ChangeScreen from '../screens/ChangeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import COLORS from '../constants/colors';

const Tab = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='HomeScreen'
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerShown: false,
        // tabBarActiveTintColor: '#58ceb2',
        // tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          ...styles.container,
        },
      }}
    >
      <Tab.Screen
        name='HomeScreen'
        component={MainStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              {/* <ProfileIcon focused={focused} /> */}
              <Text>Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name='ChangeScreen'
        component={ChangeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              {/* <ProfileIcon focused={focused} /> */}
              <Text>Change</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name='SettingsScreen'
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              {/* <ProfileIcon focused={focused} /> */}
              <Text>Settings</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bgPrimary,
    borderTopWidth: 0,
  },
});

export default BottomTabsNavigator;
