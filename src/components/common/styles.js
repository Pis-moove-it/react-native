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
  topHalf: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: Colors.white,
    padding: 10,
  },
  bottomHalf: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    backgroundColor: Colors.white,
    padding: 10,
  },
  containerWrapper: {
    flex: 1,
    marginLeft: '30%',
    flexDirection: 'column',
  },
  button: {
    justifyContent: 'center',
    height: 50,
  },
  textButton: {
    fontSize: 20,
  },
  userOptionsButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginLeft: '5%',
  },
  textTitleStyle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.primary,
    textAlign: 'center',
  },

  // EditModal
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
  textFieldView: {
    width: '50%',
  },
});

export default styles;
