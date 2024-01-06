import React, {useCallback, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import YoutubePlayer from 'react-native-youtube-iframe';
import {vh, vw} from '../assets/styles/main';

function IntroVideo({route, navigation}) {
  useEffect(() => {}, []);

  useEffect(() => {
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#000',
        height: vh(100),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar hidden />
      {/* <YouTube
        apiKey="AIzaSyDSsP61Xon1wTjBnNcoA8RCR4DHppd_vI0"
        controls={0}
        showFullscreenButton
        videoId="H1uSmSRRjl8" // The YouTube video ID
        play // control playback of video with true/false
        // fullscreen // control whether the video should play in fullscreen or inline
        loop // control whether the video should loop when ended
        // onReady={e => this.setState({ isReady: true })}
        // onChangeState={e => this.setState({ status: e.state })}
        // onChangeQuality={e => this.setState({ quality: e.quality })}
        onError={() => navigation.goBack()}
        style={{alignSelf: 'center', height: vh(90), width: vw(100)}}
      /> */}
      <YoutubePlayer
        height={vh(100)}
        initialPlayerParams={{
          controls: 1,
          preventFullScreen: 0,
          autoplay: 1,
        }}
        allowWebViewZoom={true}
        style={{flex: 1}}
        webViewStyle={{
          aspectRatio: 16 / 9,
          width: '100%',
        }}
        play={true}
        videoId={'H1uSmSRRjl8'}
        // onChangeState={onStateChange}
      />
      {/* <Text>Hi {code}</Text> */}
    </SafeAreaView>
  );
}

export default IntroVideo;
