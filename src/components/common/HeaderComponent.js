import React from 'react';
import {View} from 'react-native';

export const HeaderComponent = ({navigation}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 0.1,
        height: vh(10),
        paddingBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <MenuButton
        name="menu-fold"
        size={30}
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
          paddingLeft: 10,
          paddingTop: 5,
        }}
        color="#fff"
        onPress={() => {
          navigation.openDrawer();
        }}
      />
      <Text
        style={{
          fontSize: 32,
          color: '#fff',
          fontFamily: 'Amita-Bold',
          flex: 0.95,
          marginLeft: 10,
          marginTop: 10,
          justifyContent: 'center',
        }}>
        जानकी
      </Text>
      {/* <SearchButton
          name="search"
          size={24}
          style={{
            color: '#fff',
            justifyContent: 'flex-end',
            alignSelf: 'center',
          }}
          onPress={() => {
            setSearchBar(true);
            setSearchList(songList.concat(lSongList));
          }}
        /> */}
    </View>
  );
};
