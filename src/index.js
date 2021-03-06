import ReactDOM from 'react-dom';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Timer from './lib/time';
import MainComponent from './component/mainComponent';
import rootReducer from './store/reducers';
import { tickTimer, actionStartTimer, actionStopTimer } from './store/tomatoTimer.actions';
import startTimer from './lib/tomatoTimer';
import { trackStorForLocalStore, getStateOfLocalStore } from './lib/stateForLocalStore';

export const store = createStore( rootReducer,
  getStateOfLocalStore() );

trackStorForLocalStore(store);

export const timer = new Timer();

timer.on('tick', function(mesage){
  store.dispatch(tickTimer(mesage));
});

timer.on('start', function(mesage){
  console.log('start',mesage);
});

timer.on('stop', function(mesage){
  console.log('stop', mesage);
  store.dispatch(actionStartTimer(store.getState().tomatoTimer));
  store.dispatch(actionStopTimer());
});

timer.on('pause', function(mesage){
  console.log('pause', mesage);
});

ReactDOM.render(
  <Provider store={store}>
    <MainComponent/>
  </Provider>,
  document.getElementById('root')
);
