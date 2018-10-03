import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Colors from '../../helpers/Colors';

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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

const CustomButton = ({ text, icon }) => (
  <TouchableOpacity style={styles.button}>
    <Image style={styles.icon} source={icon} />
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

export default CustomButton;
