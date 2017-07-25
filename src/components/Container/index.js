import Component from './Component';
import dragSource from './dragSource';
import dropTarget from './dropTarget';
import connect from './connector';

export default connect(dragSource(dropTarget(Component)));
