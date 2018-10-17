import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Colors from '../../helpers/Colors';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.white,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

const CustomButton = props => (
  <TouchableOpacity {...props} style={[styles.button, props.style]}>
    <Image style={styles.icon} source={props.icon} />
    <Text style={[styles.text, props.textStyle]}>{props.title}</Text>
  </TouchableOpacity>
);

CustomButton.propTypes = {
  style: PropTypes.object,
  textStyle: PropTypes.object,
  title: PropTypes.string,
  icon: PropTypes.object.isRequired,
};

CustomButton.defaultProps = {
  style: null,
  textStyle: null,
  title: '',
};

export default CustomButton;
