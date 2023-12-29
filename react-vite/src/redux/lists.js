import { csrfFetch } from './csrf';
import { GET_LISTS, ADD_LIST, EDIT_LIST,EDIT_LIST_ORDER, DELETE_LIST, LISTS_ERROR } from './actionTypes';

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

export const deleteListThunk = (boardId, listId) => async (dispatch) => {
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

export const updateListTitleThunk = (boardId, listId, newTitle) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/boards/${boardId}/lists/${listId}`, {
      method: 'PUT',
      body: JSON.stringify({ title: newTitle }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (response.ok) {
      const updatedList = await response.json();
      dispatch({ type: EDIT_LIST, payload: updatedList });
    } else {
      dispatch({ type: LISTS_ERROR, error: 'Failed to Update list' });
    }
  } catch (error) {
    dispatch({ type: LISTS_ERROR, error });
  }
};

export const updateListOrderThunk = (boardId, newOrder) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/boards/${boardId}/lists/reorder`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ new_order: newOrder })
    });

    console.log(response, 'This is the updated order')

    if (response.ok) {
    const updatedList = await response.json();

    console.log(updatedList, 'LOGGING LIST FROM THINK');
    console.log("Dispatching EDIT_LIST_ORDER with:", updatedList);
    dispatch({ type: EDIT_LIST_ORDER, payload: { boardId, updatedLists: updatedList } });
    } else {
      // Log error details
      const error = await response.text();
      console.error('Error response body:', error);
      dispatch({ type: LISTS_ERROR, error: 'Failed to update list order' });
    }
  } catch (error) {
    console.error('Catch error:', error);
    dispatch({ type: LISTS_ERROR, error });
  }
};

