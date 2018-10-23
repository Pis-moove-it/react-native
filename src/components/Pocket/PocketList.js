import React, { Component } from 'react';
import { FlatList, RefreshControl, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { isPhone } from 'react-native-device-detection';
import PropTypes from 'prop-types';
import { fetchPockets } from '../../actions/PocketsActions';
import getPockets from '../../selectors/PocketsSelector';
import TabletPocket from './TabletPocket';
import PhonePocket from './PhonePocket';

class PocketList extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {
    this.props.fetchData(this.props.token);
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.fetchData(this.props.token).then(() => {
      this.setState({ refreshing: false });
    });
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.props.pockets}
          renderItem={({ item }) => {
            if (isPhone) {
              return (
                <PhonePocket
                  id={item.serial_number}
                  time={item.time}
                  weight={item.weight}
                  pocketState={item.state}
                />
              );
            }
            return (
              <TabletPocket
                id={item.serial_number}
                time={item.time}
                weight={item.weight}
                pocketState={item.state}
              />
            );
          }}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
          }
        />
      </View>
    );
  }
}

PocketList.propTypes = {
  pockets: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  token: PropTypes.string,
};

PocketList.defaultProps = {
  token: false,
};

const mapStateToProps = state => ({
  pockets: getPockets(state),
  token: state.login.token,
});

const mapDispatchToProps = dispatch => ({
  fetchData: token => dispatch(fetchPockets(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PocketList);
