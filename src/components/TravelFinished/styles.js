import { StyleSheet } from 'react-native';
import Colors from '../../helpers/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  titleContainer: {
    marginTop: '5%',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.primary,
    alignSelf: 'center',
  },
  resumeAndHourContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '3%',
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
    fontWeight: '700',
    color: Colors.primary,
  },
  resumeSubtitle: {
    fontSize: 15,
    fontWeight: '300',
    color: Colors.black,
    marginLeft: 5,
  },
  hourSubtitle: {
    fontSize: 15,
    fontWeight: '300',
    color: Colors.black,
    marginRight: 10, // this is because of the space at the end of the "Hour" string
  },
  imageContainer: {
    marginHorizontal: '10%',
    alignItems: 'center',
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
