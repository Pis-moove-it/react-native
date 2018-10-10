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
    fontWeight: 'bold',
  },
  baleComponentElement: {
    width: '30%',
  },
  editBaleButton: {
    width: '30%',
    height: '55%',
    marginTop: 20,
    backgroundColor: Colors.primary,
    textAlign: 'center',
    position: 'absolute',
    right: 20,
  },
  textButton: {
    flex: 1,
    color: Colors.white,
    fontSize: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  baleImageStylePhone: {
    height: 60,
    width: 50,
    borderRadius: 20,
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
});

export default styles;
