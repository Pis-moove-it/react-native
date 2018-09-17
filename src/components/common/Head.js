import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import {Header, Avatar} from 'react-native-elements';
import Platform from '../../helpers/Platform'
import Colors from '../../helpers/Colors';
import TextStyles from '../../helpers/TextStyles';



class Head extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {name} = this.props.title;
    const isTablet = Platform.isTablet;
    return (
      <Header
        backgroundColor={Colors.primary}
        placement="left"
        leftComponent={ 
          <Avatar 
            medium
            source={require('../../assets/images/Logo02.png')}
            avatarStyle={styles.leftLogo}
          /> 
        }
        centerComponent={isTablet ? { text: name, style : TextStyles.lightTitle} : {text: ''} }
        rightComponent={
          <Avatar
            rounded 
            small
            source={isTablet ? require('../../assets/ic_user/ic_user32.png') : require('../../assets/ic_common/ic_hamburgerCircular.png')}
          /> 
        }
      />
    )
  }
}

const styles = StyleSheet.create({
  leftLogo: {
    width: 106,
  }
})

export default Head;
