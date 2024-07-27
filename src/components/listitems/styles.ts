import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFDFBC',
    alignItems: 'center',
    padding: 10,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
    borderWidth: 1.5,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#B2814C',
    flex: 1,
  },
  imageContainer: {
    flex: 0.3,
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 5,
  },
  textContainer: {
    flex: 0.7,
    justifyContent: 'flex-start',
  },
  titleContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  title: {
    fontSize: 18,
    color: '#774916',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  singerText: {
    fontSize: 14,
    color: '#573108',
    fontWeight: '700',
  },
  singerLabel: {
    fontSize: 14,
    color: '#774916',
    fontWeight: '500',
  },
});
