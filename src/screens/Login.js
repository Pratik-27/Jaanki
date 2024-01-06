import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import React, {useCallback, useState, useEffect} from 'react';
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
import {onFacebookButtonPress, onGoogleButtonPress} from '../util/socialSignIn';
import {vw} from '../assets/styles/main';
import {useDispatch, useSelector} from 'react-redux';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

function Login({navigation}) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const spinValue = new Animated.Value(0);
  const fadeValue = new Animated.Value(0);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    dispatch({type: 'isLoggedin', isLoggedin: false});
    dispatch({type: 'medium', medium: ''});
    dispatch({type: 'userInfo', userInfo: ''});
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
    };
  }, [backButtonHandler]);

  const backButtonHandler = useCallback(() => {
    BackHandler.exitApp();
    return true;
  }, []);

  useEffect(() => {
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 2000, // Adjust the duration as needed
      useNativeDriver: true,
    }).start(() => {
      setShowText(true); // Show the text after the animation completes
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 1000, // Adjust the duration as needed
        useNativeDriver: true,
      }).start();
    });
  }, [spinValue]);

  if (loading) {
    return (
      <View
        style={{justifyContent: 'center', flex: 1, backgroundColor: '#9F0514'}}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{textAlign: 'center', color: '#fff'}}>Please wait...</Text>
      </View>
    );
  }

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const fade = fadeValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View
      style={{flex: 1, backgroundColor: '#ffdbac', justifyContent: 'center'}}>
      <Animated.Image
        style={{
          height: vw(65),
          width: vw(70),
          alignSelf: 'center',
          marginBottom: 20,
          paddingHorizontal: 5,
          transform: [{rotate: spin}],
        }}
        resizeMode={'contain'}
        source={require('../assets/images/icon.png')}
      />

      {showText && (
        <Animated.Text
          style={{
            fontSize: 44,
            color: '#990033',
            fontFamily: 'Amita-Bold',
            textAlign: 'center',
            opacity: fade,
          }}>
          जानकी
        </Animated.Text>
      )}
      {showText ? (
        <>
          <View
            style={{
              alignSelf: 'center',
              marginTop: 20,
              borderRadius: 5,
              padding: -5,
              overflow: 'hidden',
              borderWidth: 0.5,
              borderColor: 'blue',
              backgroundColor: '#3b84eb',
            }}>
            <GoogleSigninButton
              style={{width: 150}}
              size={GoogleSigninButton.Size.Standard}
              color={GoogleSigninButton.Color.Dark}
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
          </View>

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
                width: 150,
                paddingVertical: 5,
                elevation: 3,
                alignSelf: 'center',
                flexDirection: 'row',
                borderRadius: 5,
                borderWidth: 0.5,
                borderColor: 'gray',
              }}>
              <Image
                source={require('../assets/images/fb.png')}
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 30,
                  justifyContent: 'center',
                  flex: 0.3,
                }}
              />
              <Text
                style={{
                  textAlign: 'center',
                  flex: 0.7,
                  textAlignVertical: 'center',
                  color: '#3b47eb',
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                Login
              </Text>
            </View>
          </TouchableOpacity>
        </>
      ) : null}
    </View>
  );
}

export default Login;
