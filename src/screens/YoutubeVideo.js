/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import YouTube from 'react-native-youtube';
import {vh, vw} from '../assets/styles/main';

function YoutubeVideo({route, navigation}) {
  useEffect(() => {
    Orientation.lockToLandscape();
    BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
    // BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
  }, []);

  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
  }, [backButtonHandler]);

  const backButtonHandler = () => {
    setIsPortrait(true);
    Orientation.lockToPortrait();
    setTimeout(() => {
      navigation.goBack();
    }, 1000);
    return true;
  };

  const {code} = route.params;

  if (isPortrait) {
    return (
      <View
        style={{justifyContent: 'center', flex: 1, backgroundColor: '#9F0514'}}>
        <ActivityIndicator size="large" color="#fff" />
        {/* <Text style={{textAlign: 'center', color: '#fff'}}>Please wait...</Text> */}
      </View>
    );
  }

  return (
    <SafeAreaView style={{backgroundColor: '#000'}}>
      <StatusBar hidden />
      <YouTube
        apiKey="AIzaSyDSsP61Xon1wTjBnNcoA8RCR4DHppd_vI0"
        controls={1}
        showFullscreenButton
        videoId={code} // The YouTube video ID
        play // control playback of video with true/false
        // fullscreen // control whether the video should play in fullscreen or inline
        loop // control whether the video should loop when ended
        // onReady={e => this.setState({ isReady: true })}
        // onChangeState={e => this.setState({ status: e.state })}
        // onChangeQuality={e => this.setState({ quality: e.quality })}
        // onError={e => this.setState({ error: e.error })}
        style={{alignSelf: 'center', height: vw(100), width: vh(85)}}
      />
      {/* <Text>Hi {code}</Text> */}
    </SafeAreaView>
  );
}

export default YoutubeVideo;
