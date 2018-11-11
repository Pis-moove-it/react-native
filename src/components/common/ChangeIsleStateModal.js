import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { getIsModalVisible, getContainer } from '../../selectors/ChangeIsleStateModalSelector';
import { closeChangeIsleStateModal } from '../../actions/ChangeIsleStateModalActions';
import strings from '../../localization';
import { isleStates } from '../common/Constants';
import changeContainerStatus from './../../actions/ContainerStatusActions';
import ErrorView from './ErrorView';
import Button from './Button';
import styles from './styles';

class ChangeIsleStateModal extends Component {
  state = {
    selectedState: false,
    inputError: true,
    error: [],
  };

  getStates() {
    const pickerState = [];
    pickerState.push(<Picker.Item key={999} label={strings.selectState} value={false} />);
    this.isleStatesPicker.map((material) => {
      pickerState.push(<Picker.Item key={material.id} label={material.name} value={material.value} />);
    });
    return pickerState;
  }

  isleStatesPicker = isleStates;

  acceptEdit = () => {
    if (this.state.selectedState) {
      this.setState({ error: [strings.invalidInputState], inputError: true });
    } else {
      this.props.changeContainerStatus(
        this.props.token,
        this.props.container,
        this.state.selectedState,
      );
      this.closeModal();
    }
  };

  closeModal = () => {
    this.setState({ inputError: false });
    this.setState({ selectedState: false });
    this.setState({ error: [] });
    this.props.closeChangeIsleStateModal();
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
            <Text style={styles.modalTitle}>{strings.changeStateIsleTitle}</Text>
          </View>
          <View>
            <Picker
              selectedValue={this.state.selectedState}
              mode="dropdown"
              onValueChange={value => this.setState({ selectedState: value })}
            >
              {this.getStates()}
            </Picker>
            {this.state.inputError && <ErrorView errors={this.state.error} />}
            <ErrorView errors={this.state.error} />
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

ChangeIsleStateModal.propTypes = {
  closeChangeIsleStateModal: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  container: PropTypes.number.isRequired,
  changeContainerStatus: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isModalVisible: getIsModalVisible(state),
  token: state.login.token,
  container: getContainer(state),
});

const mapDispatchToProps = dispatch => ({
  closeChangeIsleStateModal: () => dispatch(closeChangeIsleStateModal()),
  changeContainerStatus: (token, container, status) =>
    dispatch(changeContainerStatus(token, container, status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangeIsleStateModal);
