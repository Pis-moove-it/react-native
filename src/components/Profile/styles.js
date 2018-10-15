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
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  middleColumn: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightColumn: {
    flex: 2,
    alignItems: 'baseline',
    justifyContent: 'flex-start',
  },
  button: {
    justifyContent: 'center',
    height: 50,
  },
  buttonsContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userOptionsButton: {
    justifyContent: 'flex-start',
    flex: 0,
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
