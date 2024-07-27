import {Dimensions} from 'react-native';

export const vh = (value: number) => {
  return Dimensions.get('screen').height * (value / 100);
};

export const vw = (value: number) => {
  return Dimensions.get('screen').width * (value / 100);
};
