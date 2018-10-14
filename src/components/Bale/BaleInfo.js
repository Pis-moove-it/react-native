import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import strings from '../../localization';
import styles from './styles';

const BaleInfo = () => (
  <View style={styles.containerBaleInfo}>
    <Text style={styles.infoStyle}>{strings.information}</Text>
  </View>
);

BaleInfo.propTypes = {
  id: PropTypes.string,
};

BaleInfo.defaultProps = {
  id: '',
};

export default BaleInfo;
