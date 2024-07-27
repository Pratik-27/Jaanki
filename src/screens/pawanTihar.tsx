/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  BackHandler,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Orientation from 'react-native-orientation-locker';
import {useSelector} from 'react-redux';
import {vh} from '../assets/styles/main';
import MenuButton from 'react-native-vector-icons/AntDesign';
import {renderPTItem} from '../components/listitems';

function PawanTihar({navigation}) {
  const [name, setName] = useState('');
  const [dp, setDp] = useState('');
  const {userInfo, medium} = useSelector(state => state.auth);
  const [pwList, setPWList] = useState([]);

  useEffect(() => {
    Orientation.lockToPortrait();

    if (medium === 'google') {
      setName(userInfo.given_name);
      setDp(userInfo.picture);
    } else if (medium === 'facebook') {
      setName(userInfo.first_name);
      setDp(userInfo.picture.data.url);
    }

    const unsubscribe = firestore()
      .collection('pawanTiharList')
      .onSnapshot(querySnapshot => {
        const songList = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          key: doc.id,
        }));
        setPWList(songList);
      });

    BackHandler.addEventListener('hardwareBackPress', backButtonHandler);

    return () => {
      unsubscribe();
      BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
    };
  }, [medium, userInfo]);

  const backButtonHandler = useCallback(() => {
    BackHandler.exitApp();
    return true;
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#D9AF81', justifyContent: 'center'}}>
      <View style={{flexDirection: 'row'}}>
        <MenuButton
          name="menu-fold"
          size={30}
          style={{justifyContent: 'center', alignSelf: 'center', paddingLeft: 10}}
          color="#FFEDDA"
          onPress={() => navigation.openDrawer()}
        />
        <Text
          style={{
            fontSize: 32,
            color: '#FFEDDA',
            fontFamily: 'Amita-Bold',
            flex: 0.55,
            marginLeft: 10,
            marginTop: 10,
          }}>
          जानकी
        </Text>
      </View>
      <FlatList
        data={pwList}
        style={{padding: 5, height: vh(40), alignSelf: 'center', backgroundColor: 'rgba(200,200,123,0.2)'}}
        contentContainerStyle={{paddingBottom: 20}}
        ItemSeparatorComponent={() => <View style={{height: 5}} />}
        renderItem={({item, index}) => renderPTItem(item, index, navigation)}
      />
    </SafeAreaView>
  );
}

export default PawanTihar;
