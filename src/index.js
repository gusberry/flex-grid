import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import App from './components/Layout';
import registerServiceWorker from './registerServiceWorker';

import gridSystemReducer from './reducers';
import { moveContainer, initLayoutFromPayload } from './actions/layout';

let store = createStore(
  gridSystemReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

store.dispatch(
  initLayoutFromPayload([
    { x: 0, y: 0, w: null, data: 'test1' },
    { x: 0, y: 0, w: null, data: 'test2' },
    { x: 0, y: 0, w: null, data: 'test3' },
    { x: 0, y: 0, w: null, data: 'test4' },
    { x: 0, y: 0, w: null, data: 'test5' },
    { x: 0, y: 0, w: null, data: 'test6' },
    { x: 0, y: 0, w: null, data: 'test7' },
    { x: 0, y: 0, w: null, data: 'test8' },
    { x: 1, y: 0, w: null, data: 'testRightCell' },
    { x: 0, y: 1, w: null, data: 'testRow2' },
    { x: 0, y: 2, w: null, data: 'testRow3' },
  ]),
);

ReactDOM.render(
  <Provider store={store}>
    <App onLayoutChange={console.log} />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
