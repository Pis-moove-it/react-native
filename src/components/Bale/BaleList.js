import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { isPhone } from 'react-native-device-detection';
import PropTypes from 'prop-types';
import { openEditBaleModal } from '../../actions/EditBaleModalActions';
import PhoneBale from '../Bale/PhoneBale';
import TabletBale from '../Bale/TabletBale';
import CreateBaleModal from '../common/CreateBaleModal';
import EditBaleModal from '../common/EditBaleModal';
import recyclabeleMaterials from '../common/Constants';

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

  constructor(props) {
    super(props);
    this.materials = recyclabeleMaterials;
  }

  render() {
    return (
      <View>
        <CreateBaleModal />
        <EditBaleModal />
        <FlatList
          data={balesList}
          renderItem={({ item }) => {
            if (isPhone) {
              return <PhoneBale id={item.id} onPressAction={this.props.openEditBaleModal} />;
            }
            return (
              <TabletBale
                id={item.id}
                type={item.type}
                weight={item.weight}
                onPressAction={this.props.openEditBaleModal}
              />
            );
          }}
        />
      </View>
    );
  }
}

BaleList.propTypes = {
  openEditBaleModal: PropTypes.func.isRequired,
};

BaleList.defaultProps = {};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  openEditBaleModal: () => dispatch(openEditBaleModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BaleList);
