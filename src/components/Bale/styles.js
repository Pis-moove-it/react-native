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
});

export default styles;
