import { StyleSheet } from 'react-native';
import Colors from '../helpers/Colors';

const styles = StyleSheet.create({
  lightTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.white,
  },
  textField: {
    fontSize: 15,
    fontWeight: 'normal',
  },
  fieldTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.primary,
  },
  error: {
    fontSize: 14,
    color: Colors.red,
  },
  drawerButtons: {
    color: Colors.black,
    fontSize: 18,
  },
  drawerLowerButtons: {
    color: Colors.black,
    fontSize: 18,
    margin: 10,
    flexShrink: 1,
  },
});

export default styles;
