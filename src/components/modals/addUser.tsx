import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { Modal } from 'react-native-paper';
import { geetOptions, podCastOptions, typeOptions } from '../common/strings';
import { styles } from './styles'; // Import your styles

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
      <ModalDropdown
        ref={dropdowngenreRef}
        options={genreList}
        defaultValue="Select Type of Item"
        dropdownStyle={styles.dropdownContentContainer}
        dropdownTextStyle={styles.dropdownTextStyle}
        renderRow={(option, index, isSelected) => (
          <TouchableOpacity
            style={{ padding: 5, paddingHorizontal: 10 }}
            onPress={() => {
              dropdowngenreRef.current?.hide();
              console.log('Selected genre:', option);
            }}
          >
            <Text
              style={[
                styles.itemStyles,
                { color: '#573108' },
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        )}
        style={styles.dropdownContainer}
        textStyle={styles.dropdownText}
      >
        {type ? (
          <Text style={{ color: '#774916', fontSize: 16 }}>{type.label}</Text>
        ) : (
          <Text>Select the genre</Text>
        )}
      </ModalDropdown>
    );
  }

  const renderForm = () => {
    return (
      <>
        <ModalDropdown
          ref={dropdownRef}
          options={typeOptions}
          defaultValue="Select type of item"
          dropdownStyle={styles.dropdownContentContainer}
          dropdownTextStyle={styles.dropdownTextStyle}
          renderRow={(option, index, isSelected) => (
            <TouchableOpacity
              style={{ padding: 5, paddingHorizontal: 10 }}
              onPress={() => {
                dropdownRef.current?.hide();
                console.log('Selected type:', option);
                setType(option);
                if (option.value === 'geet') {
                  setGenreList(geetOptions);
                } else if (option.value === 'podcasts') {
                  setGenreList(podCastOptions);
                }
              }}
            >
              <Text
                style={[
                  styles.itemStyles,
                  { color: '#573108' },
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          )}
          style={styles.dropdownContainer}
          textStyle={styles.dropdownText}
        >
          {type ? (
            <Text style={{ color: '#774916', fontSize: 16 }}>{type.label}</Text>
          ) : (
            <Text>Select Type of Item</Text>
          )}
        </ModalDropdown>
        {genreDropDown()}
      </>
    );
  };

  return (
    <Modal visible={addVisible} style={styles.container} onDismiss={onDismiss}>
      <View style={styles.modalContainer}>
        <Text>Add Items</Text>
        {error !== '' && <Text style={styles.errorText}>{error}</Text>}
        {renderForm()}
      </View>
    </Modal>
  );
}
