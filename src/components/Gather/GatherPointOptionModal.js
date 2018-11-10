import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';
import strings from '../../localization';
import CustomButton from '../common/CustomButton';
import plusSign from '../../assets/ic_common/ic_add.png';
import pencilIcon from '../../assets/ic_common/ic_editPencil.png';
import stylesGather from './styles';

const GatherPointOptionModal = ({
  isVisible, onPressActionFst, onPressActionSnd, onPressActionThrd,
}) => (
  <Modal
    isVisible={isVisible}
    onBackdropPress={onPressActionFst}
    onBackButtonPress={onPressActionFst}
    animationOut="slideOutLeft"
  >
    <View style={stylesGather.modalContainer}>
      <View style={stylesGather.modalTitleContainer}>
        <Text style={stylesGather.modalTitle}>{strings.optionsModalGather}</Text>
      </View>
      <View>
        <CustomButton
          style={stylesGather.buttonModal}
          textStyle={stylesGather.textButton}
          title={strings.changeStateIsle}
          onPress={onPressActionThrd}
          icon={pencilIcon}
        />
        <CustomButton
          style={stylesGather.buttonModal}
          textStyle={stylesGather.textButton}
          title={strings.newPocket}
          onPress={onPressActionSnd}
          icon={plusSign}
        />
      </View>
    </View>
  </Modal>
);

GatherPointOptionModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onPressActionFst: PropTypes.func.isRequired,
  onPressActionSnd: PropTypes.func.isRequired,
  onPressActionThrd: PropTypes.func.isRequired,
};

export default GatherPointOptionModal;
