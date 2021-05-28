import firestore from '@react-native-firebase/firestore';

export function addToFireStoreBG(title, singer, videoCode, collectionName) {
  console.log('4', title, singer, videoCode);
  return firestore().collection(collectionName).add({
    title,
    singer,
    videoCode,
  });
}

export function addToFireStoreLM(detail, videoCode, collectionName) {
  console.log('13', detail, videoCode);
  return firestore().collection(collectionName).add({
    detail,
    videoCode,
  });
}
