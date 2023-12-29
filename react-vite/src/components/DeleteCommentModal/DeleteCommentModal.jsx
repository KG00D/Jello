import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './DeleteCommentModal.css'
import * as commentActions from "../../redux/comments"

const DeleteComment = ({commentId}) => {
  const dispatch = useDispatch()
  const comments = useSelector(state => {
    return state.comments
  })
  const { closeModal } = useModal()

  const handleDelete = (e) => {
    e.preventDefault()

    dispatch(commentActions.deleteCommentThunk(commentId))

    closeModal()
  }

  const handleDiscard = () => {
    closeModal()
  }

  return (
    <div className="delete-container">
      <div className="delete-top-row">
        <div></div>
        <h1 className="delete-header">Delete comment?</h1>
        <button onClick={handleDiscard} className="delete-x">X</button>
      </div>
      <p className="delete-p">Deleting a comment is forever. There is no undo.</p>
      <button onClick={handleDelete} className="delete-button">Delete comment</button>
    </div>
  )
}

export default DeleteComment
