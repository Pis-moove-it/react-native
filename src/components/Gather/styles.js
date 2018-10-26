import { StyleSheet } from 'react-native';
import Colors from '../../helpers/Colors';
import icon from '../../assets/images/MapPointIcon.png';

const stylesGather = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 1,
    zIndex: -1,
  },
  overlayTimeText: {
    color: Colors.white,
    fontSize: 70,
  },
  overlayDayText: {
    color: Colors.white,
    fontSize: 25,
  },
  button: {
    justifyContent: 'center',
    height: 50,
  },
  textButton: {
    fontSize: 20,
  },
  activityIndicator: {
    margin: '2%',
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'orange',
    transform: [{ scale: 0.6 }],
  },
  trashIcon: {
    width: 70,
    height: 70,
  },
  buttonOverMap: {
    width: 150,
    height: 30,
    position: 'absolute',
    bottom: 0,
    marginBottom: '8%',
    marginLeft: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  },
  textButtonOverMap: {
    color: 'black',
    fontSize: 12,
    paddingBottom: 6,
  },
});

export default stylesGather;
