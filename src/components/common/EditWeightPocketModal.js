import React, { Component } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import strings from '../../localization';
import Colors from '../../helpers/Colors';
import {
  getPocket,
  getPocketWeight,
  getPocketState,
  getIsModalVisible,
  isLoading,
  getPocketSerialNumber,
} from '../../selectors/EditWeightPocketModalSelector';
import {
  addPocketWeight,
  editPocketWeight,
  actionTypes,
  closeEditWeightPocketModal,
  editPocketSerialNumber,
} from '../../actions/EditWeightPocketModalActions';
import ErrorView from '../common/ErrorView';
import { errorsSelector } from '../../selectors/ErrorSelector';
import Button from './Button';
import TextField from './TextField';
import recyclabeleMaterials from './Constants';
import styles from './styles';

class EditWeightPocketModal extends Component {
  constructor(props) {
    super(props);
    this.materials = recyclabeleMaterials;

    this.state = {
      weightS: false,
      serialNumberS: false,
      inputError: true,
      error: [],
    };
  }

  acceptEdit = () => {
    this.setState({ error: [] });
    if (this.state.weight > 0) {
      if (this.props.hasWeight) {
        this.props.editPocketWeight(
          this.props.token,
          this.props.pocket,
          this.state.weightS,
          this.state.serialNumberS,
        );
      } else {
        this.props.addPocketWeight(
          this.props.token,
          this.props.pocket,
          this.state.weightS,
          this.state.serialNumberS,
        );
      }
    } else {
      this.setState({ inputError: true, error: [strings.invalidInputNumber] });
    }
  };

  closeModal = () => {
    this.setState({ inputError: false, weightS: false, serialNumberS: false, error: [] });
    this.props.closeEditWeightModal();
  };

  render() {
    const {
      errors, hasWeight, weight, serialNumber,
    } = this.props;
    return (
      <Modal
        isVisible={this.props.isModalVisible}
        onBackButtonPress={this.closeModal}
        onBackdropPress={this.closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>
              {strings.editPocket}
            </Text>
          </View>
          <View style={styles.textFieldView}>
            <TextField
              placeholder={strings.weighPlaceholderModal}
              keyboardType="numeric"
              defaultValue={weight ? `${weight}` : null}
              maxLength={8}
              onChangeText={value => this.setState({ weightS: value })}
              onLayout={() =>
                (hasWeight
                  ? this.setState({ weightS: weight })
                  : this.setState({ weightS: false }))
              }
            />
          </View>
          <View style={styles.textFieldView}>
            <TextField
              placeholder={strings.identifierPlaceholderModal}
              keyboardType="numeric"
              defaultValue={serialNumber ? `${serialNumber}` : null}
              maxLength={8}
              onChangeText={value => this.setState({ serialNumberS: value })}
              onLayout={() =>
                (!this.state.serialNumber ? this.setState({ serialNumberS: serialNumber }) : null)
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

EditWeightPocketModal.propTypes = {
  addPocketWeight: PropTypes.func.isRequired,
  closeEditWeightModal: PropTypes.func.isRequired,
  editPocketWeight: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  hasWeight: PropTypes.string.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  pocket: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  serialNumber: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  errors: errorsSelector([actionTypes.EDIT_POCKET_WEIGHT])(state),
  hasWeight: getPocketState(state),
  isModalVisible: getIsModalVisible(state),
  pocket: getPocket(state),
  token: state.login.token,
  weight: getPocketWeight(state),
  isLoading: isLoading(state),
  serialNumber: getPocketSerialNumber(state),
});

const mapDispatchToProps = dispatch => ({
  addPocketWeight: (token, pocket, weight, serialNumber) => dispatch(addPocketWeight(token, pocket, weight, serialNumber)),
  closeEditWeightModal: () => dispatch(closeEditWeightPocketModal()),
  editPocketWeight: (token, pocket, weight, serialNumber) => dispatch(editPocketWeight(token, pocket, weight, serialNumber)),
  editPocketSerialNumber: (token, pocket, serialNumber) =>
    dispatch(editPocketSerialNumber(token, pocket, serialNumber)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditWeightPocketModal);
