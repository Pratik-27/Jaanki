/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

interface Item {
  videoCode: string;
  title: string;
  singer: string;
}

interface RenderBGItemProps {
  item: Item;
  index: number;
  navigation: any;
}

export const renderBGItem: React.FC<RenderBGItemProps> = ({ item, index, navigation }) => {
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
          <Text numberOfLines={2} style={styles.title}>
            {item.title.length < 40 ? item.title : `${item.title.substring(0, 30)}...`}
          </Text>
        </View>
        <Text style={styles.singerText}>
          <Text style={styles.singerLabel}>गीतगाइन:</Text> {item.singer}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
