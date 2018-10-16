import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { isPhone } from 'react-native-device-detection';
import PropTypes from 'prop-types';
import PhoneBale from '../Bale/PhoneBale';
import TabletBale from '../Bale/TabletBale';
import { fetchBales } from '../../actions/BalesActions';

class BaleList extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  componentDidMount() {
    this.props.fetchData(this.props.token);
  }

  render() {
    return (
      <FlatList
        data={this.props.bales}
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
