import React, {useCallback, useEffect, useState} from 'react';
import {BackHandler, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {useSelector} from 'react-redux';
import {vh} from '../../../assets/styles/main';

const JankiHeader = () => {
  const [name, setName] = useState('');
  const [dp, setDp] = useState('');

  const {userInfo, medium} = useSelector((state: any) => state.auth);

  const backButtonHandler = useCallback(() => {
    BackHandler.exitApp();
    return true;
  }, []);

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
  }, [medium, userInfo, backButtonHandler]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>जानकी</Text>
      </View>
      <View style={styles.userInfoContainer}>
        <View style={styles.userInfo}>
          <TouchableOpacity style={styles.profilePictureContainer} onPress={() => {
              // Add desired functionality here
            }}>
            <Image style={styles.profilePicture} source={{uri: dp}} />
          </TouchableOpacity>
          <Text style={styles.greeting}>{`नमस्कार! ${name}`}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#9F0514',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    flex: 0.1,
    height: vh(10),
  },
  headerText: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'Amita-Bold',
    flex: 0.55,
    marginLeft: 10,
  },
  userInfoContainer: {
    margin: 5,
    flex: 0.1,
    justifyContent: 'flex-start',
    height: vh(10),
  },
  userInfo: {
    backgroundColor: '#FFF5E4',
    padding: 5,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  profilePictureContainer: {
    flex: 0.1,
  },
  profilePicture: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  greeting: {
    fontSize: 19,
    color: '#000',
    marginLeft: 10,
    flex: 0.5,
    alignSelf: 'center',
  },
});

export default JankiHeader;
