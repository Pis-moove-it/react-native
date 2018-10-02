import { StyleSheet } from 'react-native';
import Colors from '../../helpers/Colors';

const styles = StyleSheet.create({
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
  baleComponentTitlesTablet: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontWeight: 'bold',
    paddingLeft: '8%',
  },
  baleComponentSubtitlesTablet: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingLeft: '8%',
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
  baleImageStyle: {
    height: 60,
    width: 50,
    borderRadius: 20,
  },
});

export default styles;
