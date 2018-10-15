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
      <Text style={styles.baleComponentTitle}>
        {strings.bale} #{id}
      </Text>
    </TouchableOpacity>
    <Button
      title={strings.baleButtonText}
      style={styles.editBaleButton}
      textStyle={styles.textButton}
      onPress={onPressAction}
    />
  </View>
);

Bale.propTypes = {
  id: PropTypes.string,
  onPressAction: PropTypes.func,
};

Bale.defaultProps = {
  id: false,
  onPressAction: () => ({}),
};

class PhoneBale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      type: props.type,
      weight: props.weight,
      showingInfo: false,
    };
  }

  toggleInfo = () => this.setState({ showingInfo: !this.state.showingInfo });

  render() {
    if (this.state.showingInfo) {
      return (
        <View>
          <Bale id={this.state.id} onPressAction={this.toggleInfo} />
          <BaleInfo type={this.state.type} weight={this.state.weight} />
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
  type: PropTypes.string,
  weight: PropTypes.string,
};

PhoneBale.defaultProps = {
  id: false,
  type: false,
  weight: false,
};

export default PhoneBale;
