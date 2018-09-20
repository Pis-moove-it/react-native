import { StyleSheet } from 'react-native';
import Colors from '../../helpers/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 40,
  },
  containerWrapper: {
    flex: 1,
  },
  button: {
    justifyContent: 'center',
    height: 50,
  },
  textButton: {
    fontSize: 20,
  }
});

export default styles;
