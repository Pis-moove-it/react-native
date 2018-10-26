import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import strings from '../../localization';
import getIsModalVisible from '../../selectors/EditPocketModalSelector';
import { closeEditPocketModal } from '../../actions/EditPocketModalActions';
import ErrorView from '../common/ErrorView';
import Button from './Button';
import TextField from './TextField';
import recyclabeleMaterials from './Constants';
import styles from './styles';

class EditPocketModal extends Component {
  constructor(props) {
    super(props);
    this.materials = recyclabeleMaterials;
  }

  state = {
    selectedMaterial: false,
    newIdentifier: 0,
    inputError: true,
    errors: [],
  };

  acceptEdit = () => {
    if (this.state.newIdentifier > 0) {
      if (this.state.selectedMaterial) {
        this.props.editPocket(
          this.props.token,
          this.props.bale,
          this.state.newIdentifier,
          this.state.selectedMaterial,
        );
      } else {
        this.setState({ inputError: true });
        this.setState({ errors: [strings.invalidInputType] });
      }
    } else {
      this.setState({ inputError: true });
      this.setState({ errors: [strings.invalidInputNumber] });
    }
  };

  closeModal = () => {
    this.setState({ inputError: false });
    this.setState({ newIdentifier: 0 });
    this.setState({ selectedMaterial: false });
    this.setState({ errors: [] });
    this.props.closeEditModal();
  };

  render() {
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
          <View>
            <TextField
              placeholder={strings.identifierPlaceholderModal}
              keyboardType="numeric"
              onChangeText={value => this.setState({ newIdentifier: value })}
            />
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

EditPocketModal.propTypes = {
  bale: PropTypes.string,
  closeEditModal: PropTypes.func.isRequired,
  editPocket: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool,
  token: PropTypes.string,
};

EditPocketModal.defaultProps = {
  bale: false,
  token: false,
  isModalVisible: false,
};

const mapStateToProps = state => ({
  bale: getBale(state),
  isModalVisible: getIsModalVisible(state),
  token: state.login.token,
});

const mapDispatchToProps = dispatch => ({
  closeEditModal: () => dispatch(closeEditPocketModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditPocketModal);
