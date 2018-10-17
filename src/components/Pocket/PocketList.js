import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { isPhone } from 'react-native-device-detection';
import PhoneBale from '../Bale/PhoneBale';
import TabletPocket from './TabletPocket';

const weighList = [
  {
    id: '1548',
    time: '12:30',
    weight: '',
    pocketState: 'Unweighed',
  },
  {
    id: '684887',
    time: '16:19',
    weight: '10',
    pocketState: 'Weighed',
  },
  {
    id: '158',
    time: '03:22',
    weight: '6',
    pocketState: 'Weighed',
  },
  {
    id: '68488',
    time: '19:26',
    weight: '15',
    pocketState: 'Weighed',
  },
  {
    id: '488',
    time: '04:20',
    weight: '',
    pocketState: 'Unweighed',
  },
];

class WeighList extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  render() {
    return (
      <FlatList
        data={weighList}
        renderItem={({ item }) => {
          if (isPhone) {
            return <PhoneBale id={item.id} type={item.type} weight={item.weight} />;
          }
          return (
            <TabletPocket
              id={item.id}
              time={item.time}
              weight={item.weight}
              pocketState={item.pocketState}
            />
          );
        }}
      />
    );
  }
}

WeighList.propTypes = {};

WeighList.defaultProps = {};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WeighList);