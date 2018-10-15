import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { isPhone } from 'react-native-device-detection';
import PropTypes from 'prop-types';
import PhoneBale from '../Bale/PhoneBale';
import TabletBale from '../Bale/TabletBale';
import { fetchBales } from '../../actions/BalesActions';

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

  componentDidMount() {
    this.props.fetchData(this.props.token);
  }

  render() {
    const { baleList } = this.props.bales;
    console.log(baleList);
    return (
      <FlatList
        data={baleList}
        renderItem={({ item }) => {
          if (isPhone) {
            return <PhoneBale id={item.id} type={item.type} weight={item.weight} />;
          }
          return <TabletBale id={item.id} type={item.material} weight={item.weight} />;
        }}
      />
    );
  }
}

BaleList.propTypes = {
  fetchData: PropTypes.func.isRequired,
  token: PropTypes.string,
  bales: PropTypes.object,
};

BaleList.defaultProps = {
  token: false,
  bales: [],
};

const mapStateToProps = state => ({
  token: state.login.token,
  bales: state.bales.bales,
});

const mapDispatchToProps = dispatch => ({
  fetchData: token => dispatch(fetchBales(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BaleList);
