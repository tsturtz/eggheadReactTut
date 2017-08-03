import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';

import Gallery from './Gallery';

// for the most part - dont interact directly with the store
import { createStore } from 'redux';
// import the reducer function that we’ve just created so that it can be delivered to the store.
import reducer from './reducer';

// We will use createStore(reducer) to configure the store with our application’s reducer.
const store = createStore(reducer);

// This will wrap our Gallery so that we can make easy use of Redux.
import { Provider } from 'react-redux';

ReactDOM.render(
  // We need to pass the store we just created to the Provider so that it can use it for us.
  <Provider store={store}>
    <Gallery />
  </Provider>,
  document.getElementById('root')
);
