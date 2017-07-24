import React, { Component } from 'react';
import View from 'react-flexbox';

const centerStyle = { justifyContent: 'center', alignItems: 'center' };

class App extends Component {
  render() {
    return (
      <View row className="layout">
        <View column style={centerStyle}>
          <View column width="100px" style={centerStyle}>
            <p>Left</p>
          </View>
          <View column width="100px" style={centerStyle}>
            <p>Right</p>
          </View>
        </View>
        <View column className="green" style={centerStyle}>
          <p>All the place in the world</p>
        </View>
      </View>
    );
  }
}

export default App;
