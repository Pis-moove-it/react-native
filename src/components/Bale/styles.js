import { StyleSheet } from 'react-native';
import Colors from '../../helpers/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  editBaleButton: {
    width: '40%',
    backgroundColor: Colors.primary,
    marginTop: 0,
  },
  textButton: {
    color: Colors.white,
    fontSize: 13,
  },
  baleImageStyle: {
    width: 100,
    borderRadius: 100,
  },
});

export default styles;
