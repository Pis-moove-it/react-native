import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import strings from '../../localization';
import styles from './styles';

const PocketInfo = ({ time, weight }) => (
  <View style={styles.containerPocketInfo}>
    <Text style={styles.informationTitle}>{strings.information}:</Text>
    <View style={styles.containterTimeAndWeightInfo}>
      <View style={styles.subContainerTimeAndWeigthInfo}>
        <Text style={styles.titleTimeAndWeightInfo}>{strings.arrivedAt}</Text>
        <Text style={styles.subtitleTimeAndWeightInfo}>{time}</Text>
      </View>
      <View style={styles.subContainerTimeAndWeigthInfo}>
        <Text style={styles.titleTimeAndWeightInfo}>{strings.weight}</Text>
        <Text style={styles.subtitleTimeAndWeightInfo}>
          {weight}
          kg
        </Text>
      </View>
    </View>
  </View>
);

PocketInfo.propTypes = {
  time: PropTypes.string,
  weight: PropTypes.string,
};

PocketInfo.defaultProps = {
  time: false,
  weight: false,
};

export default PocketInfo;
