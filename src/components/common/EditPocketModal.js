import React, { Component } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import strings from '../../localization';
import Colors from '../../helpers/Colors';
import { pockets } from '../../selectors/PocketSelector';
import {
  getPocket,
  getWeight,
  hasWeight as getHasWeight,
  isOpen,
  isLoading,
  getSerialNumber,
} from '../../selectors/EditPocketModalSelector';
import {
  editPocket,
  actionTypes,
  closeEditPocketModal,
} from '../../actions/EditPocketModalActions';
import ErrorView from '../common/ErrorView';
import { errorsSelector } from '../../selectors/ErrorSelector';
import Button from './Button';
import TextField from './TextField';
import recyclabeleMaterials from './Constants';
import styles from './styles';

class EditPocketModal extends Component {
  constructor(props) {
    super(props);
    this.materials = recyclabeleMaterials;

    this.state = {
      weight: false,
      serialNumber: false,
      inputError: true,
      error: [],
    };
  }

  acceptEdit = () => {
    this.setState({ error: [] });
    if (this.state.weight > 0 && this.state.serialNumber > 0) {
      this.props.editPocket(
        this.props.token,
        this.props.pocket,
        this.state.serialNumber,
        this.state.weight,
        this.props.hasWeight,
        this.props.pockets,
      );
    } else {
      this.setState({ inputError: true, error: [strings.invalidInputNumber] });
    }
  };

  closeModal = () => {
    this.setState({
      inputError: false,
      weight: false,
      serialNumber: false,
      error: [],
    });
    this.props.closeEditPocketModal();
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
            <Text style={styles.modalTitle}>{strings.editPocket}</Text>
          </View>
          <View style={styles.textFieldView}>
            <Text>{strings.identifierPlaceholderModal}</Text>
            <TextField
              placeholder={strings.identifierPlaceholderModal}
              keyboardType="numeric"
              defaultValue={serialNumber ? `${serialNumber}` : null}
              maxLength={8}
              onChangeText={value => this.setState({ serialNumber: value })}
              onLayout={() => this.setState({ serialNumber })}
            />
          </View>
          <View style={styles.textFieldView}>
            {weight ? <Text>{strings.weighPlaceholderModal}</Text> : null}
            <TextField
              placeholder={strings.weighPlaceholderModal}
              keyboardType="numeric"
              defaultValue={weight ? `${weight}` : null}
              maxLength={8}
              onChangeText={value => this.setState({ weight: value })}
              onLayout={() =>
                (hasWeight ? this.setState({ weight }) : this.setState({ weight: false }))
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
  closeEditPocketModal: PropTypes.func.isRequired,
  editPocket: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  hasWeight: PropTypes.string.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  pocket: PropTypes.string.isRequired,
  pockets: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  serialNumber: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  errors: errorsSelector([actionTypes.EDIT_POCKET])(state),
  hasWeight: getHasWeight(state),
  isModalVisible: isOpen(state),
  pocket: getPocket(state),
  pockets: pockets(state),
  token: state.login.token,
  weight: getWeight(state),
  isLoading: isLoading(state),
  serialNumber: getSerialNumber(state),
});

const mapDispatchToProps = dispatch => ({
  closeEditPocketModal: () => dispatch(closeEditPocketModal()),
  editPocket: (token, pocket, serialNumber, weight, isWeight, pocketsArray) =>
    dispatch(editPocket(token, pocket, serialNumber, weight, isWeight, pocketsArray)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditPocketModal);
