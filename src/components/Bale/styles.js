import { StyleSheet } from 'react-native';
import Colors from '../../helpers/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
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
    width: '40%',
    height: '55%',
    backgroundColor: Colors.primary,
    padding: 0,
    textAlign: 'center',
    marginTop: 13,
  },
  textButton: {
    flex: 1,
    color: Colors.white,
    fontSize: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  baleImageStyle: {
    width: 50,
    height: 60,
    marginRight: 5,
  },
});

export default styles;
