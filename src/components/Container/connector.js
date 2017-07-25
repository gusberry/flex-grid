import { connect } from 'react-redux';
import { moveContainer } from '../../actions/layout';

const mapActions = {
  moveContainer,
};

export default connect(null, mapActions);
