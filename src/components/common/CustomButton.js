import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../../helpers/Colors';

const styles = StyleSheet.create({
  touchable: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 50,
    height: 50,
    margin: 6,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.black,
  },
});

const HistoryButton = ({ text, icon }) => (
  <TouchableOpacity>
    <View style={styles.touchable}>
      <Image style={styles.icon} source={icon} />
      <Text style={styles.text}>{text}</Text>
    </View>
  </TouchableOpacity>
);

HistoryButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.isRequired,
};

export default HistoryButton;
