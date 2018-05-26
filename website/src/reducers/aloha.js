import * as ActionTypes from '../actions/aloha';

import merge from 'lodash.merge';

const profile = (state = {
  people: []
}, action) => {
  const { type } = action;
  switch (type) {
  case ActionTypes.LOAD_PEOPLE_SUCCESS:
    return merge({}, state, { 
      people: action.result.items,
      browse: action.result
    });
  default:
    return state;
  }
};

export default profile;
