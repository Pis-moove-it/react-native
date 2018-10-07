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
  topHalf: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: Colors.white,
    padding: 10,
  },
  bottomHalf: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    backgroundColor: Colors.white,
    padding: 10,
  },
  containerWrapper: {
    flex: 1,
    marginLeft: '30%',
    flexDirection: 'column',
  },
  button: {
    justifyContent: 'center',
    height: 50,
  },
  textButton: {
    fontSize: 20,
  },
  userOptionsButton: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginLeft: '5%',
  },
  userOptionsButtonForRole: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginLeft: 0,
  },
});

export default styles;
