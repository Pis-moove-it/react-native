import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Colors from '../../helpers/Colors';
import strings from '../../localization/';
import Button from '../common/Button';
import ErrorView from '../common/ErrorView';
import { errorsSelector } from '../../selectors/ErrorSelector';
import { actionTypes } from '../../actions/GatherActions';
import { transformTime, transformDay, transformMonth } from '../../helpers/DateFormatter';
import stylesGather from './styles';

class ModalTester extends Component {
  state = {
    isModalVisible: true,
  };

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
    this.setState({ isModalVisible: false });
  };

  render() {
    const { errors } = this.props;
    return (
      <Modal isVisible={this.state.isModalVisible || !(!this.props.isLoading && errors.length < 1)}>
        <View style={stylesGather.container}>
          {this.state.currentDay == null ? (
            <View style={stylesGather.activityIndicator}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          ) : (
            <View style={stylesGather.container}>
              <Text style={stylesGather.overlayTimeText}>
                {`${this.state.currentHour}:${this.state.currentMinute}`}
              </Text>
              <Text style={stylesGather.overlayDayText}>
                {`${this.state.currentDayName}`}
                {`${this.state.currentDay}, `}
                {`${this.state.currentMonth}`}
                {`${this.state.currentYear}`}
              </Text>
              <ErrorView errors={errors} />
              <Button
                style={stylesGather.button}
                textStyle={stylesGather.text}
                title={strings.startTravel}
                onPress={this.toggleModal}
              />
            </View>
          )}
        </View>
      </Modal>
    );
  }
}

ModalTester.propTypes = {
  startCollection: PropTypes.func.isRequired,
  errors: PropTypes.array,
  isLoading: PropTypes.bool,
};

ModalTester.defaultProps = {
  errors: [],
  isLoading: false,
};

const mapStateToProps = state => ({
  isLoading: state.gather.isLoading,
  errors: errorsSelector([actionTypes.START_COLLECTION])(state),
});

export default connect(mapStateToProps)(ModalTester);
