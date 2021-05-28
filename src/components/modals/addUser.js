/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {TouchableOpacity, View, Text, TextInput} from 'react-native';
import {Modal} from 'react-native-paper';
import {vh, vw} from '../../assets/styles/main';

export default function AddUser({
  addVisible,
  onDismiss,
  singerNameChange,
  artistNameChange,
  linkChange,
  addUser,
  error,
  chooseCollection,
  lmLinkChange,
  descChange,
}) {
  const [isFirstTab, setIsFirstTab] = useState(true);
  const [isSecondTab, setIsSecondTab] = useState(false);

  const renderForm = () => {
    if (isFirstTab) {
      return (
        <View>
          <TextInput
            style={{
              fontSize: 16,
              height: 40,
              width: vw(55),
              borderWidth: 1,
              borderRadius: 5,
              alignSelf: 'center',
              marginBottom: 10,
              marginTop: 10,
            }}
            placeholder="गीत"
            onChange={singerNameChange}
          />
          <TextInput
            style={{
              fontSize: 16,
              height: 40,
              width: vw(55),
              borderWidth: 1,
              borderRadius: 5,
              alignSelf: 'center',
              marginBottom: 10,
            }}
            placeholder="गीतगाइन"
            onChange={artistNameChange}
          />
          <TextInput
            style={{
              fontSize: 16,
              height: 40,
              width: vw(55),
              borderWidth: 1,
              borderRadius: 5,
              alignSelf: 'center',
              marginBottom: 10,
            }}
            placeholder="Youtube Link"
            onChange={linkChange}
            //   onChange={e => console.log(e.nativeEvent.text)}
          />
        </View>
      );
    } else if (isSecondTab) {
      return (
        <View>
          <TextInput
            style={{
              fontSize: 16,
              height: 40,
              width: vw(55),
              borderWidth: 1,
              borderRadius: 5,
              alignSelf: 'center',
              marginBottom: 10,
            }}
            placeholder="विवरण"
            onChange={descChange}
          />
          <TextInput
            style={{
              fontSize: 16,
              height: 40,
              width: vw(55),
              borderWidth: 1,
              borderRadius: 5,
              alignSelf: 'center',
              marginBottom: 10,
            }}
            placeholder="Youtube Link"
            onChange={lmLinkChange}
            //   onChange={e => console.log(e.nativeEvent.text)}
          />
        </View>
      );
    }
  };

  return (
    <Modal
      visible={addVisible}
      style={{flex: 1}}
      onDismiss={onDismiss}
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
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 5,
            height: vh(7),
          }}>
          <TouchableOpacity
            onPress={() => {
              setIsFirstTab(true);
              setIsSecondTab(false);
              chooseCollection('videoDetails');
            }}>
            <View
              style={{
                width: vw(20),
                borderWidth: isFirstTab ? 4 : 2,
                height: isFirstTab ? vh(6) : vh(5),
                justifyContent: 'center',
                marginRight: 5,
                backgroundColor: '#f28744',
                borderRadius: 15,
              }}>
              <Text
                style={{
                  fontSize: isFirstTab ? 22 : 20,
                  color: '#fff',
                  textAlign: 'center',
                  fontFamily: 'Amita-Bold',
                }}>
                भगवती गीत
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsFirstTab(false);
              setIsSecondTab(true);
              chooseCollection('LVideoDetail');
            }}>
            <View
              style={{
                width: vw(20),
                borderWidth: isSecondTab ? 4 : 2,
                height: isSecondTab ? vh(6) : vh(5),
                justifyContent: 'center',
                marginLeft: 5,
                backgroundColor: '#0d92a1',
                borderRadius: 15,
              }}>
              <Text
                style={{
                  fontSize: isSecondTab ? 22 : 20,
                  color: '#fff',
                  textAlign: 'center',
                  fontFamily: 'Amita-Bold',
                }}>
                लुरिगरि मैथिलानी
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {error !== '' ? (
          <Text
            style={{
              color: 'red',
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {error}
          </Text>
        ) : null}
        {renderForm()}
        <TouchableOpacity
          onPress={addUser}
          style={{
            backgroundColor: '#9F0514',
            marginTop: 10,
            padding: 10,
            width: vw(50),
            alignSelf: 'center',
            borderRadius: 30,
            elevation: 2,
          }}>
          <Text style={{textAlign: 'center', color: '#fff', fontSize: 16}}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
