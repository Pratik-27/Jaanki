/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {vw} from '../../assets/styles/main';

export const renderBGItem = (item, index, navigation) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Youtube', {code: item.videoCode})}
      style={{
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
      }}>
      <View style={{flex: 0.3}}>
        <Image
          source={{
            uri: `https://img.youtube.com/vi/${item.videoCode}/0.jpg`,
          }}
          style={{height: 90, width: 90, borderRadius: 45}}
        />
      </View>
      <View
        style={{
          flex: 0.7,
          justifyContent: 'flex-start',
          alignSelf: 'flex-start',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
          }}>
          {/* <Text
              style={{
                fontSize: 20,
                color: '#000',
                textAlign: 'left',
                fontWeight: 'bold',
              }}>
              गीत:{' '}
            </Text> */}
          <Text
            numberOfLines={1}
            style={{
              fontSize: 22,
              color: '#000',
              textAlign: 'left',
              fontWeight: 'bold',
            }}>
            {item.title.length < 30
              ? `${item.title}`
              : `${item.title.substring(0, 30)}...`}
          </Text>
        </View>
        <Text style={{fontSize: 18, color: '#000', fontWeight: 'bold'}}>
          <Text
            style={{
              fontSize: 18,
              color: '#000',
            }}>
            गीतगाइन:
          </Text>{' '}
          {item.singer}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
