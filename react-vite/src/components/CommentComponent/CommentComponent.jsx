import { useEffect, useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { useModal } from "../../context/Modal";
import * as commentActions from "../../redux/comments"

const Comment = () => {
  const dispatch = useDispatch()
  const cardId = useParams()
  const comments = useSelector(state => {
    return state.comments
  })

  useEffect(() => {
    dispatch(commentActions.getCommentsThunk(cardId))
  }, [dispatch])

  if (!comments) {
    return (
      <div>...loading</div>
    )
  } else {
    return (
      <div>
        <h1>Comment!</h1>
        <ul>
          <li>{comments}</li>
        </ul>
      </div>
      )
    }
  }

export default Comment
