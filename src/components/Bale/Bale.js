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

Bale.propTypes = {
  user: PropTypes.object,
  role: PropTypes.string,
};

Bale.defaultProps = {
  user: null,
  role: null,
};

export default connect()(Bale);
