import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as commentActions from "../../redux/comments"
import './EditCommentComponent.css'
const EditComment = ({commentId, setIsBeingEdited, cardId}) => {

  const dispatch = useDispatch()
  const { user } = useSelector(state => {
    return state.session
  })
  const comments = useSelector(state => {
    return state.comments
  })
  const [commentText, setCommentText] = useState('')
  const [selected, setSelected] = useState(false)

  const initials = `${user.first_name[0]}${user.last_name[0]}`

  const comment = comments[+commentId]

  useEffect(() => {
    setCommentText(comment.comment_text)
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const commentForm = {
      id: commentId,
      comment_text: commentText,
      user_id: user.id,
      card_id: cardId
    }

    dispatch(commentActions.editCommentThunk(commentId, commentForm))

    setIsBeingEdited(false)
  }

  const handleDiscard = async (e) => {
    e.preventDefault()
    setIsBeingEdited(false)
  }

  let buttonClass
  if (!selected) {
    buttonClass = "create-comment-save-hidden"
  }
  if (selected) {
    buttonClass = "create-comment-save"
  }
  if (selected && commentText) {
    buttonClass = "create-comment-save-enabled"
  }

  return (
    <div className="create-comment-container">

      <div className="create-comment-initials">{initials}</div>

      <form onSubmit={handleSubmit}>
        <div className="create-comment-form">

          <div className="create-comment-text-container">
            <textarea
              id= "comment-text"
              className="create-comment-text"
              type="text"
              onChange={e => setCommentText(e.target.value)}
              onClick={() => setSelected(true)}
              value={commentText}
              placeholder="Write a comment..."
              // contentEditable
            />
          </div>

          <button className={buttonClass} onClick={handleSubmit}>Save</button>
          <button className="edit-comment-discard" onClick={handleDiscard}>Discard changes</button>
        </div>
      </form>

    </div>
  )
}

export default EditComment
