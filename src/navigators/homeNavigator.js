import * as React from 'react';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import HomeDrawer from './homeDrawer';
import {Button, Text, View} from 'react-native';
import DrawerComponent from '../components/drawerComponent';
import IntroVideo from '../screens/introVideo';

const Drawer = createDrawerNavigator();

// function CustomDrawerContent({}) {
//   return (
//     <Button
//       title="Go somewhere"
//       onPress={() => {
//         // Navigate using the `navigation` prop that you received
//         // navigation.navigate('SomeScreen');
//       }}
//     />
//   );
// }

export default function HomeNavigator() {
  return (
    // <NavigationContainer>
    <Drawer.Navigator drawerContent={props => <DrawerComponent {...props} />}>
      {/* <Drawer.Screen name="Home" component={Home} /> */}
      <Drawer.Screen name="Home" component={HomeDrawer} />
      {/* <DrawerItem */}
      {/* <View>
        <Text>Hi</Text>
      </View> */}
    </Drawer.Navigator>
    // </NavigationContainer>
  );
}
