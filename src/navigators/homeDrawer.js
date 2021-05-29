import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import SKBWebSite from '../screens/SkbSite';

const Tab = createBottomTabNavigator();

export default function HomeDrawer() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Skb" component={SKBWebSite} />
    </Tab.Navigator>
  );
}
