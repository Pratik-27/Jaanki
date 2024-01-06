import React, {useRef, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Modal} from 'react-native-paper';
import ModalDropdown from 'react-native-modal-dropdown';
import {vh, vw} from '../../assets/styles/main';
import {styles} from './styles'; // Import your styles
import {geetOptions, podCastOptions, typeOptions} from '../common/strings';

export default function AddUserModal({
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
  const [type, setType] = useState(null);

  const [genreList, setGenreList] = useState(null);

  const dropdownRef = useRef('');
  const dropdowngenreRef = useRef('');


  const genreDropDown = () => {
    return (
      <>
        <ModalDropdown
          onLayout={e => {
            console.log('layout', e);
          }}
          ref={dropdowngenreRef}
          options={genreList}
          defaultValue="Select1 Type of Item 2"
          dropdownStyle={styles.dropdownContentContainer}
          dropdownTextStyle={styles.dropdownTextStyle}
          // onSelect={(index, value) => {
          //   setSelectedForm(value);
          // }}

          renderRow={(option, index, isSelected) => (
            <TouchableOpacity
              style={{padding: 5, paddingHorizontal: 10}}
              onPress={() => {
                dropdownRef.current?.hide();
                console.log('asasa', option);
                // setType(option);
                // if (option.geet) {
                //   set
                // }
              }}>
              <Text
                style={[
                  styles.itemStyles,
                  {
                    color: '#573108',
                  },
                ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          )}
          style={styles.dropdownContainer}
          textStyle={styles.dropdownText}>
          {type ? (
            <Text style={{ color: '#774916', fontSize: 16 }}>{type.label}</Text>
          ) : (
            <Text>{'Select the genre'}</Text>
          )}
        </ModalDropdown>
      </>
    );
  }

  const renderForm = () => {
    return (
      <>
        <ModalDropdown
          onLayout={e => {
            console.log('layout', e);
          }}
          ref={dropdownRef}
          options={typeOptions}
          defaultValue="Select type of item"
          dropdownStyle={styles.dropdownContentContainer}
          dropdownTextStyle={styles.dropdownTextStyle}
          // onSelect={(index, value) => {
          //   setSelectedForm(value);
          // }}

          renderRow={(option, index, isSelected) => (
            <TouchableOpacity
              style={{padding: 5, paddingHorizontal: 10}}
              onPress={() => {
                dropdownRef.current?.hide();
                console.log('asasa', option);
                setType(option);
                if (option.value === 'geet') {
                  setGenreList(geetOptions);
                } else if (option.value === 'podcasts') {
                  setGenreList(podCastOptions);
                }
              }}>
              <Text
                style={[
                  styles.itemStyles,
                  {
                    color: '#573108',
                  },
                ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          )}
          style={styles.dropdownContainer}
          textStyle={styles.dropdownText}>
          {type ? (
            <Text style={{ color: '#774916', fontSize: 16 }}>{type.label}</Text>
          ) : (
            <Text>{'Select Type of Item'}</Text>
          )}
        </ModalDropdown>
        {genreDropDown()}
      </>
    );
    // if (selectedForm === 'भगवती गीत') {
    //   return (
    //     <View>
    //       <TextInput
    //         style={[styles.inputStyle, { marginBottom: 10 }]}
    //         placeholder="गीत"
    //         onChange={singerNameChange}
    //       />
    //       {/* Add other input fields with styles */}
    //     </View>
    //   );
    // } else if (selectedForm === 'लुरिगरि मैथिलानी') {
    //   return (
    //     <View>
    //       <TextInput
    //         style={[styles.inputStyle, { marginBottom: 10 }]}
    //         placeholder="विवरण"
    //         onChange={descChange}
    //       />
    //       {/* Add other input fields with styles */}
    //     </View>
    //   );
    // }
  };

  return (
    <Modal visible={addVisible} style={styles.container} onDismiss={onDismiss}>
      <View style={styles.modalContainer}>
        <Text>Add Items</Text>
        {error !== '' && <Text style={styles.errorText}>{error}</Text>}
        {renderForm()}
        {/* Add other components with styles */}
      </View>
    </Modal>
  );
}
