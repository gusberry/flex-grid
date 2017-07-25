import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import App from './components/Layout';
import registerServiceWorker from './registerServiceWorker';

import gridSystemReducer from './reducers';
import { moveContainer } from './actions/layout';

let store = createStore(
  gridSystemReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

setTimeout(() => {
  store.dispatch(
    moveContainer({
      from: ['children', 0, 'children', 0, 'children', 0],
      to: ['children', 1],
    }),
  );
}, 2000);

setTimeout(() => {
  store.dispatch(
    moveContainer({
      from: ['children', 0, 'children', 0, 'children', 0],
      to: ['children', 0, 'children', 1],
    }),
  );
}, 4000);

ReactDOM.render(
  <Provider store={store}>
    <App onLayoutChange={console.log} />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
