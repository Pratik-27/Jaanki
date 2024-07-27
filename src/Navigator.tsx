import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import HomeNavigator from './navigators/homeNavigator';
import Login from './screens/Login';
import YoutubeVideo from './screens/YoutubeVideo';
import IntroVideo from './screens/introVideo';
import { RootState } from './createStore'; // Assuming you have a RootState type

export default function Navigator() {
  const Stack = createStackNavigator();

  const isLoggedin = useSelector((state: RootState) => state.auth?.isLoggedin);
  
  const getInitialScreen = () => {
    if (isLoggedin) {
      return 'HomeNavigator';
    } else {
      return 'Login';
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={getInitialScreen()}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
        <Stack.Screen name="Youtube" component={YoutubeVideo} />
        <Stack.Screen name="Intro" component={IntroVideo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
