import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import strings from '../../localization';
import { getIsModalVisible, getBale } from '../../selectors/EditBaleModalSelector';
import { closeEditBaleModal, editBale, actionTypes } from '../../actions/EditBaleModalActions';
import ErrorView from '../common/ErrorView';
import { errorsSelector } from '../../selectors/ErrorSelector';
import Button from './Button';
import TextField from './TextField';
import recyclabeleMaterials from './Constants';
import styles from './styles';

class EditBaleModal extends Component {
  constructor(props) {
    super(props);
    this.materials = recyclabeleMaterials;
  }

  state = {
    selectedMaterial: false,
    newWeight: 0,
    inputError: true,
    error: [],
  };

  getMaterials() {
    const pickerMaterial = [];
    pickerMaterial.push(<Picker.Item key={999} label={strings.selectMaterial} value={false} />);
    this.materials.map((material) => {
      pickerMaterial.push(<Picker.Item key={material.id} label={material.name} value={material.value} />);
    });
    return pickerMaterial;
  }

  acceptEdit = () => {
    if (this.state.newWeight > 0) {
      if (this.state.selectedMaterial) {
        this.props.editBale(
          this.props.token,
          this.props.bale,
          this.state.newWeight,
          this.state.selectedMaterial,
        );
      } else {
        this.setState({ error: [strings.invalidInputType], inputError: true });
      }
    } else {
      this.setState({ error: [strings.invalidInputNumber], inputError: true });
    }
  };

  closeModal = () => {
    this.setState({
      inputError: false, newWeight: 0, selectedMaterial: false, error: [],
    });
    this.props.closeEditModal();
  };

  render() {
    const { errors } = this.props;
    return (
      <Modal
        isVisible={this.props.isModalVisible}
        onBackButtonPress={this.closeModal}
        onBackdropPress={this.closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>{strings.editBale}</Text>
          </View>
          <View>
            <TextField
              placeholder={strings.weighPlaceholderModal}
              keyboardType="numeric"
              maxLength={8}
              onChangeText={value => this.setState({ newWeight: value })}
            />
            <Picker
              selectedValue={this.state.selectedMaterial}
              mode="dropdown"
              onValueChange={value => this.setState({ selectedMaterial: value })}
            >
              {this.getMaterials()}
            </Picker>
            {this.state.inputError && <ErrorView errors={this.state.error} />}
            <ErrorView errors={errors} />
            <Button
              style={styles.buttonModal}
              textStyle={styles.text}
              title={strings.acceptModal}
              onPress={this.acceptEdit}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

EditBaleModal.propTypes = {
  bale: PropTypes.string,
  closeEditModal: PropTypes.func.isRequired,
  editBale: PropTypes.func.isRequired,
  errors: PropTypes.array,
  isModalVisible: PropTypes.bool,
  token: PropTypes.string,
};

EditBaleModal.defaultProps = {
  bale: false,
  errors: [],
  isModalVisible: false,
  token: false,
};

const mapStateToProps = state => ({
  bale: getBale(state),
  errors: errorsSelector([actionTypes.EDIT_BALE])(state),
  isModalVisible: getIsModalVisible(state),
  token: state.login.token,
});

const mapDispatchToProps = dispatch => ({
  closeEditModal: () => dispatch(closeEditBaleModal()),
  editBale: (token, bale, weight, material) => dispatch(editBale(token, bale, weight, material)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditBaleModal);
