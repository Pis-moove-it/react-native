import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import getIsModalVisible from '../../selectors/CreateBaleModalSelector';
import { closeCreateBaleModal } from '../../actions/CreateBaleModalActions';
import strings from '../../localization';
import Button from './Button';
import TextField from './TextField';
import recyclabeleMaterials from './Constants';
import styles from './styles';

class CreateBaleModal extends Component {
  constructor(props) {
    super(props);
    this.materials = recyclabeleMaterials;
  }

  state = {
    selectedMaterial: null,
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

  render() {
    return (
      <Modal
        isVisible={this.props.isModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>
              {strings.createBale}
            </Text>
          </View>
          <View>
            <TextField
              placeholder={strings.editBalePlaceholder}
              keyboardType="numeric"
            />
            <Picker
              selectedValue={this.state.selectedMaterial}
              mode="dropdown"
              onValueChange={value =>
                (this.setState({ selectedMaterial: value }))}
            >
              {this.getMaterials()}
            </Picker>
            <Button
              style={styles.buttonModal}
              textStyle={styles.text}
              title={strings.acceptModal}
              onPress={this.props.closeCreateBaleModal}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

CreateBaleModal.propTypes = {
  closeCreateBaleModal: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
};

CreateBaleModal.defaultProps = {};

const mapStateToProps = state => ({
  isModalVisible: getIsModalVisible(state),
});

const mapDispatchToProps = dispatch => ({
  closeCreateBaleModal: () => dispatch(closeCreateBaleModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateBaleModal);
