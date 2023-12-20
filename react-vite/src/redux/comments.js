import { GET_COMMENTS, POST_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from './actionTypes';

const getComments = (data) => {
  return {
    type: GET_COMMENTS,
    payload: data
  }
}

export const getCommentsThunk = (cardId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/cards/${+cardId}/comments`)

    const data = await response.json()
    dispatch(getComments(data))
    return data
  } catch (error) {
    return error
  }
}

export const postCommentThunk = (id, commentForm) => async (dispatch) => {
  try {
    const response = await fetch(`/api/cards/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(commentForm)
    })

    const data = await response.json()
    dispatch({ type: POST_COMMENT, payload: data})
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
    case POST_COMMENT:
      newState = {...state}
      const newComment = action.payload
      newState[newComment.id] = newComment
      return newState
    default:
      return state
  }
}

export default commentReducer
