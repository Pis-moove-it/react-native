import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import getIsModalVisible from '../../selectors/CreatePocketModalSelector';
import { closeCreatePocketModal } from '../../actions/CreatePocketModalActions';
import { addPocketToCollection } from '../../actions/GatherActions';
import strings from '../../localization';
import ErrorView from '../common/ErrorView';
import Colors from '../../helpers/Colors';
import Button from './Button';
import TextField from './TextField';
import recyclabeleMaterials from './Constants';
import styles from './styles';

class CreatePocketModal extends Component {
  constructor(props) {
    super(props);
    this.materials = recyclabeleMaterials;
  }

  state = {
    description: false,
    identifier: 0,
    inputError: true,
    errors: [],
  };

  getMaterials() {
    const pickerMaterial = [];
    pickerMaterial.push(<Picker.Item key={999} label={strings.selectMaterial} value={false} />);
    this.materials.map((material) => {
      pickerMaterial.push(<Picker.Item key={material.id} label={material.name} value={material.name} />);
    });
    return pickerMaterial;
  }

  acceptEdit = () => {
    if (this.state.identifier > 0) {
      this.props.addPocketToCollection(
        this.props.token,
        this.props.collectionId,
        this.props.containerIdSelected,
        this.state.identifier,
      );
      this.closeModal();
    } else {
      this.setState({ inputError: true });
      this.setState({ errors: [strings.invalidInputId] });
    }
  };

  closeModal = () => {
    this.setState({ inputError: false });
    this.setState({ identifier: 0 }); // will get deleted later
    this.setState({ description: false }); // will get deleted later
    this.setState({ errors: [] });
    this.props.closeCreatePocketModal();
  };

  render() {
    return (
      <Modal
        isVisible={this.props.isModalVisible}
        onBackButtonPress={this.closeModal}
        onBackdropPress={this.closeModal}
        animationIn="slideInRight"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>{strings.createPocket}</Text>
          </View>
          <View>
            <TextField
              placeholder={strings.identifierPlaceholderModal}
              keyboardType="numeric"
              maxLength={8}
              onChangeText={value => this.setState({ identifier: value })}
            />
            <TextField
              placeholder={strings.descriptionPlaceholderModal}
              maxLength={23}
              onChangeText={value => this.setState({ description: value })}
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

CreatePocketModal.propTypes = {
  closeCreatePocketModal: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  collectionId: PropTypes.string.isRequired,
  containerIdSelected: PropTypes.number.isRequired,
  addPocketToCollection: PropTypes.func.isRequired,
};

CreatePocketModal.defaultProps = {};

const mapStateToProps = state => ({
  isModalVisible: getIsModalVisible(state),
  token: state.login.token,
});

const mapDispatchToProps = dispatch => ({
  closeCreatePocketModal: () => dispatch(closeCreatePocketModal()),
  addPocketToCollection: (token, collectionId, containerIdSelected, pocketsId) =>
    dispatch(addPocketToCollection(token, collectionId, containerIdSelected, pocketsId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatePocketModal);
