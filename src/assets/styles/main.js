import {Dimensions} from 'react-native';

export const vh = value => {
  return Dimensions.get('screen').height * (value / 100);
};

export const vw = value => {
  return Dimensions.get('screen').width * (value / 100);
};
