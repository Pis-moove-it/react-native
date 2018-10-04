import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';
import FardoIcon from '../../assets/images/FardoIcon.png';
import Button from '../common/Button';
import strings from '../../localization';
import styles from './styles';

const TabletBale = ({ id, type, weight }) => (
  <View style={styles.containerTabletBale}>
    <Image source={FardoIcon} style={styles.baleImageStyleTablet} />
    <View style={styles.containerItemTablet}>
      <Text style={styles.textBlackTablet}>Fardo:</Text>
      <Text style={styles.textGrayTablet}>{`#${id}`}</Text>
    </View>
    <View style={styles.containerItemTablet}>
      <Text style={styles.textBlackTablet}>Tipo:</Text>
      <Text style={styles.textGrayTablet}>{`${type}`}</Text>
    </View>
    <View style={styles.containerItemTablet}>
      <Text style={styles.textBlackTablet}>Peso:</Text>
      <Text style={styles.textGrayTablet}>{`${weight} kg`}</Text>
    </View>
    <View style={styles.containerButtonTablet}>
      <Button
        style={styles.tabletButton}
        title={strings.baleButtonText}
        textStyle={styles.tabletButtonText}
      />
    </View>
  </View>
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
