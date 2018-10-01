import React, { Component } from 'react';
import { View } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import stylesGather from './styles';
import GatherOverlay from './GatherOverlay';


Mapbox.setAccessToken('pk.eyJ1IjoicXFtZWxvIiwiYSI6ImNqbWlhOXh2eDAwMHMzcm1tNW1veDNmODYifQ.vOmFAXiikWFJKh3DpmsPDA');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  state = {
    isModalVisible: false,
  };

  toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    return (
      <View style={stylesGather.mapContainer}>
        <GatherOverlay />
        <Mapbox.MapView
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={15}
          centerCoordinate={[11.256, 43.77]}
          style={stylesGather.mapContainer}
        />
      </View>
    );
  }
}
