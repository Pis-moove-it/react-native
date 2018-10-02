import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet, Text } from 'react-native';
import FardoIcon from '../../assets/images/FardoIcon.png';
import Button from '../common/Button';
import strings from '../../localization';
import Colors from '../../helpers/Colors';

const stylesTabletItem = StyleSheet.create({
  container: {
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
  image: {
    height: 100,
    width: 100,
  },
  textGray: {
    fontSize: 14,
    color: 'gray',
  },
  textBlack: {
    fontSize: 14,
    color: 'black',
  },
  containerItem: {
    flex: 1,
    paddingLeft: 10,
  },
  containerButton: {
    flex: 2,
    paddingLeft: 10,
  },
  tabletButtonText: {
    color: Colors.white,
    fontSize: 17,
  },
});

const TabletBale = ({ id, type, weight }) => (
  <View style={stylesTabletItem.container}>
    <Image source={FardoIcon} style={stylesTabletItem.image} />
    <View style={stylesTabletItem.containerItem}>
      <Text style={stylesTabletItem.textBlack}>Fardo:</Text>
      <Text style={stylesTabletItem.textGray}>{`#${id}`}</Text>
    </View>
    <View style={stylesTabletItem.containerItem}>
      <Text style={stylesTabletItem.textBlack}>Tipo:</Text>
      <Text style={stylesTabletItem.textGray}>{`${type}`}</Text>
    </View>
    <View style={stylesTabletItem.containerItem}>
      <Text style={stylesTabletItem.textBlack}>Peso:</Text>
      <Text style={stylesTabletItem.textGray}>{`${weight} kg`}</Text>
    </View>
    <View style={stylesTabletItem.containerButton}>
      <Button
        style={stylesTabletItem.tabletButton}
        title={strings.baleButtonText}
        textStyle={stylesTabletItem.tabletButtonText}
      />
    </View>
  </View>
);

TabletBale.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  weight: PropTypes.string,
};

TabletBale.defaultProps = {
  id: '',
  type: '',
  weight: 0,
};

export default TabletBale;
