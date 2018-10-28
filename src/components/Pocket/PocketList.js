import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { isPhone } from 'react-native-device-detection';
import PropTypes from 'prop-types';
import { getPockets } from '../../actions/PocketActions';
import pockets from '../../selectors/PocketSelector';
import PhonePocket from './PhonePocket';
import TabletPocket from './TabletPocket';

class PocketList extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  componentDidMount() {
    this.props.getPockets(this.props.token);
  }

  render() {
    return (
      <FlatList
        data={this.props.pockets}
        renderItem={({ item }) => {
          if (isPhone) {
            return (
              <PhonePocket
                id={item.id}
                time={item.time}
                weight={item.weight}
                pocketState={item.pocketState}
              />
            );
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

PocketList.propTypes = {
  getPockets: PropTypes.func.isRequired,
  pockets: PropTypes.array,
  token: PropTypes.string,
};

PocketList.defaultProps = {
  pockets: [],
  token: false,
};

const mapStateToProps = state => ({
  pockets: pockets(state),
  token: state.login.token,
});

const mapDispatchToProps = dispatch => ({
  getPockets: token => dispatch(getPockets(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PocketList);
