import { combineReducers } from 'redux';
// Library Reducers
import { routerReducer } from 'react-router-redux';
// Own Reducers
import alohaReducer from './aloha';
// i18n
import { intlReducer as intl } from 'react-intl-redux';

const reducers = combineReducers({
  intl: intl,
  router: routerReducer,
  aloha: alohaReducer
});

export default reducers;
