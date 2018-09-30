import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { List } from 'react-native-elements';
import Platform from '../../helpers/Platform';
import PhoneBale from '../Bale/PhoneBale';
import TabletBale from '../Bale/TabletBale';

const balesList = [
  {
    id: '15488',
    type: 'Vidrio',
    weight: '23',
  },
  {
    id: '6848878',
    type: 'Plástico',
    weight: '10',
  },
  {
    id: '15488',
    type: 'Papel',
    weight: '6',
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

  constructor() {
    super();

    this.state = {
      deviceType: Platform.isTablet() ? 'tablet' : 'phone',
    };
  }

  render() {
    return (
      <List containerStyle={{ marginBottom: 0 }}>
        <FlatList
          data={balesList}
          renderItem={({ item }) => {
            if (this.state.deviceType === 'phone') {
              return <PhoneBale id={item.id} />;
            }
            return <TabletBale id={item.id} type={item.type} weight={item.weight} />;
          }}
        />
      </List>
    );
  }
}

BaleList.propTypes = {};

BaleList.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BaleList);
