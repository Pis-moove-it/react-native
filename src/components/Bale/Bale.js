import React, { Component } from 'react';
import { connect } from 'react-redux';
import BaleList from '../common/BaleList';

class Bale extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  render() {
    return <BaleList />;
  }
}

Bale.propTypes = {};

Bale.defaultProps = {};

export default connect()(Bale);
