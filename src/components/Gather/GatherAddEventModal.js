import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import Modal from 'react-native-modal';
import TextField from '../common/TextField';
import { createExtraEvent, addEventPoint } from '../../actions/GatherActions';
import { selectEventCoordinates, selecteventId } from '../../selectors/GatherSelector';
import strings from '../../localization';
import CustomButton from '../common/CustomButton';
import ErrorView from '../common/ErrorView';
import Button from '../common/Button';
import eventContainerImage from '../../assets/images/MapPointIconBlue.png';
import stylesGather from './styles';

class AddEventModal extends Component {
  state = {
    pocketsFromEvent: [],
    errors: [],
    identifier: false,
    description: false,
    descriptionSubmitted: false,
  };

  acceptEdit = () => {
    if (this.state.identifier > 0) {
      this.setState(prevState => ({
        pocketsFromEvent: [...prevState.pocketsFromEvent, { serial_number: this.state.identifier }],
        identifier: 0,
      }));
    } else {
      this.setState({ inputError: true });
      this.setState({ errors: [strings.invalidInputId] });
    }
  };

  closeModal = () => {
    this.props.createExtraEvent(
      this.props.token,
      this.props.collectionId,
      this.state.description,
      this.state.pocketsFromEvent,
      this.props.eventCoordinates,
    );

    // connect to backend
    // resets state so further calls wont interfere with next ones
    this.setState({ inputError: false });
    this.setState({ identifier: 0 });
    this.setState({ description: false });
    this.setState({ pocketsFromEvent: [] });
    this.setState({ errors: [] });
    this.setState({ descriptionSubmitted: false });
    this.props.toggleModal();
  };

  acceptAndClose = () => {
    this.acceptEdit();
    this.closeModal();
  };

  renderModal = (description) => {
    if (description) {
      return (
        <View>
          <TextField
            placeholder={strings.identifierPlaceholderModal}
            keyboardType="numeric"
            maxLength={8}
            value={this.state.identifier ? this.state.identifier : ''}
            onChangeText={value => this.setState({ identifier: value })}
          />
          <View style={stylesGather.modalButtonContainer}>
            <View>
              <CustomButton
                style={stylesGather.buttonModalConfirmExit}
                textStyle={stylesGather.textButton}
                title={strings.acceptModal}
                onPress={this.acceptAndClose}
              />
            </View>
          </View>
        </View>
      );
    }
    return (
      <View>
        <TextField
          placeholder={strings.descriptionPlaceholderModal}
          maxLength={23}
          onChangeText={value => this.setState({ description: value })}
        />
        <Button
          style={stylesGather.buttonModal}
          textStyle={stylesGather.textButtonWhite}
          title={strings.acceptModal}
          onPress={() => {
            this.setState({ descriptionSubmitted: true });
          }}
        />
      </View>
    );
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
            {this.state.descriptionSubmitted ? (
              <Text style={stylesGather.modalTitle}>{strings.createPocket}</Text>
            ) : (
              <Text style={stylesGather.modalTitle}>{strings.descriptionEvent}</Text>
            )}
          </View>
          <View>
            {this.renderModal(this.state.descriptionSubmitted)}
            {this.state.inputError && this.state.descriptionSubmitted && (
              <ErrorView errors={this.state.errors} />
            )}
          </View>
        </View>
      </Modal>
    );
  }
}

AddEventModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  createExtraEvent: PropTypes.func.isRequired,
  eventCoordinates: PropTypes.array.isRequired,
  collectionId: PropTypes.string.isRequired,
  addEventPoint: PropTypes.func.isRequired,
  eventId: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  token: state.login.token,
  eventCoordinates: selectEventCoordinates(state),
  eventId: selecteventId(state),
});

const mapDispatchToProps = dispatch => ({
  createExtraEvent: (token, routeId, description, pocket, coordinates) =>
    dispatch(createExtraEvent(token, routeId, description, pocket, coordinates)),
  addEventPoint: eventPoint => dispatch(addEventPoint(eventPoint)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddEventModal);
