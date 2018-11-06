import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';
import strings from '../../localization';
import CustomButton from '../common/CustomButton';
import stylesGather from './styles';

const GatherConfirmExitTripStartedModal = ({ isVisible, onPressActionFst, onPressActionSnd }) => (
  <Modal
    isVisible={isVisible}
    onBackdropPress={onPressActionFst}
    onBackButtonPress={onPressActionFst}
  >
    <View style={stylesGather.modalContainer}>
      <View style={stylesGather.modalTitleContainer}>
        <Text style={stylesGather.modalTitle}>{strings.confirmExitTripStartedTitle}</Text>
        <Text style={stylesGather.modalSubitle}>{strings.confirmExitTripStartedSubtitle}</Text>
      </View>
      <View style={stylesGather.modalButtonContainer}>
        <View style={{ paddingRight: 10 }}>
          <CustomButton
            style={stylesGather.buttonModalConfirmExit}
            textStyle={stylesGather.textButton}
            title={strings.acceptModal}
            onPress={onPressActionSnd}
          />
        </View>
        <View style={{ paddingLeft: 10 }}>
          <CustomButton
            style={stylesGather.buttonModalConfirmExit}
            textStyle={stylesGather.textButton}
            title={strings.cancelModal}
            onPress={onPressActionFst}
          />
        </View>
      </View>
    </View>
  </Modal>
);

GatherConfirmExitTripStartedModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onPressActionFst: PropTypes.func.isRequired,
  onPressActionSnd: PropTypes.func.isRequired,
};

export default GatherConfirmExitTripStartedModal;
