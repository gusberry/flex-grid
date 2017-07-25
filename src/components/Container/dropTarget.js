import { DropTarget } from 'react-dnd';

const target = {
  drop: (props, monitor, component) => {
    if (!monitor.didDrop()) {
      props.moveContainer({ from: monitor.getItem().from, to: props.path });
    }
  },
  canDrop: props => props.path && props.path.length !== 6,
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    canDrop: () => true,
  };
}

export default DropTarget('GRID:CONTAINER', target, collect);
