import React, { Component } from 'react';
import { FlatList, View, RefreshControl, ActivityIndicator } from 'react-native';
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
import strings from '../../localization';
import Colors from '../../helpers/Colors';

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

  materialString = (type) => {
    switch (type) {
      case 'Plastic':
        return strings.plastic;
      case 'Glass':
        return strings.glass;
      case 'Trash':
        return strings.trash;
      default:
        return strings.trash;
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <CreateBaleModal />
        <EditBaleModal />
        {!this.state.refreshing && this.props.bales.length !== this.props.balesQuantity ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <FlatList
            data={this.props.bales}
            renderItem={({ item }) => {
              if (isPhone) {
                return (
                  <PhoneBale
                    id={item.id}
                    type={this.materialString(item.material)}
                    weight={item.weight}
                    onPressAction={() => this.props.openEditBaleModal(item.id)}
                  />
                );
              }
              return (
                <TabletBale
                  id={item.id}
                  type={this.materialString(item.material)}
                  weight={item.weight}
                  onPressAction={() => this.props.openEditBaleModal(item.id)}
                />
              );
            }}
            refreshControl={
              <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
            }
          />
        )}
      </View>
    );
  }
}

BaleList.propTypes = {
  bales: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
  token: PropTypes.string,
  openEditBaleModal: PropTypes.func.isRequired,
  balesQuantity: PropTypes.number.isRequired,
};

BaleList.defaultProps = {
  token: false,
};

const mapStateToProps = state => ({
  bales: getBales(state),
  balesQuantity: state.bales.balesQuantity,
  token: state.login.token,
});

const mapDispatchToProps = dispatch => ({
  openEditBaleModal: identifier => dispatch(openEditBaleModal(identifier)),
  fetchData: token => dispatch(fetchBales(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BaleList);
