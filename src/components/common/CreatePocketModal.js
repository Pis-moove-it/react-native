import React, { Component } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import getIsModalVisible from '../../selectors/CreatePocketModalSelector';
import {
  addPocketToCollection,
  closeCreatePocketModal,
  actionTypes,
} from '../../actions/CreatePocketModalActions';
import { isLoading } from '../../selectors/GatherSelector';
import strings from '../../localization';
import ErrorView from '../common/ErrorView';
<<<<<<< HEAD
import { errorsSelector } from '../../selectors/ErrorSelector';
import Colors from '../../helpers/Colors';
=======
>>>>>>> master
import Button from './Button';
import TextField from './TextField';
import recyclabeleMaterials from './Constants';
import styles from './styles';

class CreatePocketModal extends Component {
  constructor(props) {
    super(props);
    this.materials = recyclabeleMaterials;

    this.state = {
      identifier: 0,
      inputError: true,
      error: [],
    };
  }

  acceptEdit = () => {
    this.setState({ error: [] });
    if (this.state.identifier > 0) {
      this.props.addPocketToCollection(
        this.props.token,
        this.props.collectionId,
        this.props.containerIdSelected,
        this.state.identifier,
      );
    } else {
      this.setState({ error: [strings.invalidInputId], inputError: true });
    }
  };

  closeModal = () => {
    this.setState({ error: [], inputError: false, identifier: 0 });
    this.props.closeCreatePocketModal();
  };

  render() {
    const { errors } = this.props;
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
          <View style={styles.textFieldView}>
            <TextField
              placeholder={strings.identifierPlaceholderModal}
              keyboardType="numeric"
              maxLength={8}
              onChangeText={value => this.setState({ identifier: value })}
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

CreatePocketModal.propTypes = {
  closeCreatePocketModal: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  collectionId: PropTypes.string.isRequired,
  containerIdSelected: PropTypes.number.isRequired,
  addPocketToCollection: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errors: errorsSelector([actionTypes.ADD_POCKET])(state),
  isLoading: isLoading(state),
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
