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
  getPocketWeight,
  getPocketState,
  getIsModalVisible,
  isLoading,
} from '../../selectors/EditWeightPocketModalSelector';
import {
  addPocketWeight,
  editPocketWeight,
  actionTypes,
  closeEditWeightPocketModal,
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
      newIdentifier: false,
      inputError: true,
      error: [],
    };
  }

  acceptEdit = () => {
    this.setState({ error: [] });
    if (this.state.newIdentifier > 0) {
      if (this.props.hasWeight) {
        this.props.editPocketWeight(
          this.props.token,
          this.props.pocket,
          this.state.newIdentifier,
          this.props.pockets,
        );
      } else {
        this.props.addPocketWeight(
          this.props.token,
          this.props.pocket,
          this.state.newIdentifier,
          this.props.pockets,
        );
      }
    } else {
      this.setState({ inputError: true, error: [strings.invalidInputNumber] });
    }
  };

  closeModal = () => {
    this.setState({ inputError: false, newIdentifier: false, error: [] });
    this.props.closeEditWeightModal();
  };

  render() {
    const { errors, hasWeight, weight } = this.props;
    return (
      <Modal
        isVisible={this.props.isModalVisible}
        onBackButtonPress={this.closeModal}
        onBackdropPress={this.closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>
              {this.props.hasWeight ? strings.editWeightPocket : strings.addWeightPocket}
            </Text>
          </View>
          <View style={styles.textFieldView}>
            <TextField
              placeholder={strings.weighPlaceholderModal}
              keyboardType="numeric"
              defaultValue={weight ? `${weight}` : null}
              maxLength={8}
              onChangeText={value => this.setState({ newIdentifier: value })}
              onLayout={() =>
                (hasWeight
                  ? this.setState({ newIdentifier: weight })
                  : this.setState({ newIdentifier: false }))
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
  pockets: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  errors: errorsSelector([actionTypes.EDIT_POCKET_WEIGHT])(state),
  hasWeight: getPocketState(state),
  isModalVisible: getIsModalVisible(state),
  pocket: getPocket(state),
  pockets: pockets(state),
  token: state.login.token,
  weight: getPocketWeight(state),
  isLoading: isLoading(state),
});

const mapDispatchToProps = dispatch => ({
  addPocketWeight: (token, pocket, weight, pocketsArray) =>
    dispatch(addPocketWeight(token, pocket, weight, pocketsArray)),
  closeEditWeightModal: () => dispatch(closeEditWeightPocketModal()),
  editPocketWeight: (token, pocket, weight, pocketsArray) =>
    dispatch(editPocketWeight(token, pocket, weight, pocketsArray)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditWeightPocketModal);
