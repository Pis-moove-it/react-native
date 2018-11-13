import React, { Component } from 'react';
import { ActivityIndicator, View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import getIsModalVisible, { isLoading } from '../../selectors/CreateBaleModalSelector';
import { closeCreateBaleModal, newBale, actionTypes } from '../../actions/CreateBaleModalActions';
import strings from '../../localization';
import ErrorView from '../common/ErrorView';
import { errorsSelector } from '../../selectors/ErrorSelector';
import getBales, { getNewBales } from '../../selectors/BalesSelector';
import Colors from '../../helpers/Colors';
import Button from './Button';
import TextField from './TextField';
import recyclabeleMaterials from './Constants';
import styles from './styles';

class CreateBaleModal extends Component {
  static getDerivedStateFromProps(props, state) {
    if (!props.isModalVisible) {
      return {
        state,
        selectedMaterial: false,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.materials = recyclabeleMaterials;

    this.state = {
      selectedMaterial: false,
      newWeight: false,
      inputError: true,
      error: [],
    };
  }

  getMaterials() {
    const pickerMaterial = [];
    pickerMaterial.push(<Picker.Item key={999} label={strings.selectMaterial} value={false} />);
    this.materials.map((material) => {
      pickerMaterial.push(<Picker.Item key={material.id} label={material.name} value={material.value} />);
    });
    return pickerMaterial;
  }

  acceptEdit = () => {
    this.setState({ error: [] });
    if (this.state.newWeight > 0) {
      if (this.state.selectedMaterial) {
        this.props.newBale(
          this.props.token,
          this.props.bales,
          this.state.newWeight,
          this.state.selectedMaterial,
          this.props.newBales + 1,
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
      error: [],
      inputError: false,
      newWeight: false,
      selectedMaterial: false,
    });
    this.props.closeCreateBaleModal();
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
            <Text style={styles.modalTitle}>{strings.createBale}</Text>
          </View>
          <View style={styles.textFieldView}>
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

CreateBaleModal.propTypes = {
  bales: PropTypes.array.isRequired,
  closeCreateBaleModal: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  newBale: PropTypes.func.isRequired,
  newBales: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  bales: getBales(state),
  errors: errorsSelector([actionTypes.CREATE_BALE])(state),
  isLoading: isLoading(state),
  isModalVisible: getIsModalVisible(state),
  newBales: getNewBales(state),
  token: state.login.token,
});

const mapDispatchToProps = dispatch => ({
  closeCreateBaleModal: () => dispatch(closeCreateBaleModal()),
  newBale: (token, bales, weight, material, newBales) =>
    dispatch(newBale(token, bales, weight, material, newBales)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateBaleModal);
