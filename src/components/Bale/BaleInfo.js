import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import strings from '../../localization';
import styles from './styles';

const BaleInfo = ({ type, weight }) => (
  <View style={styles.containerBaleInfo}>
    <Text style={styles.informationTitle}>{strings.information}:</Text>
    <View style={styles.containterTypeAndWeightInfo}>
      <View style={styles.subContainerTypeAndWeigthInfo}>
        <Text style={styles.titleTypeAndWeightInfo}>{strings.baleComponentType}</Text>
        <Text style={styles.subtitleTypeAndWeightInfo}>{type}</Text>
      </View>
      <View style={styles.subContainerTypeAndWeigthInfo}>
        <Text style={styles.titleTypeAndWeightInfo}>{strings.baleComponentWeight}</Text>
        <Text style={styles.subtitleTypeAndWeightInfo}>
          {weight}
          kg
        </Text>
      </View>
    </View>
  </View>
);

BaleInfo.propTypes = {
  type: PropTypes.string,
  weight: PropTypes.string,
};

BaleInfo.defaultProps = {
  type: false,
  weight: false,
};

export default BaleInfo;
