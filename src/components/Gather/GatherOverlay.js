import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isTablet } from 'react-native-device-detection';
import Colors from '../../helpers/Colors';
import strings from '../../localization/';
import Button from '../common/Button';
import ErrorView from '../common/ErrorView';
import { errorsSelector } from '../../selectors/ErrorSelector';
import { actionTypes } from '../../actions/GatherActions';
import { isOverlayLoading, isOverlayVisible } from '../../selectors/GatherSelector';
import { transformTime, transformDay, transformMonth } from '../../helpers/DateFormatter';
import stylesGather from './styles';

class ModalTester extends Component {
  state = {};

  componentDidMount() {
    setInterval(() => {
      this.setState({
        currentYear: new Date().getFullYear().toLocaleString(),
        currentMonth: transformMonth(new Date().getMonth()),
        currentDay: new Date().getDate().toLocaleString(),
        currentDayName: transformDay(new Date().getDay()),
        currentHour: transformTime(new Date().getHours()),
        currentMinute: transformTime(new Date().getMinutes()),
      });
    }, 1000);
  }

  toggleModal = () => {
    this.props.startCollection();
  };

  render() {
    const { errors } = this.props;
    return (
      <Modal isVisible={this.props.isOverlayVisible}>
        <View style={stylesGather.container}>
          {this.state.currentDay == null ? (
            <View style={stylesGather.activityIndicator}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          ) : (
            <View style={stylesGather.container}>
              <Text
                style={isTablet ? stylesGather.overlayTimeTextTablet : stylesGather.overlayTimeText}
              >
                {`${this.state.currentHour}:${this.state.currentMinute}`}
              </Text>
              <Text
                style={isTablet ? stylesGather.overlayDayTextTablet : stylesGather.overlayDayText}
              >
                {`${this.state.currentDayName}`}
                {`${this.state.currentDay}, `}
                {`${this.state.currentMonth}`}
                {`${this.state.currentYear}`}
              </Text>
              <ErrorView errors={errors} />
              {this.props.isOverlayLoading && errors.length < 1 ? (
                <View style={stylesGather.activityIndicator}>
                  <ActivityIndicator size="large" color={Colors.primary} />
                </View>
              ) : (
                <Button
                  style={isTablet ? stylesGather.buttonTablet : stylesGather.button}
                  textStyle={isTablet ? stylesGather.textButtonTablet : stylesGather.text}
                  title={strings.startTravel}
                  onPress={this.toggleModal}
                />
              )}
            </View>
          )}
        </View>
      </Modal>
    );
  }
}

ModalTester.propTypes = {
  errors: PropTypes.array.isRequired,
  isOverlayLoading: PropTypes.bool.isRequired,
  isOverlayVisible: PropTypes.bool.isRequired,
  startCollection: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isOverlayLoading: isOverlayLoading(state),
  isOverlayVisible: isOverlayVisible(state),
  errors: errorsSelector([actionTypes.START_COLLECTION])(state),
});

export default connect(mapStateToProps)(ModalTester);
