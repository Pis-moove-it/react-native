import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { isPhone } from 'react-native-device-detection';
import PhoneBale from '../Bale/PhoneBale';
import TabletBale from '../Bale/TabletBale';

const balesList = [
  {
    id: '15488',
    type: 'Vidrio',
    weight: '23',
    status: 'Unweighed',
  },
  {
    id: '6848878',
    type: 'Plástico',
    weight: '10',
    status: 'Unweighed',
  },
  {
    id: '15488',
    type: 'Papel',
    weight: '6',
    status: 'Unweighed',
  },
  {
    id: '6848878',
    type: 'Vidrio',
    weight: '15',
  },
  {
    id: '15488',
    type: 'Papel',
    weight: '2',
  },
];

class BaleList extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  render() {
    return (
      <FlatList
        data={balesList}
        renderItem={({ item }) => {
          if (isPhone) {
            return <PhoneBale id={item.id} />;
          }
          return <TabletBale id={item.id} type={item.type} weight={item.weight} />;
        }}
      />
    );
  }
}

BaleList.propTypes = {};

BaleList.defaultProps = {};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BaleList);
