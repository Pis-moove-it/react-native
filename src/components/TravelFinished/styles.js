import { StyleSheet } from 'react-native';
import Colors from '../../helpers/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  resumeAndHourContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '10%',
    marginHorizontal: '8%',
  },
  resumeContainer: {
    display: 'flex',
    width: '75%',
  },
  hourContainer: {
    display: 'flex',
    width: '25%',
    alignItems: 'flex-end',
  },
  resumeAndHourTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary,
  },
  kmsAndPocketsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10%',
    marginHorizontal: '10%',
    justifyContent: 'space-evenly',
  },
  kmsAndPocketsTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.primary,
  },
});

export default styles;
