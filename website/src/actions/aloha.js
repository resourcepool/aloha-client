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


/*------------------------------------------------------------------------------------------
 * Loads PEOPLE
 *-----------------------------------------------------------------------------------------*/
export const SAVE_PERSON_REQUEST = 'SAVE_PERSON_REQUEST';
export const SAVE_PERSON_SUCCESS = 'SAVE_PERSON_SUCCESS';
export const SAVE_PERSON_FAILURE = 'SAVE_PERSON_FAILURE';
const savePersonAsync = (person) => ({
  [CALL_API]: {
    types: [
      SAVE_PERSON_REQUEST,
      SAVE_PERSON_SUCCESS,
      SAVE_PERSON_FAILURE
    ],
    endpoint: 'people',
    body: person,
    method: 'POST'
  }
});

export const savePerson = (person) => dispatch => {
  return dispatch(savePersonAsync(person));
};
