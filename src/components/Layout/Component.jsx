import React, { Component } from 'react';
import View from '../Container';
import { serializeStateToPayload } from '../../reducers/layoutUtils';

const centerStyle = {
  minHeight: 40,
};

class Layout extends Component {
  renderInnerViews = (childData, index, parentPath) =>
    <View
      column={parentPath.length === 4 && true}
      style={centerStyle}
      key={[...parentPath, index].join('')}
    >
      {childData.data}
      {childData.children.map((innerChildData, innerIndex) =>
        this.renderInnerViews(innerChildData, innerIndex, [
          ...parentPath,
          'children',
          innerIndex,
        ]),
      )}
    </View>;

  render() {
    this.props.onLayoutChange(serializeStateToPayload(this.props.layout)); // <-- demo
    return (
      <View column className="layout">
        {this.props.layout.children.map((innerChildData, innerIndex) =>
          this.renderInnerViews(innerChildData, innerIndex, [
            'children',
            innerIndex,
          ]),
        )}
      </View>
    );
  }
}

export default Layout;
