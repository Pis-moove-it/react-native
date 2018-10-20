import React, { Component } from 'react';
import { FlatList, View, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { isPhone } from 'react-native-device-detection';
import PropTypes from 'prop-types';
import PhoneBale from '../Bale/PhoneBale';
import TabletBale from '../Bale/TabletBale';
import { fetchBales } from '../../actions/BalesActions';
import { openEditBaleModal } from '../../actions/EditBaleModalActions';
import CreateBaleModal from '../common/CreateBaleModal';
import EditBaleModal from '../common/EditBaleModal';
import recyclableMaterials from '../common/Constants';
import getBales from '../../selectors/BalesSelector';

class BaleList extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  constructor(props) {
    super(props);
    this.materials = recyclableMaterials;
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
        <CreateBaleModal />
        <EditBaleModal />
        <FlatList
          data={this.props.bales}
          renderItem={({ item }) => {
            if (isPhone) {
              return (
                <PhoneBale
                  id={item.id}
                  type={item.material}
                  weight={item.weight}
                  onPressAction={this.props.openEditBaleModal}
                />
              );
            }
            return (
              <TabletBale
                id={item.id}
                type={item.material}
                weight={item.weight}
                onPressAction={this.props.openEditBaleModal}
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

BaleList.propTypes = {
  fetchData: PropTypes.func.isRequired,
  token: PropTypes.string,
  openEditBaleModal: PropTypes.func.isRequired,
  bales: PropTypes.object.isRequired,
};

BaleList.defaultProps = {
  token: false,
};

const mapStateToProps = state => ({
  token: state.login.token,
  bales: getBales(state),
});

const mapDispatchToProps = dispatch => ({
  openEditBaleModal: () => dispatch(openEditBaleModal()),
  fetchData: token => dispatch(fetchBales(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BaleList);
