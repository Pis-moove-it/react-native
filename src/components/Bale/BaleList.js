import React, { Component } from 'react';
import { ActivityIndicator, FlatList, View, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { isPhone } from 'react-native-device-detection';
import PropTypes from 'prop-types';
import PhoneBale from '../Bale/PhoneBale';
import TabletBale from '../Bale/TabletBale';
import { fetchBales, actionTypes } from '../../actions/BalesActions';
import { errorsSelector } from '../../selectors/ErrorSelector';
import ErrorView from '../common/ErrorView';
import { openEditBaleModal } from '../../actions/EditBaleModalActions';
import CreateBaleModal from '../common/CreateBaleModal';
import EditBaleModal from '../common/EditBaleModal';
import recyclableMaterials from '../common/Constants';
import getBales, { isEnd, getNewBales } from '../../selectors/BalesSelector';
import strings from '../../localization';
import Colors from '../../helpers/Colors';
import styles from './styles';

class BaleList extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  constructor(props) {
    super(props);
    this.materials = recyclableMaterials;
    this.state = {
      refreshing: false,
      nextPage: 2,
      pagination: false,
    };
  }

  componentDidMount = () => {
    this.setState({ refreshing: true });
    this.props.fetchData(this.props.token, [], 1, this.props.newBales).then(() => {
      this.setState({ refreshing: false, nextPage: 2 });
    });
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.fetchData(this.props.token, [], 1, this.props.newBales).then(() => {
      this.setState({ refreshing: false, nextPage: 2 });
    });
  };

  onEnd = () => {
    this.setState({ pagination: true });
    this.props
      .fetchData(this.props.token, this.props.bales, this.state.nextPage, this.props.newBales)
      .then(() => {
        this.setState({
          pagination: false,
          nextPage: this.state.nextPage + 1,
        });
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
    const { errors } = this.props;
    return (
      <View style={[styles.containerL]}>
        <CreateBaleModal />
        <EditBaleModal />
        <ErrorView errors={errors} />
        {this.state.refreshing && this.props.bales.length ? (
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
                    onPressAction={() =>
                      this.props.openEditBaleModal(item.id, item.material, item.weight)
                    }
                  />
                );
              }
              return (
                <TabletBale
                  id={item.id}
                  type={this.materialString(item.material)}
                  weight={item.weight}
                  onPressAction={() =>
                    this.props.openEditBaleModal(item.id, item.material, item.weight)
                  }
                />
              );
            }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
                colors={[Colors.primary]}
              />
            }
            onEndReachedThreshold={0.05}
            onEndReached={!this.props.isEnd ? this.onEnd : null}
          />
        )}
        {this.state.pagination ? <ActivityIndicator style={styles.activity} size="large" /> : null}
      </View>
    );
  }
}

BaleList.propTypes = {
  bales: PropTypes.array.isRequired,
  errors: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
  isEnd: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  openEditBaleModal: PropTypes.func.isRequired,
  newBales: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  bales: getBales(state),
  errors: errorsSelector([actionTypes.BALES])(state),
  isEnd: isEnd(state),
  newBales: getNewBales(state),
  token: state.login.token,
});

const mapDispatchToProps = dispatch => ({
  openEditBaleModal: (identifier, material, weight) =>
    dispatch(openEditBaleModal(identifier, material, weight)),
  fetchData: (token, balesArray, nextPage, newBales) =>
    dispatch(fetchBales(token, balesArray, nextPage, newBales)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BaleList);
