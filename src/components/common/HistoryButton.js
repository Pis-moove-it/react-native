import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import Colors from '../../helpers/Colors';
import HistorialIcon from '../../assets/images/HistorialIcon.png';
import strings from '../../localization/Localization';

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
    color: Colors.white,
  },
});

const HistoryButton = () => (
  <TouchableOpacity>
    <View style={styles.touchable}>
      <Image style={styles.icon} source={HistorialIcon} />
      <Text style={styles.text}>{strings.history}</Text>
    </View>
  </TouchableOpacity>
);

export default HistoryButton;
