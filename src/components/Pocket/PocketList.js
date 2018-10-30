import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { isPhone } from 'react-native-device-detection';
import PropTypes from 'prop-types';
import { openEditPocketModal } from '../../actions/EditPocketModalActions';
import { openEditWeightPocketModal } from '../../actions/EditWeightPocketModalActions';
import EditPocketModal from '../common/EditPocketModal';
import EditWeightPocketModal from '../common/EditWeightPocketModal';
import PhonePocket from './PhonePocket';
import TabletPocket from './TabletPocket';

const weighList = [
  {
    id: '1548',
    time: '12:30',
    weight: '',
    pocketState: 'Unweighed',
  },
  {
    id: '684887',
    time: '16:19',
    weight: '10',
    pocketState: 'Weighed',
  },
  {
    id: '158',
    time: '03:22',
    weight: '6',
    pocketState: 'Weighed',
  },
  {
    id: '68488',
    time: '19:26',
    weight: '15',
    pocketState: 'Weighed',
  },
  {
    id: '488',
    time: '04:20',
    weight: '',
    pocketState: 'Unweighed',
  },
];

class PocketList extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  render() {
    return (
      <View>
        <EditPocketModal />
        <EditWeightPocketModal />
        <FlatList
          data={weighList}
          renderItem={({ item }) => {
            if (isPhone) {
              return (
                <PhonePocket
                  id={item.id}
                  time={item.time}
                  weight={item.weight}
                  pocketState={item.pocketState}
                  openEditModal={this.props.openEditPocketModal}
                  openEditWeightPocketModal={() => this.props.openEditWeightPocketModal(item.pocketState !== 'Unweighed')}
                />
              );
            }
            return (
              <TabletPocket
                id={item.id}
                time={item.time}
                weight={item.weight}
                pocketState={item.pocketState}
                openEditModal={this.props.openEditPocketModal}
                openEditWeightModal={() => this.props.openEditWeightPocketModal(item.pocketState !== 'Unweighed')}
              />
            );
          }}
        />
      </View>
    );
  }
}

PocketList.propTypes = {
  openEditPocketModal: PropTypes.func.isRequired,
  openEditWeightPocketModal: PropTypes.func.isRequired,
};

PocketList.defaultProps = {};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  openEditPocketModal: () => dispatch(openEditPocketModal()),
  openEditWeightPocketModal: hasWeight => dispatch(openEditWeightPocketModal(hasWeight)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PocketList);
