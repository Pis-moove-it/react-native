import { StyleSheet } from 'react-native';
import Colors from '../../helpers/Colors';

const styles = StyleSheet.create({
  // Portrait and tablet

  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  titleContainer: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.primary,
    alignSelf: 'center',
  },
  dateAndHourContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 7,
    marginHorizontal: '8%',
  },
  dateContainer: {
    display: 'flex',
    width: '75%',
  },
  hourContainer: {
    display: 'flex',
    width: '25%',
    alignItems: 'flex-end',
  },
  dateAndHourTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
  },
  dateSubtitle: {
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
  mapContainer: {
    flex: 1,
    zIndex: -1,
  },
  kmsAndPocketsContainer: {
    flexDirection: 'column',
    marginVertical: 8,
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

  // Landscape (phone only)

  containerLandscape: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  mapContainerLandscape: {
    flex: 0,
    zIndex: -1,
    width: '50%',
    height: '100%',
  },
  infoContainerLandscape: {
    flex: 1,
    width: '40%',
    marginHorizontal: '3%',
    height: '100%',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    flexDirection: 'column',
  },
  titleContainerLandscape: {
    width: '100%',
    alignItems: 'center',
  },
  dateContainerLandscape: {
    display: 'flex',
    flexDirection: 'column',
  },
  hourContainerLandscape: {
    display: 'flex',
    flexDirection: 'column',
  },
  hourSubtitleLandscape: {
    fontSize: 15,
    fontWeight: '300',
    color: Colors.black,
    marginLeft: 5,
  },
  kmsAndPocketsTitleLandscape: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
  },
  kmsContainerLandscape: {
    marginLeft: 2,
  },
  kmsSubtitleLandscape: {
    fontSize: 15,
    fontWeight: '300',
    color: Colors.black,
    marginLeft: 5,
  },
  pocketsContainerLandscape: {
    marginLeft: 7,
  },
  pocketsSubtitleLandscape: {
    fontSize: 15,
    fontWeight: '300',
    color: Colors.black,
  },
});

export default styles;
