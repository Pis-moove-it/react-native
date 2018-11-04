import { StyleSheet } from 'react-native';
import Colors from '../../helpers/Colors';

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
    fontSize: 20,
  },
  button: {
    justifyContent: 'center',
    height: 50,
  },
  textButton: {
    paddingLeft: 5,
    fontSize: 22,
    fontWeight: '700',
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
  buttonOverMapPhone: {
    width: 170,
    height: 45,
    position: 'absolute',
    bottom: '6%',
    marginLeft: '1.5%',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  },
  textButtonOverMapPhone: {
    color: 'black',
    fontSize: 12,
    fontWeight: '500',
    paddingLeft: 3,
  },
  tickStylePhone: {
    width: 30,
    height: 30,
  },
  buttonOverMapTablet: {
    width: 260,
    height: 80,
    position: 'absolute',
    bottom: '8%',
    marginLeft: '5%',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  },
  textButtonOverMapTablet: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    paddingLeft: 3,
  },
  tickStyleTablet: {
    width: 50,
    height: 50,
  },
  route: {
    color: 'black',
  },
  modalContainer: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    height: 300,
    width: 400,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonModal: {
    width: 200,
    backgroundColor: Colors.primary,
    alignSelf: 'stretch',
    borderColor: Colors.primary,
    borderWidth: 1,
    marginTop: 10,
    padding: 5,
    borderRadius: 5,
  },
  modalTitleContainer: {
    paddingTop: 15,
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 30,
    color: Colors.primary,
  },
  buttonText: {
    fontSize: 15,
    color: Colors.white,
  },
});

export default stylesGather;
