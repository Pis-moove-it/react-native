import React, { Component } from 'react';
import { ActivityIndicator, View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import Colors from '../../helpers/Colors';
import {
  getIsModalVisible,
  getContainer,
  isLoading,
} from '../../selectors/ChangeContainerStatusSelector';
import strings from '../../localization';
import {
  changeContainerStatus,
  closeChangeContainerStatusModal,
  actionTypes,
} from '../../actions/ContainerStatusActions';
import { errorsSelector } from '../../selectors/ErrorSelector';
import { possibleContainerStatus } from './Constants';
import ErrorView from './ErrorView';
import Button from './Button';
import styles from './styles';

class ChangeContainerStatusModal extends Component {
  state = {
    selectedStatus: false,
    inputError: true,
    error: [],
  };

  getStatus() {
    const pickerStatus = [];
    pickerStatus.push(<Picker.Item key={999} label={strings.selectStatus} value={false} />);
    this.containerStatusPicker.map((material) => {
      pickerStatus.push(<Picker.Item key={material.id} label={material.name} value={material.value} />);
    });
    return pickerStatus;
  }

  containerStatusPicker = possibleContainerStatus;

  acceptEdit = () => {
    this.setState({ error: [] });
    if (this.state.selectedStatus) {
      this.props.changeContainerStatus(
        this.props.token,
        this.props.container,
        this.state.selectedStatus,
      );
    } else {
      this.setState({ error: [strings.invalidInputStatus], inputError: true });
    }
  };

  closeModal = () => {
    this.setState({ error: [], inputError: false, selectedStatus: false });
    this.props.closeChangeContainerStatusModal();
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
            <Text style={styles.modalTitle}>{strings.changeContainerStatusTitle}</Text>
          </View>
          <View style={styles.textFieldView}>
            <Picker
              selectedValue={this.state.selectedStatus}
              mode="dropdown"
              onValueChange={value => this.setState({ selectedStatus: value })}
            >
              {this.getStatus()}
            </Picker>
          </View>
          <View>
            <View style={styles.error}>
              {this.state.inputError && <ErrorView errors={this.state.error} />}
              <ErrorView errors={errors} />
            </View>
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

ChangeContainerStatusModal.propTypes = {
  closeChangeContainerStatusModal: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  container: PropTypes.number.isRequired,
  changeContainerStatus: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  container: getContainer(state),
  errors: errorsSelector([actionTypes.CHANGE_CONTAINER_STATUS])(state),
  isLoading: isLoading(state),
  isModalVisible: getIsModalVisible(state),
  token: state.login.token,
});

const mapDispatchToProps = dispatch => ({
  closeChangeContainerStatusModal: () => dispatch(closeChangeContainerStatusModal()),
  changeContainerStatus: (token, container, status) =>
    dispatch(changeContainerStatus(token, container, status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangeContainerStatusModal);
