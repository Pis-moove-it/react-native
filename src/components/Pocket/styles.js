import { StyleSheet } from 'react-native';
import Colors from '../../helpers/Colors';

const styles = StyleSheet.create({
  // Phone styles
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  containerPhonePocket: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
  },
  containerItemPhone: {
    flex: 1,
    paddingLeft: 10,
  },
  textBlackPhone: {
    fontSize: 16,
    color: 'black',
  },
  textButton: {
    flex: 1,
    color: Colors.white,
    fontSize: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pocketImageStylePhone: {
    height: 60,
    width: 50,
    borderRadius: 20,
  },
  containerButtonPhone: {
    flex: 2,
    padding: 0,
    alignContent: 'flex-end',
  },
  wrapperButtonPhone: {
    flex: 2,
    flexDirection: 'row',
    alignContent: 'flex-end',
  },
  phoneButton: {
    alignSelf: 'flex-end',
    margin: '5%',
    minWidth: 100,
    backgroundColor: Colors.primary,
  },
  phoneBlueButton: {
    alignSelf: 'flex-end',
    margin: '5%',
    minWidth: 100,
    backgroundColor: Colors.secondary,
  },
  touchableStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerEdit: {
    flex: 0,
    paddingLeft: 10,
  },

  // Info styles
  containerPocketInfo: {
    justifyContent: 'flex-start',
    backgroundColor: Colors.primary,
    paddingBottom: '2%',
  },
  informationTitle: {
    marginLeft: '3%',
    fontSize: 18,
    color: 'white',
  },
  containterTimeAndWeightInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: '2%',
  },
  subContainerTimeAndWeigthInfo: {
    padding: '1%',
    width: '50%',
    backgroundColor: 'white',
  },
  titleTimeAndWeightInfo: {
    marginHorizontal: '2%',
    fontSize: 14,
    color: 'black',
  },
  subtitleTimeAndWeightInfo: {
    marginHorizontal: '2%',
    fontSize: 14,
    color: 'gray',
  },

  // Tablet syles
  containerTabletPocket: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
  },
  tabletButton: {
    backgroundColor: Colors.primary,
  },
  tabletBlueButton: {
    backgroundColor: Colors.secondary,
  },
  pocketImageStyleTablet: {
    height: 100,
    width: 100,
  },
  textGrayTablet: {
    fontSize: 14,
    color: 'gray',
  },
  textBlackTablet: {
    fontSize: 14,
    color: 'black',
  },
  containerItemTablet: {
    flex: 1,
    paddingLeft: 10,
  },
  containerButtonTablet: {
    flex: 2,
    paddingLeft: 10,
  },
  tabletButtonText: {
    color: Colors.white,
    fontSize: 17,
  },
});

export default styles;
