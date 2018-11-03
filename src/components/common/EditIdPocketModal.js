import React, { Component } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import strings from '../../localization';
import {
  getPocket,
  getIsModalVisible,
  isLoading,
  getPocketSerialNumber,
} from '../../selectors/EditIdPocketModalSelector';
import {
  editPocketSerialNumber,
  actionTypes,
  closeEditIdPocketModal,
} from '../../actions/EditIdPocketModalActions';
import { errorsSelector } from '../../selectors/ErrorSelector';
import Colors from '../../helpers/Colors';
import ErrorView from './ErrorView';
import Button from './Button';
import TextField from './TextField';
import recyclabeleMaterials from './Constants';
import styles from './styles';

class EditPocketModal extends Component {
  constructor(props) {
    super(props);
    this.materials = recyclabeleMaterials;

    this.state = {
      newIdentifier: false,
      inputError: true,
      error: [],
    };
  }

  acceptEdit = () => {
    this.setState({ error: [] });
    if (this.state.newIdentifier) {
      this.props.editPocketSerialNumber(
        this.props.token,
        this.props.pocket,
        this.state.newIdentifier,
      );
    } else {
      this.setState({ inputError: true, error: [strings.invalidInputNumber] });
    }
  };

  closeModal = () => {
    this.setState({ inputError: false, newIdentifier: false, error: [] });
    this.props.closeEditModal();
  };

  render() {
    const { errors, serialNumber } = this.props;
    return (
      <Modal
        isVisible={this.props.isModalVisible}
        onBackButtonPress={this.closeModal}
        onBackdropPress={this.closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>{strings.editPocket}</Text>
          </View>
          <View style={{ width: '50%' }}>
            <TextField
              placeholder={strings.identifierPlaceholderModal}
              keyboardType="numeric"
              defaultValue={serialNumber ? `${serialNumber}` : null}
              maxLength={8}
              onChangeText={value => this.setState({ newIdentifier: value })}
              onLayout={() =>
                (!this.state.newIdentifier ? this.setState({ newIdentifier: serialNumber }) : null)
              }
            />
          </View>
          <View>
            {this.state.inputError && <ErrorView errors={this.state.error} />}
            <ErrorView errors={errors} />
            {this.props.isLoading && errors.length < 1 ? (
              <View style={styles.activityIndicator}>
                <ActivityIndicator size="large" color={Colors.primary} />
              </View>
            ) : (
              <Button
                style={styles.buttonModal}
                textStyle={styles.text}
                title={strings.acceptModal}
                onPress={this.acceptEdit}
              />
            )}
          </View>
        </View>
      </Modal>
    );
  }
}

EditPocketModal.propTypes = {
  closeEditModal: PropTypes.func.isRequired,
  editPocketSerialNumber: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  pocket: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  serialNumber: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  errors: errorsSelector([actionTypes.EDIT_POCKET_SERIAL])(state),
  isModalVisible: getIsModalVisible(state),
  pocket: getPocket(state),
  token: state.login.token,
  isLoading: isLoading(state),
  serialNumber: getPocketSerialNumber(state),
});

const mapDispatchToProps = dispatch => ({
  closeEditModal: () => dispatch(closeEditIdPocketModal()),
  editPocketSerialNumber: (token, pocket, serialNumber) =>
    dispatch(editPocketSerialNumber(token, pocket, serialNumber)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditPocketModal);
