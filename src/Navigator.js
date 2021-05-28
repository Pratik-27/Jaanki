import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import Login from './screens/Login';
import YoutubeVideo from './screens/YoutubeVideo';
import {useSelector} from 'react-redux';
import IntroVideo from './screens/introVideo';
import HomeNavigator from './navigators/homeNavigator';

export default function Navigator() {
  const Stack = createStackNavigator();

  const {isLoggedin} = useSelector(state => state.auth);
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
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
        <Stack.Screen name="Youtube" component={YoutubeVideo} />
        <Stack.Screen name="Intro" component={IntroVideo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
