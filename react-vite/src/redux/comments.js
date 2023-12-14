import { GET_COMMENTS } from './actionTypes';

export const getCommentsThunk = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/cards/${id}/comments`)

    const data = await response.json()
    dispatch({ type: GET_COMMENTS, payload: data})
    return data
  } catch (error) {
    return error
  }
}

const initialState = {}

const commentReducer = (state = initialState, action) => {
  let newState
  switch (action.type) {
    case GET_COMMENTS:
      newState = {...state}
      const commentArr = action.payload.Comments
      commentArr.map((commentObj) => newState[commentObj.id] = commentObj)
      return newState
  }
}

export default commentReducer
