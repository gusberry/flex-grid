import Component from './Component';
import connect from './connector';
import dndContext from './dndContext';

export default connect(dndContext(Component));
