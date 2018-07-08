// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import homepage from './homepage';
import menu from './menu';

const rootReducer = combineReducers({
  counter: counter,
  router: router,
  homepage: homepage,
  menu:menu
});

export default rootReducer;
