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
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primary,
    padding: 0,
    marginHorizontal: 0,
  },
  resumeAndHourSubtitle: {
    fontSize: 15,
    fontWeight: '300',
    color: Colors.black,
  },
  imageContainer: {
    marginHorizontal: '10%',
    alignItems: 'center',
    flex: 1,
    zIndex: -1,
  },
  image: {
    width: '100%',
  },
  kmsAndPocketsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10%',
    marginHorizontal: '10%',
    alignItems: 'center',
  },
  kmsContainer: {
    alignItems: 'center',
  },
  pocketsContainer: {
    alignItems: 'center',
  },
  kmsAndPocketsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
  },
  kmsAndPocketsSubtitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.black,
  },
});

export default styles;
