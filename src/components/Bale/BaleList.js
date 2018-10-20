import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
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
  }

  componentDidMount() {
    this.props.fetchData(this.props.token);
  }

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
                  onPressAction={() => this.props.openEditBaleModal(item.id)}
                />
              );
            }
            return (
              <TabletBale
                id={item.id}
                type={item.material}
                weight={item.weight}
                onPressAction={() => this.props.openEditBaleModal(item.id)}
              />
            );
          }}
        />
      </View>
    );
  }
}

BaleList.propTypes = {
  bales: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  token: PropTypes.string,
  openEditBaleModal: PropTypes.func.isRequired,
};

BaleList.defaultProps = {
  token: false,
};

const mapStateToProps = state => ({
  bales: getBales(state),
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
