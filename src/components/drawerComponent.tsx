/* eslint-disable react-native/no-inline-styles */
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LoginManager } from 'react-native-fbsdk';
import { useSelector } from 'react-redux';
import { vw } from '../assets/styles/main';

interface Props {
  navigation: any
}

const DrawerComponent = ({navigation}: Props) => {
  const [dp, setDp] = useState('');
  const { userInfo, medium } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (medium === 'google') {
      setDp(userInfo.picture);
    } else if (medium === 'facebook') {
      setDp(userInfo.picture.data.url);
    }
  }, []);

  const signout = async () => {
    navigation.closeDrawer();
    if (medium === 'google') {
      console.log('80', medium);
      navigation.navigate('Login');
      GoogleSignin.signOut();
    } else if (medium === 'facebook') {
      navigation.navigate('Login');
      LoginManager.logOut();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={styles.userInfo}>
          <Image style={styles.profileImage} source={{uri: dp}} />
          <View>
            <Text style={styles.userName}>
              {medium == 'google' ? userInfo.name : userInfo.name}
            </Text>
            <Text style={styles.userEmail}>
              {medium == 'google' ? userInfo.email : userInfo.email}
            </Text>
          </View>
        </View>

        <Text style={styles.loggedInVia}>Logged in via {medium}</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Intro')}
          style={styles.introButton}>
          <Text style={styles.introButtonText}>एप्लिकेशन बुझिऔ ▶</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logoutSection}>
        <TouchableOpacity onPress={signout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF5E4',
    padding: 10,
    paddingHorizontal: 0,
    flex: 1,
  },
  userInfoSection: {
    flex: 0.9,
  },
  userInfo: {
    backgroundColor: '#FFF5E4',
    padding: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  userName: {
    fontSize: 18,
    color: '#000',
    marginLeft: 10,
    fontWeight: 'bold',
    marginTop: 5,
  },
  userEmail: {
    fontSize: 12,
    color: '#000',
    marginLeft: 10,
  },
  loggedInVia: {
    textAlign: 'center',
    marginTop: 10,
    color: '#fff',
    backgroundColor: '#AB6114',
    padding: 5,
  },
  introButton: {
    backgroundColor: '#D9AF81',
    padding: 10,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  introButtonText: {
    color: '#4C2306',
    textAlign: 'left',
    fontSize: 19,
  },
  logoutSection: {
    flex: 0.1,
  },
  logoutButton: {
    backgroundColor: '#9F0514',
    marginTop: 10,
    padding: 10,
    width: vw(55),
    paddingHorizontal: 20,
    alignSelf: 'center',
    borderRadius: 30,
    elevation: 2,
    justifyContent: 'flex-end',
  },
  logoutButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
});

export default DrawerComponent;
