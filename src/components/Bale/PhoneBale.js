import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Avatar } from 'react-native-elements';
import FardoIcon from '../../assets/images/FardoIcon.png';
import Button from '../common/Button';
import styles from './styles';

const PhoneBale = ({ id }) => (
  <ListItem
    key={id}
    title={`Fardo #${id}`}
    leftIcon={
      <Avatar
        rounded
        small
        source={FardoIcon}
        avatarStyle={styles.baleImageStyle}
        activeOpacity={0.7}
        containerStyle={{ marginRight: 5, borderRadius: 100 }}
      />
    }
    rightIcon={
      <Button title="Modificar fardo" style={styles.editBaleButton} textStyle={styles.textButton} />
    }
  />
);

PhoneBale.propTypes = {
  id: PropTypes.string,
};

PhoneBale.defaultProps = {
  id: '',
};

export default PhoneBale;
