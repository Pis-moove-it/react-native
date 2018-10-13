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
  pocketComponentTitle: {
    fontWeight: 'bold',
  },
  pocketComponentElement: {
    width: '30%',
  },
  pocketButtonWeightText: {
    width: '30%',
    height: '55%',
    marginTop: 20,
    backgroundColor: Colors.primary,
    position: 'absolute',
    right: 20,
  },
  pocketButtonEditWeightText: {
    width: '30%',
    height: '55%',
    marginTop: 20,
    backgroundColor: Colors.gray,
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
  pocketImageStylePhone: {
    height: 60,
    width: 50,
    borderRadius: 20,
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
  tabletGrayButton: {
    backgroundColor: Colors.gray,
    borderWidth: 0,
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
