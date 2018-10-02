import React from 'react';
import PropTypes from 'prop-types';
import { Image, View, Text } from 'react-native';
import FardoIcon from '../../assets/images/FardoIcon.png';
import Button from '../common/Button';
import strings from '../../localization';
import styles from './styles';

const PhoneBale = ({ id }) => (
  <View style={styles.containerPhoneBale}>
    <Image source={FardoIcon} style={styles.baleImageStyle} />
    <Text style={styles.text}>{`${strings.bale} #${id}`}</Text>
    <Button
      title={strings.baleButtonText}
      style={styles.editBaleButton}
      textStyle={styles.textButton}
    />
  </View>
);

PhoneBale.propTypes = {
  id: PropTypes.string,
};

PhoneBale.defaultProps = {
  id: '',
};

export default PhoneBale;
