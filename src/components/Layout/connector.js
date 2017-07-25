import { connect } from 'react-redux';

const mapStateToProps = state => ({
  layout: state.get('layout').toJS(),
});

export default connect(mapStateToProps);
