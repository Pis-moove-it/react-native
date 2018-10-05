import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../../helpers/Colors';
import strings from '../../localization/';
import Button from '../common/Button';
import stylesGather from './styles';

const transformTime = (min) => {
  if ((min / 10) >= 1) {
    return (min.toLocaleString());
  }
  return (`0${min}`);
};

const transformDay = (day) => {
  switch (day) {
    case 0:
      return (strings.day0);
    case 1:
      return (strings.day1);
    case 2:
      return (strings.day2);
    case 3:
      return (strings.day3);
    case 4:
      return (strings.day4);
    case 5:
      return (strings.day5);
    case 6:
      return (strings.day6);
    default:
      return ('error parsing day');
  }
};

const transformMonth = (month) => {
  switch (month) {
    case 0:
      return (strings.month0);
    case 1:
      return (strings.month1);
    case 2:
      return (strings.month2);
    case 3:
      return (strings.month3);
    case 4:
      return (strings.month4);
    case 5:
      return (strings.month5);
    case 6:
      return (strings.month6);
    case 7:
      return (strings.month7);
    case 8:
      return (strings.month8);
    case 9:
      return (strings.month9);
    case 10:
      return (strings.month10);
    case 11:
      return (strings.month11);
    default:
      return ('error parsing month');
  }
};

export default class ModalTester extends Component {
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


  toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    return (
      <Modal isVisible={this.state.isModalVisible}>
        <View style={stylesGather.container}>
          {this.state.currentDay == null ?
            <View style={stylesGather.activityIndicator}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          :
            <View style={stylesGather.container}>
              <Text style={stylesGather.overlayTimeText}>
                {`${this.state.currentHour}:${this.state.currentMinute}`}
              </Text>
              <Text style={stylesGather.overlayDayText}>
                {`${this.state.currentDayName} `}
                {`${this.state.currentDay}, `}
                {`${this.state.currentMonth} `}
                {`${this.state.currentYear}`}
              </Text>
              <Button
                style={stylesGather.button}
                textStyle={stylesGather.text}
                title={strings.startTravel}
                onPress={this.toggleModal}
              />
            </View>
          }
        </View>
      </Modal>
    );
  }
}
