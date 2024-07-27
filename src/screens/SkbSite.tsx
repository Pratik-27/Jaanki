/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  SafeAreaView,
  Text,
  View
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import MenuButton from 'react-native-vector-icons/AntDesign';
import WebView from 'react-native-webview';
import { useSelector } from 'react-redux';

function SKBWebSite({ navigation }) {
  const [name, setName] = useState('');
  const [dp, setDp] = useState('');
  const { userInfo, medium } = useSelector(state => state.auth);

  useEffect(() => {
    Orientation.lockToPortrait();

    if (medium === 'google') {
      setName(userInfo.given_name);
      setDp(userInfo.picture);
    } else if (medium === 'facebook') {
      setName(userInfo.first_name);
      setDp(userInfo.picture.data.url);
    }

    BackHandler.addEventListener('hardwareBackPress', backButtonHandler);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
    };
  }, [medium, userInfo]);

  const backButtonHandler = useCallback(() => {
    BackHandler.exitApp();
    return true;
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#9F0514' }}>
      <View style={{ flexDirection: 'row' }}>
        <MenuButton
          name="menu-fold"
          size={30}
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            paddingLeft: 10,
          }}
          color="#fff"
          onPress={() => navigation.openDrawer()}
        />
        <Text
          style={{
            fontSize: 32,
            color: '#fff',
            fontFamily: 'Amita-Bold',
            flex: 0.55,
            marginLeft: 10,
            marginTop: 15,
          }}>
          जानकी
        </Text>
      </View>
      <WebView
        source={{ uri: 'https://www.sakhibahinpa.org/home' }}
        javaScriptEnabled
        startInLoadingState
        useWebKit
        renderLoading={() => (
          <View
            style={{
              position: 'absolute',
              top: '45%',
              left: '45%',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" color="black" />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export default SKBWebSite;
