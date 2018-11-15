import { StyleSheet } from 'react-native';
import Colors from '../../helpers/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  formContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    marginHorizontal: '10%',
    padding: 20,
  },
  textField: {
    fontSize: 14,
  },
  textFieldTablet: {
    fontSize: 18,
  },
  activityIndicator: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.primary,
  },
  buttonTextTablet: {
    fontSize: 30,
    color: Colors.primary,
  },
});

export default styles;
