import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/Home';

const Drawer = createDrawerNavigator();

export default function HomeNavigator() {
  return (
    // <NavigationContainer>
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      {/* <Drawer.Screen name="SakhiB" component={NotificationsScreen} /> */}
    </Drawer.Navigator>
    // </NavigationContainer>
  );
}
