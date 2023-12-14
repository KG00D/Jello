import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";

const Comment = () => {
  const dispatch = useDispatch()
  const comments = useSelector(state => {
    return state.comments
  })

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
