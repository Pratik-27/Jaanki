import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 500,
  },
  dropdownContentContainer: {
    flex: 1,
    minHeight: 50,
    maxHeight: 500,
    maxWidth: 500,
    alignSelf: 'center',
    width: '75%',
    marginTop: 10,
  },
  dropdownTextStyle: {
    fontSize: 14,
    color: '#573108',
  },
  itemStyle: {
    padding: 8,
    fontSize: 14,
    color: '#573108',
    paddingHorizontal: 5
  },
  modalContainer: {
    backgroundColor: '#FFF5E4',
    width: '80%',
    height: 400,
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
  },
  dropdownContainer: {
    minHeight: 40,
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 5
  },
  dropdownText: {
    fontSize: 16,
    color: '#774916',
    // padding: 10,
    flex: 1,

  },
  errorText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Add more styles as needed
});
