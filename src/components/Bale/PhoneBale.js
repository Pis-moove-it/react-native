import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import FardoIcon from '../../assets/images/BaleIcon.png';
import Button from '../common/Button';
import strings from '../../localization';
import styles from './styles';
import BaleInfo from './BaleInfo';

const Bale = ({ id, onPressAction }) => (
  <View style={styles.containerPhoneBale}>
    <TouchableOpacity onPress={onPressAction} style={styles.touchableStyle}>
      <Image source={FardoIcon} style={styles.baleImageStylePhone} />
      <Text style={styles.text}>{`${strings.bale} #${id}`}</Text>
    </TouchableOpacity>
    <Button
      title={strings.baleButtonText}
      style={styles.editBaleButton}
      textStyle={styles.textButton}
    />
  </View>
);

Bale.propTypes = {
  id: PropTypes.string,
  onPressAction: PropTypes.func,
};

Bale.defaultProps = {
  id: '',
  onPressAction: () => ({}),
};

class PhoneBale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      showingInfo: false,
    };
  }

  toggleInfo = () => this.setState({ showingInfo: !this.state.showingInfo });

  render() {
    if (this.state.showingInfo) {
      return (
        <View>
          <Bale id={this.state.id} onPressAction={this.toggleInfo} />
          <BaleInfo />
        </View>
      );
    }
    return (
      <View>
        <Bale id={this.state.id} onPressAction={this.toggleInfo} />
      </View>
    );
  }
}

PhoneBale.propTypes = {
  id: PropTypes.string,
};

PhoneBale.defaultProps = {
  id: '',
};

export default PhoneBale;
