/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { vw } from '../../assets/styles/main';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFDFBC',
    alignItems: 'center',
    padding: 10,
    width: vw(95),
    alignSelf: 'center',
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
    borderWidth: 4,
  },
  imageContainer: {
    flex: 0.3,
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 45,
  },
  textContainer: {
    flex: 0.7,
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  text: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

interface Item {
  videoCode: string;
  detail: string;
}

interface RenderLMItemProps {
  item: Item;
  index: number;
  navigation: any;
}


export const renderLMItem: React.FC<RenderLMItemProps> = ({ item, index, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Youtube', { code: item.videoCode })}
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `https://img.youtube.com/vi/${item.videoCode}/0.jpg` }}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {item.detail}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
