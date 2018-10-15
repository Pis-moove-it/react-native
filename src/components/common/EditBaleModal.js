import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import strings from '../../localization';
import getIsModalVisible from '../../selectors/EditBaleModalSelector';
import { closeEditBaleModal } from '../../actions/EditBaleModalActions';
import ErrorView from '../common/ErrorView';
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
    errors: [],
  };

  getMaterials() {
    const pickerMaterial = [];
    pickerMaterial.push(
      <Picker.Item
        key={999}
        label={strings.selectMaterial}
        value={false}
      />,
    );
    this.materials.map((material) => {
      pickerMaterial.push(<Picker.Item
        key={material.id}
        label={material.name}
        value={material.name}
      />);
    });
    return pickerMaterial;
  }

  acceptEdit = () => {
    if (this.state.newWeight > 0) {
      if (this.state.selectedMaterial) {
        this.closeModal();
      } else {
        this.setState({ inputError: true });
        this.setState({ errors: [strings.invalidInputType] });
      }
    } else {
      this.setState({ inputError: true });
      this.setState({ errors: [strings.invalidInputNumber] });
    }
  }

  closeModal = () => {
    this.setState({ inputError: false });
    this.setState({ newWeight: 0 }); // will get deleted later
    this.setState({ selectedMaterial: false }); // will get deleted later
    this.setState({ errors: [] });
    this.props.closeEditModal();
  }

  render() {
    return (
      <Modal
        isVisible={this.props.isModalVisible}
        onBackButtonPress={this.closeModal}
        onBackdropPress={this.closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>
              {strings.editBale}
            </Text>
          </View>
          <View>
            <TextField
              placeholder={strings.weighPlaceholderModal}
              keyboardType="numeric"
              onChangeText={value =>
                (this.setState({ newWeight: value }))}
            />
            <Picker
              selectedValue={this.state.selectedMaterial}
              mode="dropdown"
              onValueChange={value =>
                (this.setState({ selectedMaterial: value }))}
            >
              {this.getMaterials()}
            </Picker>
            {this.state.inputError && <ErrorView errors={this.state.errors} />}
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
  isModalVisible: PropTypes.bool.isRequired,
  closeEditModal: PropTypes.func.isRequired,
};

EditBaleModal.defaultProps = {};

const mapStateToProps = state => ({
  isModalVisible: getIsModalVisible(state),
});

const mapDispatchToProps = dispatch => ({
  closeEditModal: () => dispatch(closeEditBaleModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditBaleModal);
