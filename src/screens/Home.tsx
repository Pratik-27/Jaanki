import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LoginManager } from 'react-native-fbsdk';
import Orientation from 'react-native-orientation-locker';
import { Modal } from 'react-native-paper';
import MenuButton from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { vh, vw } from '../assets/styles/main';
import { renderBGItem, renderLMItem } from '../components/listitems';
import AddUser from '../components/modals/addUser';
import { addToFireStoreBG, addToFireStoreLM } from '../util/fireStore';

interface HomeProps {
  navigation: any;
  route: any;
}

const styles = {
  safeAreaView: {
    justifyContent: 'center',
    backgroundColor: '#D9AF81',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    flex: 0.1,
    height: vh(10),
    paddingBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 32,
    color: '#FFEDDA',
    fontFamily: 'Amita-Bold',
    flex: 0.95,
    marginLeft: 10,
    marginTop: 10,
    justifyContent: 'center',
  },
  content: {
    margin: 5,
    flex: 0.1,
    justifyContent: 'flex-start',
    height: vh(10),
  },
  userInfoContainer: {
    backgroundColor: '#FFF5E4',
    padding: 5,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  userInfoText: {
    fontSize: 19,
    color: '#4C2F10',
    marginLeft: 10,
    flex: 0.5,
    alignSelf: 'center',
  },
  addUserButton: {
    textAlign: 'right',
    fontSize: 30,
    marginRight: 10,
  },
  loadingContainer: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#9F0514',
  },
  loadingText: {
    textAlign: 'center',
    color: '#fff',
  },
  modalContainer: {
    backgroundColor: '#FFF5E4',
    width: vw(80),
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
  },
  modalContent: {
    backgroundColor: '#FFF5E4',
    padding: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: vw(70),
  },
  modalUserInfo: {
    fontSize: 18,
    color: '#000',
    marginLeft: 10,
    fontWeight: 'bold',
    marginTop: 5,
  },
  modalEmail: {
    fontSize: 12,
    color: '#000',
    marginLeft: 10,
  },
  modalButton: {
    backgroundColor: '#9F0514',
    alignSelf: 'center',
    borderRadius: 30,
    width: vw(55),
    padding: 10,
    marginTop: 20,
  },
  modalButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  modalLogoutButton: {
    backgroundColor: '#9F0514',
    marginTop: 10,
    padding: 10,
    width: vw(55),
    alignSelf: 'center',
    borderRadius: 30,
    elevation: 2,
  },
  modalLogoutButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
};

