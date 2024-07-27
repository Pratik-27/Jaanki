import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import YoutubePlayer from 'react-native-youtube-iframe';
import { vh, vw } from '../assets/styles/main';

interface IntroVideoProps {
  route: any;
  navigation: any;
}

const IntroVideo: React.FC<IntroVideoProps> = ({ route, navigation }) => {
  useEffect(() => {
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <YoutubePlayer
        height={vh(100)}
        initialPlayerParams={{
          controls: 1,
          preventFullScreen: 0,
          autoplay: 1,
        }}
        allowWebViewZoom={true}
        style={styles.player}
        webViewStyle={styles.webView}
        play={true}
        videoId={'H1uSmSRRjl8'}
        onError={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    height: vh(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  player: {
    flex: 1,
  },
  webView: {
    aspectRatio: 16 / 9,
    width: '100%',
  },
});

export default IntroVideo;
