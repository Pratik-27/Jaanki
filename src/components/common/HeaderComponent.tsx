import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {vh} from 'react-native-expo-viewport-units';
import MenuButton from './MenuButton'; // Assuming you have this component

type HeaderComponentProps = {
  navigation: any; // Update this type based on your navigation prop type
};

export const HeaderComponent: React.FC<HeaderComponentProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <MenuButton
        name="menu-fold"
        size={30}
        style={styles.menuButton}
        color="#fff"
        onPress={() => {
          navigation.openDrawer();
        }}
      />
      <Text style={styles.title}>
        जानकी
      </Text>
      {/* <SearchButton
          name="search"
          size={24}
          style={styles.searchButton}
          onPress={() => {
            setSearchBar(true);
            setSearchList(songList.concat(lSongList));
          }}
        /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 0.1,
    height: vh(10),
    paddingBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    paddingLeft: 10,
    paddingTop: 5,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'Amita-Bold',
    flex: 0.95,
    marginLeft: 10,
    marginTop: 10,
    justifyContent: 'center',
  },
  /* searchButton: {
    color: '#fff',
    justifyContent: 'flex-end',
    alignSelf: 'center',
  }, */
});
