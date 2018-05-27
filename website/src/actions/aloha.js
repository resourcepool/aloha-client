import { CALL_API } from '../client/api';

/*------------------------------------------------------------------------------------------
 * Loads PEOPLE
 *-----------------------------------------------------------------------------------------*/
export const LOAD_PEOPLE_REQUEST = 'LOAD_PEOPLE_REQUEST';
export const LOAD_PEOPLE_SUCCESS = 'LOAD_PEOPLE_SUCCESS';
export const LOAD_PEOPLE_FAILURE = 'LOAD_PEOPLE_FAILURE';
const loadPeopleAsync = (offset, limit, filter) => ({
  [CALL_API]: {
    types: [
      LOAD_PEOPLE_REQUEST,
      LOAD_PEOPLE_SUCCESS,
      LOAD_PEOPLE_FAILURE
    ],
    endpoint: `people?limit=${limit}&offset=${offset}&filter=${filter || ''}`,
    method: 'GET'
  }
});

export const loadPeople = (offset, limit, filter) => dispatch => {
  return dispatch(loadPeopleAsync(offset, limit, filter));
};
