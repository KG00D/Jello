import { GET_COMMENTS, POST_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from './actionTypes';

const getComments = (data) => {
  return {
    type: GET_COMMENTS,
    payload: data
  }
}

const postComment = (data) => {
  return {
    type: POST_COMMENT,
    payload: data
  }
}

const editComment = (data) => {
  return {
    type: EDIT_COMMENT,
    payload: data
  }
}

const deleteComment = (data) => {
  return {
    type: DELETE_COMMENT,
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

export const postCommentThunk = (cardId, commentForm) => async (dispatch) => {
  try {
    const response = await fetch(`/api/cards/${cardId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(commentForm)
    })

    const data = await response.json()
    dispatch(postComment(data))
    return data
  } catch (error) {
    return error
  }
}

export const editCommentThunk = (commentId, commentForm) => async (dispatch) => {
  try {
    const response = await fetch(`/api/comments/${+commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(commentForm)
    })

    const data = await response.json()
    dispatch(editComment(data))
  } catch (error) {
    return error
  }
}

export const deleteCommentThunk = (commentId) => async (dispatch) => {
  try {
    const response = fetch(`/api/comments/${commentId}`, {
      method: "DELETE"
    })

    const data = await response.json()
    dispatch(deleteComment(data))
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
    case EDIT_COMMENT:
      newState = {...state}
      const comment = action.payload
      newState[comment.id] = comment
      return newState
    case DELETE_COMMENT:
      newState = {...state}
      const commentId = action.payload
      delete newState[commentId]
      return newState
    default:
      return state
  }
}

export default commentReducer