const Home: React.FC<HomeProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [dp, setDp] = useState('');
  const [songList, setSongList] = useState([]);
  const [lSongList, setLSongList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [userInfoVisible, setUserInfoVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [link, setLink] = useState('');
  const [error, setError] = useState('');
  const [searchBar, setSearchBar] = useState(false);
  const [isFirstTab, setIsFirstTab] = useState(true);
  const [isSecondTab, setIsSecondTab] = useState(false);

  const [lmDesc, setLMDesc] = useState('');
  const [lmLink, setLMLink] = useState('');

  const { userInfo, medium } = useSelector((state: any) => state.auth);

  const backButtonHandler = () => {
    BackHandler.exitApp();
    return true
  };

  useEffect(() => {
    BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
    Orientation.lockToPortrait();
    if (medium === 'google') {
      setName(userInfo.given_name);
      setDp(userInfo.picture);
    } else if (medium === 'facebook') {
      setName(userInfo.first_name);
      setDp(userInfo.picture.data.url);
    }
    getData();
    BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
  }, [backButtonHandler]);

  

  const getData = async () => {
    firestore()
      .collection('videoDetails')
      .onSnapshot(querySnapshot => {
        const songList: any[] = [];

        querySnapshot.forEach(documentSnapshot => {
          songList.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setSongList(songList);
      });
    firestore()
      .collection('LVideoDetail')
      .onSnapshot(querySnapshot => {
        const lSongList: any[] = [];

        querySnapshot.forEach(documentSnapshot => {
          lSongList.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setLSongList(lSongList);
      });
    setSearchList(songList.concat(lSongList));
    setLoading(false);
  };

  const signout = async () => {
    setUserInfoVisible(false);
    if (medium === 'google') {
      navigation.navigate('Login');
      GoogleSignin.signOut();
    } else if (medium === 'facebook') {
      navigation.navigate('Login');
      LoginManager.logOut();
    }
  };

  function getId(url: string) {
    try {
      var video_id = String(url).split('v=')[1];
      var ampersandPosition = String(video_id).indexOf('&');
      if (ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
        return video_id;
      }
      if (video_id == undefined) {
        var newVideo_id = String(url).split('.be/')[1];
        video_id = newVideo_id.substring(0, 11);
        return video_id;
      }
    } catch (error) {
      return '';
    }
  }

  const performSearch = (text: string) => {
    let newSearchList: any[] = [];
    searchList.map((item: any) => {
      if (item.detail !== undefined && String(item.detail).includes(text)) {
        newSearchList.push(item);
      } else if (item.title !== undefined && String(item.title).includes(text)) {
        newSearchList.push(item);
      } else if (item.singer !== undefined && String(item.singer).includes(text)) {
        newSearchList.push(item);
      }
      return newSearchList;
    });
    setSearchList(newSearchList);
  };

  const addUser = () => {
    setError('');
    if (collectionName === 'videoDetails') {
      if (artist.length == 0) {
        setError('Enter Artist Name !');
      } else if (songTitle.length == 0) {
        setError('Enter Song Name !');
      } else if (link.length < 11) {
        setError('Wrong Video Link !');
      } else {
        var videoCode = getId(link);
        if (videoCode?.length !== 11) {
          setError('Wrong Video Link !');
        } else {
          addToFireStoreBG(songTitle, artist, videoCode, collectionName).then(
            () => {
              setLoading(true);
              setCollectionName('');
              setSongTitle('');
              setArtist('');
              setLink('');
              setError('');
              getData();
            }
          );
        }
      }
    } else {
      if (lmDesc.length == 0) {
        setError('Enter Description !');
      } else if (lmLink.length < 11) {
        setError('Wrong Video Link !');
      } else {
        var lmvideoCode = getId(lmLink);
        if (lmvideoCode.length !== 11) {
          setError('Wrong Video Link !');
        } else {
          addToFireStoreLM(lmDesc, lmvideoCode).then(() => {
            setLoading(true);
            setCollectionName('');
            setLMDesc('');
            setLMLink('');
            setError('');
            getData();
          });
        }
      }
    }
  };

  const showLoading = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#fff" />
      <Text style={styles.loadingText}>Please Wait ...</Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Home</Text>
      <MenuButton
        name="menu-fold"
        size={30}
        color="#FFEDDA"
        onPress={() => setUserInfoVisible(true)}
      />
    </View>
  );

  const renderContent = () => (
    <View style={styles.content}>
      <View style={styles.userInfoContainer}>
        <TouchableOpacity onPress={() => setSearchBar(!searchBar)}>
          <Image
            source={require('../assets/images/search.png')}
            style={{ width: 20, height: 20, marginLeft: 10 }}
          />
        </TouchableOpacity>
        <Text style={styles.userInfoText}>{name}</Text>
        <TouchableOpacity onPress={() => setAddVisible(true)}>
          <MenuButton name="adduser" size={30} color="#4C2F10" style={styles.addUserButton} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSongList = () => (
    <FlatList
      data={isFirstTab ? songList : lSongList}
      renderItem={isFirstTab ? renderBGItem : renderLMItem}
      keyExtractor={item => item.key}
    />
  );

  const renderModal = () => (
    <Modal
      visible={userInfoVisible}
      onDismiss={() => setUserInfoVisible(false)}
      contentContainerStyle={styles.modalContainer}
    >
      <View style={styles.modalContent}>
        <Image source={{ uri: dp }} style={{ width: 80, height: 80 }} />
        <View style={{ alignSelf: 'center' }}>
          <Text style={styles.modalUserInfo}>{name}</Text>
          <Text style={styles.modalEmail}>{userInfo.email}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <View style={styles.modalButton}>
          <Text style={styles.modalButtonText}>Profile</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => signout()}>
        <View style={styles.modalLogoutButton}>
          <Text style={styles.modalLogoutButtonText}>Sign Out</Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {loading ? showLoading() : (
        <>
          {renderHeader()}
          {renderContent()}
          {renderSongList()}
          {renderModal()}
          <AddUser
            visible={addVisible}
            setVisible={setAddVisible}
            addUser={addUser}
            setCollectionName={setCollectionName}
            setSongTitle={setSongTitle}
            setArtist={setArtist}
            setLink={setLink}
            setLMDesc={setLMDesc}
            setLMLink={setLMLink}
            collectionName={collectionName}
            songTitle={songTitle}
            artist={artist}
            link={link}
            lmDesc={lmDesc}
            lmLink={lmLink}
            error={error}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;
