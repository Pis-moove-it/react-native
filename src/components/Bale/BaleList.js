import React, { Component } from 'react';
import { FlatList, View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { isPhone } from 'react-native-device-detection';
import Modal from 'react-native-modal';
import PhoneBale from '../Bale/PhoneBale';
import TabletBale from '../Bale/TabletBale';
import Button from '../common/Button';
import TextField from '../common/TextField';
import strings from '../../localization/';
import recyclabeleMaterials from '../common/Constants';
import styles from './styles';

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

  state = {
    isModalVisible: false,
    selectedMaterial: null,
  };

  getMaterials() {
    const pickerMaterial = [];
    pickerMaterial.push(
      <Picker.Item
        key={999}
        label={strings.selectMaterial}
        value={false}
      />,
    );
    this.materials.map((material) => {
      pickerMaterial.push(<Picker.Item
        key={material.id}
        label={material.name}
        value={material.name}
      />);
    });
    return pickerMaterial;
  }

  toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    return (
      <View>
        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.setState({ isModalVisible: false })}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modalTitle}>
                {strings.editBale}
              </Text>
            </View>
            <View>
              <TextField
                placeholder={strings.editBalePlaceholder}
                keyboardType="numeric"
              />
              <Picker
                selectedValue={this.state.selectedMaterial}
                mode="dropdown"
                onValueChange={value =>
                  (this.setState({ selectedMaterial: value }))}
              >
                {this.getMaterials()}
              </Picker>
              <Button
                style={styles.button}
                textStyle={styles.text}
                title={strings.acceptEditBale}
                onPress={this.toggleModal}
              />
            </View>
          </View>
        </Modal>
        <FlatList
          data={balesList}
          renderItem={({ item }) => {
            if (isPhone) {
              return <PhoneBale id={item.id} onPressAction={this.toggleModal} />;
            }
            return (
              <TabletBale
                id={item.id}
                type={item.type}
                weight={item.weight}
                onPressAction={this.toggleModal}
              />
            );
          }}
        />
      </View>
    );
  }
}

BaleList.propTypes = {};

BaleList.defaultProps = {};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BaleList);
