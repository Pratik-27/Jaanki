/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  BackHandler
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import YoutubePlayer from 'react-native-youtube-iframe';
import { vh, vw } from '../assets/styles/main';

function YoutubeVideo({ route, navigation }) {
  const [isPortrait, setIsPortrait] = useState(false);
  const { code } = route.params;

  const backButtonHandler = useCallback(() => {
    setIsPortrait(true);
    Orientation.lockToPortrait();
    setTimeout(() => {
      navigation.goBack();
    }, 1000);
    return true;
  }, [navigation]);

  useEffect(() => {
    Orientation.lockToLandscape();
    BackHandler.addEventListener('hardwareBackPress', backButtonHandler);

    return () => {
      Orientation.lockToPortrait();
      BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
    };
  }, [backButtonHandler]);

  if (isPortrait) {
    return (
      <View style={{ justifyContent: 'center', flex: 1, backgroundColor: '#D9AF81' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#000', flex: 1 }}>
      <StatusBar hidden />
      <YoutubePlayer
        height={vh(100)}
        initialPlayerParams={{
          controls: 1,
          preventFullScreen: 0,
          autoplay: 1,
        }}
        play={true}
        videoId={code}
      />
    </SafeAreaView>
  );
}

export default YoutubeVideo;
