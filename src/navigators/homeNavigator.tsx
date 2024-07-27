import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeDrawer from './homeDrawer';
import DrawerComponent from '../components/drawerComponent';

const Drawer = createDrawerNavigator();

export default function HomeNavigator() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerComponent {...props} />}>
      <Drawer.Screen name="Home" component={HomeDrawer} />
    </Drawer.Navigator>
  );
}
