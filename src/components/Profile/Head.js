import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Header, Avatar } from 'react-native-elements';
import PropTypes from 'prop-types';
import Platform from '../../helpers/Platform';
import Colors from '../../helpers/Colors';
import TextStyles from '../../helpers/TextStyles';
import logo2 from '../../assets/images/Logo02.png';
import avatar from '../../assets/ic_user/ic_user32.png';
import hamburger from '../../assets/ic_common/ic_hamburgerCircular.png';

const styles = StyleSheet.create({
  leftLogo: {
    width: 106,
  },
});

// eslint-disable-next-line react/prefer-stateless-function
class Head extends Component {
  render() {
    const { title } = this.props;
    const { isTablet } = Platform.isTablet;
    return (
      <Header
        backgroundColor={Colors.primary}
        placement="left"
        leftComponent={<Avatar medium source={logo2} avatarStyle={styles.leftLogo} />}
        centerComponent={isTablet ? { text: title, style: TextStyles.lightTitle } : { text: '' }}
        rightComponent={<Avatar rounded small source={isTablet ? avatar : hamburger} />}
      />
    );
  }
}

Head.propTypes = {
  title: PropTypes.string,
};

Head.defaultProps = {
  title: '',
};

export default Head;
