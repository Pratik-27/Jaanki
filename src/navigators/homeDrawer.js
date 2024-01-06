/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import SKBWebSite from '../screens/SkbSite';
import PawanTihar from '../screens/pawanTihar';
import {Image, Text, View} from 'react-native';
import MusicIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function HomeDrawer() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      // screenOptions={({route}) => ({
      //   tabBarLabel: ({focused}) => ({}),
      // })}
      tabBarOptions={{
        activeBackgroundColor: '#CD6B00',
        inactiveBackgroundColor: '#CFCCC8',
        activeTintColor: '#884700',
        inactiveTintColor: 'black',
        labelPosition: 'below-icon',
        labelStyle: {
          fontSize: 16,
          fontFamily: 'Amita-Bold',
          textAlign: 'center',
        },
        tabStyle: {
          borderWidth: 0.5,
          borderColor: 'black',
        },
        allowFontScaling: true,
        iconStyle: {marginRight: 5},
        keyboardHidesTabBar: true,
        showLabel: false,
      }}>
      <Tab.Screen
        name="परंपरागत गीत"
        component={Home}
        // getComponent={() => {
        //   return <Image source={require('../assets/images/skbLogo.jpeg')} />;
        // }}
        options={({navigation, route}) => ({
          tabBarIcon: ({focused}) => {
            return (
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <MusicIcon
                  name="music-circle-outline"
                  size={focused ? 30 : 28}
                  color={focused ? '#FFFDFC' : '#301900'}
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}
                />
                <Text
                  style={{
                    fontSize: focused ? 16 : 15,
                    fontFamily: 'Amita-Bold',
                    textAlign: 'center',
                    color: focused ? '#FFFDFC' : '#301900',
                    marginLeft: 5,
                    marginTop: 7,
                  }}>
                  गीत -नाद
                </Text>
              </View>
            );
          },
        })}
      />
      <Tab.Screen
        name="पावनि तिहार"
        component={PawanTihar}
        // getComponent={() => {
        //   return <Image source={require('../assets/images/skbLogo.jpeg')} />;
        // }}
        options={({navigation, route}) => ({
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{height: 30, width: 30, borderRadius: 15}}
                  source={require('../assets/images/pawanT.jpeg')}
                />
                <Text
                  style={{
                    fontSize: focused ? 16 : 15,
                    fontFamily: 'Amita-Bold',
                    textAlign: 'center',
                    color: focused ? '#FFFDFC' : '#301900',
                    marginLeft: 2,
                    marginTop: 5,
                    justifyContent: 'center',
                  }}>
                  पावनि तिहार
                </Text>
              </View>
            );
          },
        })}
      />
      <Tab.Screen
        name="सखी बहिनपा"
        component={SKBWebSite}
        options={({navigation, route}) => ({
          tabBarIcon: ({focused}) => {
            return (
              // <Image
              //   style={{height: 36, width: 36, borderRadius: 18}}
              //   source={require('../assets/images/skbLogo.jpeg')}
              // />
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Image
                  style={{
                    height: 28,
                    width: 28,
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}
                  source={require('../assets/images/icon.png')}
                />
                <Text
                  style={{
                    fontSize: focused ? 16 : 15,
                    fontFamily: 'Amita-Bold',
                    textAlign: 'center',
                    color: focused ? '#FFFDFC' : '#301900',
                    marginLeft: 2,
                    marginTop: 5,
                    justifyContent: 'center',
                  }}>
                  सखी बहिनपा
                </Text>
              </View>
            );
          },
        })}
      />
    </Tab.Navigator>
  );
}
