import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';
import TextField from '../common/TextField';
import strings from '../../localization';
import CustomButton from '../common/CustomButton';
import ErrorView from '../common/ErrorView';
import stylesGather from './styles';

class AddEventModal extends Component {
  state = {
    pocketsFromEvent: [],
    errors: [],
    identifier: false,
    description: false,
  };

  acceptEdit = () => {
    if (this.state.identifier > 0) {
      this.setState({
        pocketsFromEvent: [...(this.state.identifier, this.state.description)],
        identifier: 0,
        description: false,
      });
    } else {
      this.setState({ inputError: true });
      this.setState({ errors: [strings.invalidInputId] });
    }
  };

  closeModal = () => {
    this.setState({ inputError: false });
    this.setState({ identifier: 0 });
    this.setState({ description: false });
    this.setState({ pocketsFromEvent: [] });
    this.setState({ errors: [] });
    this.props.toggleModal();
  };

  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        onBackdropPress={this.props.toggleModal}
        onBackButtonPress={this.props.toggleModal}
      >
        <View style={stylesGather.modalContainer}>
          <View style={stylesGather.modalTitleContainer}>
            <Text style={stylesGather.modalTitle}>{strings.createPocket}</Text>
          </View>
          <View>
            <TextField
              placeholder={strings.identifierPlaceholderModal}
              keyboardType="numeric"
              maxLength={8}
              value={this.state.identifier ? this.state.identifier : ''}
              onChangeText={value => this.setState({ identifier: value })}
            />
            <TextField
              placeholder={strings.descriptionPlaceholderModal}
              maxLength={23}
              value={this.state.description ? this.state.description : ''}
              onChangeText={value => this.setState({ description: value })}
            />
            {this.state.inputError && <ErrorView errors={this.state.errors} />}
            <View style={stylesGather.modalButtonContainer}>
              <View style={{ paddingRight: 10 }}>
                <CustomButton
                  style={stylesGather.buttonModalConfirmExit}
                  textStyle={stylesGather.textButton}
                  title={strings.acceptModal}
                  onPress={this.closeModal}
                />
              </View>
              <View style={{ paddingLeft: 10 }}>
                <CustomButton
                  style={stylesGather.buttonModalConfirmExit}
                  textStyle={stylesGather.textButton}
                  title={strings.keepOnAdding}
                  onPress={this.acceptEdit}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

AddEventModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default AddEventModal;
