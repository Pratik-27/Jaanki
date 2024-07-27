/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { vw } from '../../assets/styles/main';

interface Item {
  videoCode: string;
  title: string;
  presenter: string;
}

interface RenderPTItemProps {
  item: Item;
  index: number;
  navigation: any;
}

export const renderPTItem: React.FC<RenderPTItemProps> = ({ item, index, navigation }) => {
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
        <View style={styles.titleContainer}>
          <Text
            numberOfLines={2}
            style={styles.title}
          >
            {item.title.length < 40 ? item.title : `${item.title.substring(0, 30)}...`}
          </Text>
        </View>
        <Text style={styles.presenter}>
          <Text style={styles.presenterLabel}>प्रस्तुति:</Text> {item.presenter}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFDFBC',
    alignItems: 'center',
    padding: 10,
    width: vw(95),
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
    borderWidth: 1.5,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#B2814C',
    flex: 1,
  },
  imageContainer: {
    flex: 0.3,
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 5,
  },
  textContainer: {
    flex: 0.7,
    justifyContent: 'flex-start',
  },
  titleContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  title: {
    fontSize: 18,
    color: '#774916',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  presenter: {
    fontSize: 14,
    color: '#573108',
    fontWeight: '700',
  },
  presenterLabel: {
    fontSize: 14,
    color: '#774916',
    fontWeight: '500',
  },
});
