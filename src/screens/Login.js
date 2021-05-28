/* eslint-disable react-native/no-inline-styles */
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import React, {useCallback, useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  Dimensions,
  Animated,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
// import {Easing} from 'react-native-reanimated';
// import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {onFacebookButtonPress, onGoogleButtonPress} from '../util/socialSignIn';
import {vw} from '../assets/styles/main';
import {useDispatch, useSelector} from 'react-redux';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

function Login({navigation}) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    dispatch({type: 'isLoggedin', isLoggedin: false});
    dispatch({type: 'medium', medium: ''});
    dispatch({
      type: 'userInfo',
      userInfo: '',
    });
  }, []);

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
  }, [backButtonHandler]);

  const backButtonHandler = useCallback(() => {
    // if (isSKBSelected) {
    //   setIsSKBSelected(false);
    //   return true;
    // } else {
    //   return true;
    // }
    BackHandler.exitApp();
  });

  if (loading) {
    return (
      <View
        style={{justifyContent: 'center', flex: 1, backgroundColor: '#9F0514'}}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{textAlign: 'center', color: '#fff'}}>Please wait...</Text>
      </View>
    );
  }

  return (
    <View
      style={{flex: 1, backgroundColor: '#ffdbac', justifyContent: 'center'}}>
      <Animated.Image
        style={{
          height: vw(100),
          width: vw(100),
          alignSelf: 'center',
          marginBottom: 20,
        }}
        source={require('../assets/images/icon.png')}
      />

      <GoogleSigninButton
        style={{alignSelf: 'center', width: 150, marginTop: 20}}
        title="Google Sign-In"
        onPress={() => {
          setLoading(true);
          onGoogleButtonPress()
            .then(res => {
              dispatch({type: 'isLoggedin', isLoggedin: true});
              dispatch({type: 'medium', medium: 'google'});
              dispatch({
                type: 'userInfo',
                userInfo: res.additionalUserInfo.profile,
              });
              navigation.navigate('HomeNavigator');
              console.log('Success', res);
              setLoading(false);
            })
            .catch(err => {
              console.log('Error', err);
              setLoading(false);
            });
        }}
      />
      <TouchableOpacity
        onPress={() => {
          setLoading(true);
          onFacebookButtonPress()
            .then(res => {
              dispatch({type: 'isLoggedin', isLoggedin: true});
              dispatch({type: 'medium', medium: 'facebook'});
              dispatch({
                type: 'userInfo',
                userInfo: res.additionalUserInfo.profile,
              });
              navigation.navigate('HomeNavigator');
              console.log('Signed in with Facebook!', res);
              setLoading(false);
            })
            .catch(err => {
              console.log('Error!', err);
              setLoading(false);
            });
        }}>
        <View
          style={{
            marginTop: 20,
            backgroundColor: '#fff',
            width: 140,
            elevation: 3,
            alignSelf: 'center',
            flexDirection: 'row',
          }}>
          <Image
            source={require('../assets/images/fb.png')}
            resizeMode="contain"
            style={{height: 30, width: 30, justifyContent: 'center', flex: 0.3}}
          />
          <Text
            style={{
              textAlign: 'center',
              flex: 0.7,
              textAlignVertical: 'center',
              color: 'gray',
              fontWeight: 'bold',
            }}>
            Login
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Intro')}
        style={{
          backgroundColor: '#9F0514',
          alignSelf: 'center',
          borderRadius: 15,
          borderWidth: 2,
          borderColor: '#fff',
          width: vw(50),
          padding: 10,
          marginTop: 20,
        }}>
        <Text style={{color: '#fff', textAlign: 'center', fontSize: 20}}>
          ▶️ एप्लिकेशन बुझिऔ
        </Text>
      </TouchableOpacity>
      {/* <Button
        title="FB Login"
        
      /> */}
      {/* <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            console.log('login is successful.');
            AccessToken.getCurrentAccessToken().then(data => {
              console.log(data.accessToken.toString());
            });
          }
        }}
      /> */}
    </View>
  );
}

export default Login;
