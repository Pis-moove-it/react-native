import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';
import PocketIcon from '../../assets/images/PocketIcon.png';
import Button from '../common/Button';
import strings from '../../localization';
import styles from './styles';

const PhonePocket = ({ id, pocketState }) => (
  <View style={styles.containerPhonePocket}>
    <Image source={PocketIcon} style={styles.pocketImageStylePhone} />
    <Text style={styles.textBlackPhone}>
      {strings.pocket} #{id}
    </Text>
    <View style={styles.containerButtonPhone}>
      <Button
        style={pocketState === 'Unweighed' ? styles.phoneButton : styles.phoneGrayButton}
        title={
          pocketState === 'Unweighed'
            ? strings.pocketButtonWeightText
            : strings.pocketButtonEditWeightText
        }
        textStyle={styles.tabletButtonText}
      />
    </View>
  </View>
);

PhonePocket.propTypes = {
  id: PropTypes.string.isRequired,
  pocketState: PropTypes.string.isRequired,
};

export default PhonePocket;
