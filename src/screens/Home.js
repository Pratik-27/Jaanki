/* eslint-disable no-catch-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  SafeAreaView,
  ToastAndroid,
  BackHandler,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Orientation from 'react-native-orientation-locker';
import {vh, vw} from '../assets/styles/main';
import {Modal, Searchbar} from 'react-native-paper';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager} from 'react-native-fbsdk';
import {useDispatch, useSelector} from 'react-redux';
import AddUser from '../components/modals/addUser';
import {addToFireStoreBG, addToFireStoreLM} from '../util/fireStore';
import SKBWebSite from '../components/modals/skbSite';
import {renderBGItem, renderLMItem} from '../components/listitems';
import MenuButton from 'react-native-vector-icons/AntDesign';
import SearchButton from 'react-native-vector-icons/FontAwesome';
import BackButton from 'react-native-vector-icons/Ionicons';
// import {SearchBar} from 'react-native-elements';

// const codes = [
//   'JQV8MOZrN7c',
//   '7IUhRx48p8Q',
//   'ZzuRffSZbbQ',
//   'naW-38NiLik',
//   'fU2gzpPgDlo',
//   'M_eSyyWVNM0',
//   'UdOelgB4JRQ',
//   'qfsQMWqcMLI',
//   'O8hlyR0fk58',
//   'fZ__8fKSJJE',
//   'JkgwYYBuu40',
//   '4q1DNe_5f2A',
//   'VoHcl8WvGUA',
//   'Tacq9ljXqK8',
//   'b7u_rbI5zaA',
//   'KbtAcGbe12o',
// ];

function Home({navigation, route}) {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [dp, setDp] = useState(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPkAAADKCAMAAABQfxahAAAAk1BMVEX+/v4nX47t7e3////s7Oz5+fnz8/Pw8PD29vb4+PgjXY0dWosXV4kiXI3+/v8KUoT5///w+PzB098oXoqUrcIAUINzkq6FoLja5OweWYbj7vTV4utmiKc6aZGrwNG+z9xKc5cyY41Ue51/m7WdtchcgaG8ztjM2ePb4umasMV2lrLs8fSMp721xtamvM+/0d4AT4TfPt9NAAAQwElEQVR4nO1dCXfiOAx2Y3KQhIaUM+EuwzBTSmf+/69bHwGc25ZNoLur9/ZV0y1CXyzLny8FYUSlZxFxqY657jDdZrrHdI+qVp/pDlV7NtNdpjMrmP1J71uYtBAq2ET2zSbXe9y+x/Q++6zDdBvJufmUJqWQe6JN8WnC3Xy8yf+RF232hB6UjyMMDc0nM3lBbgk2LeFpMj2XO9D1aVqCTUu0ib+FSdSjYmEqXHeZbjPdYXqf6R7THabbTHeZjphuMZ2p+HuYROIzrYmmvtCPxAiq60e972ASNSK3yjY9TTefxuT/yFXjqDF3VruZS8F99id91uE80aTRaG/yEiGXSfYUiGY5TLUFvc90j+ke01nuRA7T7ZsZ62amzqTL0cbpLyLp6RQTOXme4zA3QSaBXiLp3OkxvQ9Ox5bDEG9+z5bv29UuScIomkRhMlptD9Px+nxMHcdFuhle3ssMvzwjhhAu0kzOab75MV0lURQGge/7Lxchuj8IQiLBavn5FjM3201qe9kBe6UN9Gv9saKYBcRl8f2AhMFqf05Pjvsv4O0YHz+3pEGbMOfwk/bfzjYE/L2R32z2XEGXYsRMd3tl5JibITF+3PtROJBEfUMfjT42QxIsZeSmvMza3BYyPNezfMn0LF8yPcuXTLdLes6M4x1nu0i6sUvgd59zgr3kmTEv70SyyVBzfg8DEOoL+DDafp0ew9vBhMt15p+jCNbaogzC0Zhg50ym9/zs1XIWH0moj5uKHyb7FH8D3k5zEl5M9cK8iD36SJ0OkPcqSHYjI0a53Elo2gya1WqxB9F+7pj0kuo86Tk2E/emZ/mypGe5k+lZvuS6w3Pn8EcSGoXNJRiNY8+Al4Julrc755Wh/l0UP1y98dTcJW+XZUc4XhrI57XYJ1MW8s/HXjFeJwYTW4UEyZf3hMhJg0/u1+Bc/Ogwd+/G23Fd7mxmxPjP6L4NziUYnT0NL3mGt9hTQ5fUTIXnSKZ6Jd1jer+ks78gQ1kHuKlE+yHUywxgppvh7en2HkNZtYTbufssvB0fO4n0iwxGG+cp2CvCX5HqBFxP/Oi38wTILfw56RQ3lWjvGUDO+znPl7yf83zJexC3yXsQz5e8B/F8ST55WnaV20QJl6Sjvkp72btm9ZuOeKLrM+E5slH3hD8nund67y635aC/x7a0l5W6Jm+P37vMbaIE27mlw9v1OByOt48CTqCv5u6j2Ct6JHAGXVx77RC59VjgNOBTLd5+69tq/dw6PayPX6G/DzX6ed+7iai3in14TFYXJVzGcj73hR+ZjiTWOaoZ8ezxwAn0D0edtyMd3o7xDy0CMwjDiEnYss3YJtHY6Za94jc4ZfXDaHSYrf8s5ul88Wc9OwB23gToZ7dL5CiFLiz7QbQaL4ZYlOFivAKvVPvJ0dPi7Wr9PF7BGonumCzYV4lCf7HYB8BVW391Uuzn/HmjjNDy1FfUvbJO/zmcwrJbEH7GHPUrKgghwp/AnZlw+trkcR1A0Hh+BmU3P5rGhdYuYJ/CJvrRl9sFb39FOE0gcRnujg24OfbjChJMfrJwO2GvGMTdJqTBG3Ezp+IpZOk62J66QA4byaOvlga/NPsXxHo4doC8XWV+ngJysJ+8yeBmfr1BcnxytJT31VTXZGxIrEcLWeAE+gIAPXh/lVmTEcGqrMO90t8DYp1kIHngFHqi/BUv0RplXqKGdThRV+VwJ0Bej6RDPYP+Bni6o9i6L3sFzNAmayXgNLLW6tCDvXNP5Hiu7lK4V2tx5uJe/QGHR1cNuURWv/ZzjJfK6W2wHQKQD7fKnSpYOmq8XWUv1Tsqz039aK4OHBZckyNS2ku9xXlu/7zyRKnzrtwS4RgCnLTQWDnegwPGWGH/HF2Rt3I4d6PcEP4KgZCTeF8pP+XoiF/vw15PB+WplOqAJkD/o/yYSaOjuyB3j8q+DN6hwMkXvqs/58V9eLujnthJ/MGRqz/oYKrC213hWGDpdKGo91P1Jt/CgRPoW/VGn/flz0AWmUzdiVILqWfb6KyFXH3pJ5zZpaxee+5VlsNZ8U452Y4AJEZAPhypf2Nsnr26kBbQAU4nCeqJZWMeuXPoNL8xRwE5bmmct1u/1FnMTgs3DXf1DhadpHk7l9ZbQfhLnU0CJmkF6HvlOAt/O7J3l6rjvMjbXwFDTLjRRv5T+XEPtp7VU7iv1srhsPpg/jJJtZGn6vuW0cIse8Vr9aWCnS5w4uRI+VvDH6455ETH6pmdUEl95FPlr/UPjmRVFTneHqsvPAJn5nnk6rzRT+aWJG9nrc2/yLrpWb0WpvchNOYl+mkA+U/A95KJsVBVBglVZZArxnkTk7nydkd9eNHmMQy5OpehzFGuzoQUhzupLwgaSO0INKT4W4yN1ZMBEDjS5hJ7p63IY9gXayO/RLt7Vh/TfN8Icsgm3pscchne7n4CNvRHJpADJqqEwMrx9lJrV9UZVF+HIkRGa3J+Qb5T/+Lg4Jiqhuhh9TmT7rJEhjxWJ3FkjnhSqA/XjPwE2NY1hPwFcoxgboq99gGjKuluRjIc5MRQuGkuQiWN3LIB0xU+npeOvakiB0zW6KSluaJXhlzg7a6Q4R0hw9vq7PlF7YRILfIFJNqCGWrn7VLVEBEktT+Mt9NZoi0zqkkwmVcAd6UxZwD5D9DJwHdb6OE67BWw0k4k+DCA/AMSbf7qZAg55FQQ/X4DyNW3kuk3j1Jd5Fm0AyZMVCbawxpowvJCt9cE9iY1S7UE5ExnKxOwBGtigg45Hsa/mUHM1putq45zKxPtq1GW+h4+k/BTGzlkpsSQy6xGcWliMpA5KhVfaw+ZIQcNKpeTGvq8HYr8BXYsSgAOTDAZldBnry6IvL6wibIe8t/QLz7DkYu7S2DkZFzT2j+HjWkCcpndJaGSLC9IK1SPddQ3EzOZaGV3rH7uMIec7yJawo6ildtRlODt0H6e7WaDkYOmCww5u9JjgLeDkevkuFfIAdAbcjPsFY5cZ28NsKd2Rb42hFz90OdV4JN0KHNkyM8Q5BWnwoAckgo9kAlErr57e0O+cYu8veJUWJbohJOAVEeiDlqGy2QCPBKHzxr1eaI3h9e7pd4Lp/9yugxv14g76IYDaLn5hnxhhLf3rFSnugAsycFHNIY8NbT2egJs8QhufKlDh91UvEp2ElIfuQdlkVwmyvkdL7SKcPkrKeSlrF6+zYHUL3HkZKS4k45TrSAj0+PXOt7O9Fw1RFe44EL16/luqiM4p2AyWClkOUyyG7CiwUWCKcrOelPvhRs816q8stUQEXBp5OaKEvR4pVmhJ/yhvd5+2UsGT9Zu0KUDHqe6wAmFsw2dFrF1qAyXwag9zbE/wAv9mpLRom/qnMwcsoucF1/q6j29eK9dLtdPYsmqKpZ1vYVdzdv7J71hjUu0bOvs2ExhaH9Vm9VFHZXuZRbvaPZtz9ZM7lyCZN3Y7KYKQ9MbTBJ3NOVOf4I29soSbd9wDXjy+7etmVqa4W/XXBVzYIrzgyj/wUG0PdPKSej1tQB7eN4WislE0IJK0cY1d9YZcOCXvU5mulkU6NggSvbHS9mo1+zn8LgPCrjJYLCZjiDg/SS1zJ1vx8o3Uv0wmbLXR6W7Qt8lTyQ5jDfzUzwcDuPT/Of4kJQQBruUfDZ+m6q/48N/d2SrmBf6diWTU1vz94O/23XMuzRhJqXPsldLJaPdbjdKoqp3MoWc+VDw6+1ELe2Fn65kNUSZeipKXMYPw4/FLZPhYU0VYD/7ryzR8nqijNhRfLlL9ObJ1FaRrIZoyc+eSJh/prkETqsOqXSWQfSj8Pn0UwH7aGi0irnsPWTS3mNWEOySu9lPvJB/ZYcfrhbFkY8E/Vi2fBxdAzJ5R1Fyby0IZzGuOASHh+NI7tEF0bjq7CR9wY1c+Th6C9jo7cxUgrr7k2VaS1TmS4lMFUyW81oLqdQrMOixeqPVEJ1D67eGu7fGwneLQ/PwTIa7Awn02nOThOXtWiMvWEqwN45Wtq5t2xbTIJq1HPGlxR6T2hnJIGIjQrOF4axtRhOubTlAfelqiHEznQpGTQ1+xR6vD5SV5k35A8Jy39dNpRJvzd4yfU9+0XY1Ww2x8fpS+xT04jqON7Otz0rcUqEVb0fb2Saum8oUDcSN7wgIpqx6lNnaIg1kxp+M5U9HsACab77Gs/3Hx2y83szZO1IlP02o/rgh0UV/XPPI7drlCV+5ngTOi+Jnz7Wd3d8OLWnk/LslVmDtau4+uhS+0z3LroD9WDd1DL+4x1L9vLkcrKjG1UO6n2ge/gJAnyeVdNhPTqLzzfVuVaobVy67+6o7KGagV84jgr3TXCVN1FUq41VVuH1AizPoi6pBNllY96kJWHXa/K+Be7cQwcdyhidD2p2qIVacxozUajwalIpakeHRvVM1xHKjQ2o8mpJSrUja5ErVEIUSsILuifplVcMrHFHzVwZu44GRDwtbrlFK9waq12HE34vVEHM1buvq3Xr0Nc/icx75Ji5maUDPn9+hN+7RtUoaQi3vnVKtaJ0bTXTrQulKrvisn9CZw/1qeTsCkfNN3LPWkdwBKn5J7H7ILaFzhQ/L6xcRSjpdzsbcr4q5fTt6beKysZ4IF/OjTV/wUqGKuXy92+u+qok7iNrQL1ud4Qeue3eoU7eXyqKgZf9ciHnHmu94eJm4Za0rOOZr0TTlKL8FXIHDIdaPXE6eTBRH0pfsKPhkg7t4B4/H3sbC6g52NyevEX4CncR6N28fSnd+Nnw+XNj+Nsvr6siVeDvPl7S+s/41PDNCK/bxo83Kbx8q1bgt17v1itVj8e8oeDB/uwj+DKNxv9LLTC/XuC1VQ2yvYs44AntPxeHvw2kMF7z+u0QVXiJUee6VfQTE4S4209GDViSKgo+juNN3Z7rHhyxClQXP592+NbTHD+E8gdBUBUOuyNtvjNh+INybtHnZWsWcWRFr3FbXu0Uoy52PgVkh7V5W1LjlUmQybbz9li+fQaxWL2vv32u9+b1zoEV51DvvXQs9WLpEnqsz2Hs0dCkv65ADeLuQLx8IXcHLat7OhTV8ucYt17N8yfRy9dhHiavkpVhJRizu21rFvJoR888+Js+zuxjSXhp+531m8yFsTtnLeyDn/79j6QZ5Wxz1HjCwq3tZQg7m7WLutLokdWAvC7z9Np5joeVr2evl/efoGk2IVcvtELoF9PLW8hztDXlDFfObzTqOYHUX8RpemmKv+TzndtXsOl7eAzn9i38PcsU46rnonoLtauQ60X7N6sz9LF9ym5wRc5s8d/LcwXMnzxc8d1Jd4MPmxTHpJcYyo9rFmsx4Yd0v5A16yXQuWkzmGkGYtYb5papLIJnz0jLCXos2e4YDnjSq25SBH8fb74ucviyh1+sOuc7874LcyAOguK8mTXqZex8NbGVCnPNzm9xN/VzHunfOpEkvNVejKtd5LiaZ9xrIaZgXTBr00iSTuURTTzDp2gg4xOe2P3vGvTTJXqvd7Fmqw1z2pOpNGvHy/sgtK9u2kYp8grrvWO0m74FcfnepNnfWILc9uw099lhPlDWp5aXOjmLdXl2dScu1XEcM/SvLp7VbQCY1vDSzGtWU4WtINnOWtSRzUN+k8moUukaQYQ6nSrJ1TT4Pe31yk/9l5KV82XYqDBVyZ+m8Ve9bmLRyJwGL9W7rTgLWVo/Ncuf3MHlH3v7cJrvgcE9pshP2+pQm/+vIVW5zlBhx+Z5E71uYVL7BI1Fn8HuY/AcM+d9IRQ5Z3AAAAABJRU5ErkJggg==',
  );
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

  const {userInfo, medium} = useSelector(state => state.auth);

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

  const backButtonHandler = () => {
    // if (isSKBSelected) {
    //   setIsSKBSelected(false);
    //   return true;
    // } else {
    //   return true;
    // }
    BackHandler.exitApp();
  };

  const getData = async () => {
    firestore()
      .collection('videoDetails')
      .onSnapshot(querySnapshot => {
        const songList = [];

        querySnapshot.forEach(documentSnapshot => {
          songList.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setSongList(songList);
        // setUsers(users);
        // setLoading(false);
      });
    firestore()
      .collection('LVideoDetail')
      .onSnapshot(querySnapshot => {
        const lSongList = [];

        querySnapshot.forEach(documentSnapshot => {
          lSongList.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setLSongList(lSongList);
        // setUsers(users);
        // setLoading(false);
      });
    setSearchList(songList.concat(lSongList));
    setLoading(false);
  };

  const signout = async () => {
    setUserInfoVisible(false);
    if (medium === 'google') {
      console.log('80', medium);
      navigation.navigate('Login');
      GoogleSignin.signOut();
    } else if (medium === 'facebook') {
      navigation.navigate('Login');
      LoginManager.logOut();
    }
  };

  function getId(url) {
    // const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    // const match = String(url).match(regExp);

    // const id = match && match[2].length === 11 ? match[2] : null;
    try {
      var video_id = String(url).split('v=')[1];
      var ampersandPosition = String(video_id).indexOf('&');
      if (ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
        return video_id;
      }
      if (video_id == undefined) {
        console.log('112', url);
        var newVideo_id = String(url).split('.be/')[1];
        video_id = newVideo_id.substring(0, 11);
        console.log('162', video_id);
        return video_id;
      }
    } catch (error) {
      return '';
    }
  }

  const performSearch = text => {
    console.log('180', text);
    let newSearchList = [];
    searchList.map((item, index) => {
      console.log('183', item, index);
      if (item.detail !== undefined && String(item.detail).includes(text)) {
        console.log('match', item);
        newSearchList.push(item);
      } else if (
        item.title !== undefined &&
        String(item.title).includes(text)
      ) {
        console.log('match', item);
        newSearchList.push(item);
      } else if (
        item.singer !== undefined &&
        String(item.singer).includes(text)
      ) {
        console.log('match', item);
        newSearchList.push(item);
      }
      return newSearchList;
    });
    setSearchList(newSearchList);
  };

  const addUser = () => {
    console.log('124', link, artist, songTitle);
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
        if (videoCode.length !== 11) {
          setError('Wrong Video Link !');
        } else {
          addToFireStoreBG(songTitle, artist, videoCode, collectionName).then(
            () => {
              setLoading(true);
              setAddVisible(false);
              getData();
            },
          );
        }
      }
    } else if (collectionName === 'LVideoDetail') {
      if (lmDesc.length == 0) {
        setError('Enter Description!');
      } else if (lmLink.length < 11) {
        setError('Wrong Video Link !');
      } else {
        var videoCode = getId(lmLink);
        if (videoCode.length !== 11) {
          setError('Wrong Video Link !');
        } else {
          addToFireStoreLM(lmDesc, videoCode, collectionName).then(() => {
            setLoading(true);
            setAddVisible(false);
            getData();
          });
        }
      }
    }
  };

  const renderContent = () => {
    if (searchBar) {
      return (
        <FlatList
          data={searchList}
          style={{
            padding: 5,
            flex: 0.5,
            height: vh(40),
            // marginTop: 65
          }}
          contentContainerStyle={{paddingBottom: 20}}
          ItemSeparatorComponent={() => {
            return <View style={{height: 5}} />;
          }}
          renderItem={({item, index}) => {
            if (item.detail === undefined) {
              return renderBGItem(item, index, navigation);
            } else {
              return renderLMItem(item, index, navigation);
            }
          }}
        />
      );
    } else if (isFirstTab) {
      return (
        <FlatList
          data={songList}
          // keyExtractor={({item, index}) => index + 'firstTab'}
          style={{
            padding: 5,
            flex: 0.7,
            height: vh(40),
            // marginTop: 50
          }}
          contentContainerStyle={{paddingBottom: 20}}
          ItemSeparatorComponent={() => {
            return <View style={{height: 5}} />;
          }}
          renderItem={({item, index}) => renderBGItem(item, index, navigation)}
        />
      );
    } else if (isSecondTab) {
      return (
        <FlatList
          data={lSongList}
          // keyExtractor={({item, index}) => index + 'secondTab'}
          style={{padding: 5, flex: 0.7, height: vh(40), marginTop: 50}}
          contentContainerStyle={{paddingBottom: 20}}
          ItemSeparatorComponent={() => {
            return <View style={{height: 5}} />;
          }}
          renderItem={({item, index}) => renderLMItem(item, index, navigation)}
        />
      );
    }
    // {isSKBSelected ? (
    //   <SKBWebSite />
    // ) : (
    //   <FlatList
    //     data={songList}
    //     style={{padding: 5, flex: 0.7, height: vh(40), marginTop: 40}}
    //     contentContainerStyle={{paddingBottom: 20}}
    //     ItemSeparatorComponent={() => {
    //       return <View style={{height: 5}} />;
    //     }}
    //     renderItem={({item, index}) => renderItem(item, index)}
    //   />
    // )}
  };

  if (loading) {
    return (
      <View
        style={{justifyContent: 'center', flex: 1, backgroundColor: '#9F0514'}}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{textAlign: 'center', color: '#fff'}}>Please wait...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView
      style={{justifyContent: 'center', backgroundColor: '#D9AF81', flex: 1}}>
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
          color="#FFEDDA"
          onPress={() => {
            navigation.openDrawer();
          }}
        />
        <Text
          style={{
            fontSize: 32,
            color: '#FFEDDA',
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
      <View
        style={{
          margin: 5,
          flex: 0.1,
          justifyContent: 'flex-start',
          height: vh(10),
        }}>
        <View
          style={{
            backgroundColor: '#FFF5E4',
            padding: 5,
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
          <View
            style={{flex: 0.1}}
            // onPress={() => {
            //   setUserInfoVisible(true);
            // }}
          >
            <Image
              style={{height: 40, width: 40, borderRadius: 20}}
              source={{uri: dp}}
            />
          </View>
          <Text
            style={{
              fontSize: 19,
              color: '#4C2F10',
              marginLeft: 10,
              flex: 0.5,
              alignSelf: 'center',
            }}>
            {`नमस्कार! ${name}`}
          </Text>
          {!(
            userInfo.email == 'chhayajhacj@gmail.com' ||
            userInfo.email == 'pratikkashyap.mvp@gmail.com'
          ) ? (
            <TouchableOpacity
              onPress={() => {
                setError('');
                setAddVisible(true);
              }}
              style={{flex: 0.4}}>
              <Text
                style={{
                  textAlign: 'right',
                  fontSize: 30,
                  marginRight: 10,
                }}>
                +
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      {renderContent()}
      <Modal
        visible={userInfoVisible}
        style={{flex: 1}}
        onDismiss={() => setUserInfoVisible(false)}
        dismissable={true}>
        <View
          style={{
            backgroundColor: '#FFF5E4',
            width: vw(80),
            alignSelf: 'center',
            borderRadius: 10,
            padding: 10,
          }}>
          <View
            style={{
              backgroundColor: '#FFF5E4',
              padding: 5,
              borderRadius: 10,
              flexDirection: 'row',
              alignSelf: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              width: vw(70),
            }}>
            <Image
              style={{height: 50, width: 50, borderRadius: 25}}
              source={{uri: dp}}
            />
            <View>
              <Text
                style={{
                  fontSize: 18,
                  color: '#000',
                  marginLeft: 10,
                  fontWeight: 'bold',
                  marginTop: 5,
                }}>
                {medium == 'google' ? `${userInfo.name}` : `${userInfo.name}`}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#000',
                  marginLeft: 10,
                }}>
                {medium == 'google' ? `${userInfo.email}` : `${userInfo.email}`}
              </Text>
            </View>
          </View>

          <Text style={{textAlign: 'center', marginTop: 10, color: 'blue'}}>
            Logged in via {medium}
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('Intro')}
            style={{
              backgroundColor: '#9F0514',
              alignSelf: 'center',
              borderRadius: 30,
              width: vw(55),
              padding: 10,
              marginTop: 20,
            }}>
            <Text style={{color: '#fff', textAlign: 'center', fontSize: 20}}>
              ▶️ एप्लिकेशन बुझिऔ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              signout();
            }}
            style={{
              backgroundColor: '#9F0514',
              marginTop: 10,
              padding: 10,
              width: vw(55),
              alignSelf: 'center',
              borderRadius: 30,
              elevation: 2,
            }}>
            <Text style={{textAlign: 'center', color: '#fff', fontSize: 16}}>
              Logout !!
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <AddUser
        addVisible={addVisible}
        onDismiss={() => setAddVisible(false)}
        singerNameChange={song => setSongTitle(song.nativeEvent.text)}
        artistNameChange={artist => setArtist(artist.nativeEvent.text)}
        linkChange={link => setLink(link.nativeEvent.text)}
        addUser={addUser}
        error={error}
        chooseCollection={collection => {
          setCollectionName(collection);
        }}
        descChange={lmDesc => setLMDesc(lmDesc.nativeEvent.text)}
        lmLinkChange={link => setLMLink(link.nativeEvent.text)}
      />
    </SafeAreaView>
  );
}

export default Home;
