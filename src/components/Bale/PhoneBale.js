import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Avatar, Image } from 'react-native-elements';
import FardoIcon from '../../assets/images/FardoIcon.png';
import Button from '../common/Button';
import Colors from '../../helpers/Colors';

const PhoneBale = ({ id }) => (
  <ListItem
    key={id}
    title={`Fardo #${id}`}
    avatar={<Avatar size="medium" rounded noBorder source={FardoIcon} />}
    avatarStyle={{ size: 'medium', borderBottomWidth: 0 }}
    rightIcon={
      <Button
        title="Modificar fardo"
        style={{
          alignSelf: 'center',
          width: '40%',
          backgroundColor: Colors.primary,
        }}
        textStyle={{ color: Colors.white, fontSize: 13 }}
      />
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
