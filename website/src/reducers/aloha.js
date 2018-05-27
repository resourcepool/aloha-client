/* eslint-disable no-console */
import * as ActionTypes from '../actions/aloha';

import merge from 'lodash.merge';

const profile = (state = {
  people: []
}, action) => {
  const { type } = action;
  switch (type) {
  case ActionTypes.LOAD_PEOPLE_SUCCESS:
    return merge({}, {
      people: action.result.items,
      browse: action.result
    });
  default:
    return state;
  }
};

export default profile;
