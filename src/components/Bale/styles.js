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
  containerPhoneBale: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
  },
  baleComponentTitle: {
    fontSize: 16,
    color: 'black',
  },
  baleComponentElement: {
    width: '30%',
  },
  editBaleButton: {
    width: '35%',
    height: '60%',
    marginTop: 20,
    backgroundColor: Colors.primary,
    textAlign: 'center',
    position: 'absolute',
    alignItems: 'center',
    right: 20,
  },
  textButton: {
    flex: 1,
    color: Colors.white,
    fontSize: 17,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  baleImageStylePhone: {
    height: 60,
    width: 50,
    borderRadius: 20,
  },
  touchableStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Phone information
  containerBaleInfo: {
    justifyContent: 'flex-start',
    backgroundColor: Colors.primary,
    paddingBottom: '2%',
  },
  informationTitle: {
    marginLeft: '3%',
    fontSize: 18,
    color: 'white',
  },
  containterTypeAndWeightInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: '2%',
  },
  subContainerTypeAndWeigthInfo: {
    padding: '1%',
    width: '50%',
    backgroundColor: 'white',
  },
  titleTypeAndWeightInfo: {
    marginHorizontal: '2%',
    fontSize: 14,
    color: 'black',
  },
  subtitleTypeAndWeightInfo: {
    marginHorizontal: '2%',
    fontSize: 14,
    color: 'gray',
  },

  // Tablet syles
  containerTabletBale: {
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
    textAlign: 'center',
  },
  baleImageStyleTablet: {
    height: 100,
    width: 100,
  },
  textGrayTablet: {
    fontSize: 20,
    color: 'gray',
  },
  textBlackTablet: {
    fontSize: 20,
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
    fontSize: 22,
  },
  tabletHeaderButton: {
    color: Colors.white,
    width: 170,
  },
  tabletHeaderText: {
    margin: 10,
    fontSize: 16,
  },

  // Modal styles
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
  button: {
    justifyContent: 'center',
    height: 50,
    width: 200,
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

  containerL: {
    flex: 1,
    justifyContent: 'center',
  },
  activity: {
    padding: 10,
    color: Colors.primary,
  },
});

export default styles;
