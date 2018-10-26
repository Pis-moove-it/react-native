import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';
import PocketIcon from '../../assets/images/PocketIcon.png';
import Button from '../common/Button';
import CustomButton from '../common/CustomButton';
import PencilIcon from '../../assets/ic_common/ic_edit.png';
import strings from '../../localization';
import styles from './styles';

const TabletPocket = ({
  id, time, weight, pocketState,
}) => (
  <View style={styles.containerTabletPocket}>
    <Image source={PocketIcon} style={styles.pocketImageStyleTablet} />
    <View style={styles.containerItemTablet}>
      <Text style={styles.textBlackTablet}>{strings.pocket}</Text>
      <Text style={styles.textGrayTablet}>{`#${id}`}</Text>
    </View>
    <View style={styles.containerItemTablet}>
      <Text style={styles.textBlackTablet}>{strings.arrivedAt}</Text>
      <Text style={styles.textGrayTablet}>{`${time}`}</Text>
    </View>
    <View style={styles.containerItemTablet}>
      <Text style={styles.textBlackTablet}>{strings.weight}</Text>
      <Text style={styles.textGrayTablet}>
        {pocketState === 'Unweighed' ? strings.unweighted : `${weight} kg`}
      </Text>
    </View>
    <View style={styles.containerButtonTablet}>
      <Button
        style={pocketState === 'Unweighed' ? styles.tabletButton : styles.tabletBlueButton}
        title={
          pocketState === 'Unweighed'
            ? strings.pocketButtonWeightText
            : strings.pocketButtonEditWeightText
        }
        textStyle={styles.tabletButtonText}
      />
    </View>
    <View style={styles.containerEditTablet}>
      <CustomButton icon={PencilIcon} />
    </View>
  </View>
);

TabletPocket.propTypes = {
  id: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  pocketState: PropTypes.string.isRequired,
};

export default TabletPocket;
