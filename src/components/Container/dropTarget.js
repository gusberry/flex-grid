import { DropTarget } from 'react-dnd';

const target = {
  drop: (props, monitor, component) => {
    if (!monitor.didDrop()) {
      props.moveContainer({ from: monitor.getItem().from, to: props.path });
    }
  },
  canDrop: (props, monitor) => {
    if (!props.path) {
      return false;
    }
    const { from } = monitor.getItem();
    const isDroppingOnContainer = props.path.length === 6;
    const isDroppingOnTheSameLevel =
      from.slice(0, props.path.length).join('') === props.path.join('');

    return !isDroppingOnContainer && !isDroppingOnTheSameLevel;
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    canDrop: () => true,
  };
}

export default DropTarget('GRID:CONTAINER', target, collect);
