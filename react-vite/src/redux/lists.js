import { csrfFetch } from './csrf';
import { GET_LISTS, ADD_LIST, EDIT_LIST, DELETE_LIST, LISTS_ERROR } from './actionTypes';

export const getLists = (boardId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/boards/${boardId}/lists`);
    if (response.ok) {
      const lists = await response.json();
      dispatch({ type: GET_LISTS, lists });
    } else {
      dispatch({ type: LISTS_ERROR, error: 'Failed to fetch lists' });
    }
  } catch (error) {
    dispatch({ type: LISTS_ERROR, error });
  }
};

export const addList = (boardId, title) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/boards/${boardId}/lists`, {
      method: 'POST',
      body: JSON.stringify({ title }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (response.ok) {
      const newList = await response.json();
      dispatch({ type: ADD_LIST, payload: { boardId, list: newList } });
    } else {
      dispatch({ type: LISTS_ERROR, error: 'Failed to add list' });
    }
  } catch (error) {
    dispatch({ type: LISTS_ERROR, error });
  }
};

export const deleteList = (boardId, listId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/boards/${boardId}/lists/${listId}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      dispatch({ type: DELETE_LIST, payload: { boardId, listId } });
    } else {
      dispatch({ type: LISTS_ERROR, error: 'Failed to delete list' });
    }
  } catch (error) {
    dispatch({ type: LISTS_ERROR, error });
  }
};


