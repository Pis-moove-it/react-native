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
  leftColumn: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    height: 50,
  },
  textButton: {
    fontSize: 20,
  },
  buttonsContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 10,
  },
  userOptionsButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginLeft: '5%',
  },
  userOptionsButtonForRole: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '40%',
    marginLeft: 0,
  },
});

export default styles;
