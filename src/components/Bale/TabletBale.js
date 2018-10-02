import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import FardoIcon from '../../assets/images/FardoIcon.png';
import Button from '../common/Button';
import strings from '../../localization';
import styles from './styles';

const TabletBale = ({ id, type, weight }) => (
  <ListItem
    key={id}
    title={
      <View style={styles.baleComponentTitlesTablet}>
        <View style={styles.baleComponentElement}>
          <Text style={styles.baleComponentTitle}> {strings.baleComponentBale} </Text>
        </View>
        <View style={styles.baleComponentElement}>
          <Text style={styles.baleComponentTitle}> {strings.baleComponentType} </Text>
        </View>
        <View style={styles.baleComponentElement}>
          <Text style={styles.baleComponentTitle}> {strings.baleComponentWeight} </Text>
        </View>
      </View>
    }
    subtitle={
      <View style={styles.baleComponentSubtitlesTablet}>
        <View style={styles.baleComponentElement}>
          <Text> {`#${id}`} </Text>
        </View>
        <View style={styles.baleComponentElement}>
          <Text> {type} </Text>
        </View>
        <View style={styles.baleComponentElement}>
          <Text> {`${weight}kg`} </Text>
        </View>
      </View>
    }
    leftIcon={<Image source={FardoIcon} style={styles.baleImageStyle} />}
    rightIcon={
      <Button
        title={strings.baleButtonText}
        style={styles.editBaleButton}
        textStyle={styles.textButton}
      />
    }
  />
);

TabletBale.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  weight: PropTypes.string,
};

TabletBale.defaultProps = {
  id: '',
  type: '',
  weight: 0,
};

export default TabletBale;
