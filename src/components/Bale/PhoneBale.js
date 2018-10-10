import React from 'react';
import PropTypes from 'prop-types';
import { Image, View, Text } from 'react-native';
import FardoIcon from '../../assets/images/BaleIcon.png';
import Button from '../common/Button';
import strings from '../../localization';
import styles from './styles';

const PhoneBale = ({ id, onPressAction }) => (
  <View style={styles.containerPhoneBale}>
    <Image source={FardoIcon} style={styles.baleImageStylePhone} />
    <Text style={styles.text}>{`${strings.bale} #${id}`}</Text>
    <Button
      title={strings.baleButtonText}
      style={styles.editBaleButton}
      textStyle={styles.textButton}
      onPress={onPressAction}
    />
  </View>
);

PhoneBale.propTypes = {
  id: PropTypes.string,
  onPressAction: PropTypes.func,
};

PhoneBale.defaultProps = {
  id: '',
  onPressAction: () => ({}),
};

export default PhoneBale;
