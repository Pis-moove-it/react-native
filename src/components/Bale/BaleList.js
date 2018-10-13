import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isPhone } from 'react-native-device-detection';
import PhoneBale from '../Bale/PhoneBale';
import TabletBale from '../Bale/TabletBale';
import TabletPocket from '../Pocket/TabletPocket';
import { fetchBales, actionTypes } from '../../actions/BalesActions';
import { errorsSelector } from '../../selectors/ErrorSelector';

const balesList = [
  {
    id: '15488',
    time: '20:08',
    weight: '23',
  },
  {
    id: '6848878',
    time: '09:08',
    weight: '10',
  },
  {
    id: '15488',
    time: '00:08',
    weight: '6',
  },
  {
    id: '6848878',
    time: '20:08',
    weight: '15',
  },
  {
    id: '15488',
    time: '20:08',
    weight: '2',
  },
];

class BaleList extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <FlatList
        data={balesList} // {this.props.dataFetch}
        renderItem={({ item }) => {
          if (isPhone) {
            return <TabletPocket id={item.id} time={item.id} weight={item.id} />;
          }
          return <TabletPocket id="id1" time="20:30" weight="24" />;
        }}
      />
    );
  }
}

BaleList.propTypes = {
  // dataFetch: PropTypes.array.isRequired,
  // errors: PropTypes.array,
  fetchData: PropTypes.func.isRequired,
};

BaleList.defaultProps = {};

const mapStateToProps = state => ({
  dataFetch: state.bales.bales,
  errors: errorsSelector([actionTypes.BALES_REQUEST])(state),
  isLoading: state.user.isLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchBales()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BaleList);
