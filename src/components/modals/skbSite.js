import React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';

function SKBWebSite() {
  return (
    <View style={{flex: 1, marginTop: 25,}}>
      <WebView source={{uri: 'https://www.sakhibahinpa.org/home'}} />
    </View>
  );
}

export default SKBWebSite;
