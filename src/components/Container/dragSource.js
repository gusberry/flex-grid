import { DragSource } from 'react-dnd';

const source = {
  beginDrag(props) {
    return { from: props.path };
  },
  canDrag(props) {
    return props.data;
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

export default DragSource('GRID:CONTAINER', source, collect);
