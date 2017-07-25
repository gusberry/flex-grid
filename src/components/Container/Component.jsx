import React from 'react';
import View from 'react-flexbox';

const Container = ({
  connectDropTarget,
  canDrop,
  connectDragSource,
  isDragging,
  moveContainer,
  path,
  ...rest
}) =>
  connectDropTarget(
    connectDragSource(
      <div style={{ flex: 'auto', display: 'flex' }}>
        <View {...rest} className="flex-container">
          {rest.data}
          {rest.children}
        </View>
      </div>,
    ),
  );

export default Container;
