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
  const [ validationErrors, setValidationErrors ] = useState({})
  const [selected, setSelected] = useState(false)
  const [ validity, setValidity ] = useState(false)

  const initials = `${user.first_name[0]}${user.last_name[0]}`

  const comment = comments[+commentId]

  useEffect(() => {
    setCommentText(comment.comment_text)
  }, [dispatch])

  useEffect(() => {
    if (commentText.length < 257) setValidity(true)
    else setValidity(false)
  }, [commentText])

  useEffect(() => {
    const errors = {}

    if (commentText.length >= 257) {
      errors.comment_text = 'Comment must be 256 characters or less'
      setValidity(false)
    }

    setValidationErrors(errors)

  }, [commentText])

  let buttonClass
  if (!selected) {
    buttonClass = "edit-comment-save-hidden"
  }
  if (selected) {
    buttonClass = "edit-comment-save"
  }
  if (selected && commentText) {
    buttonClass = "edit-comment-save-enabled"
  }
  if (validationErrors.comment_text) {
    buttonClass = "edit-comment-save"
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const commentForm = {
      id: commentId,
      comment_text: commentText,
      user_id: user.id,
      card_id: cardId
    }

    if (!Object.values(validationErrors).length) {
      dispatch(commentActions.editCommentThunk(commentId, commentForm))
    }

    setIsBeingEdited(false)
  }

  const handleDiscard = async (e) => {
    e.preventDefault()
    setIsBeingEdited(false)
  }

  const commentLengthErrorClass = 'comment-length-error' + (validity ? '' : '-error')


  return (
    <div className="edit-comment-container">

      <div className="edit-comment-initials">{initials}</div>

      <form onSubmit={handleSubmit}>
        <div className="edit-comment-form">

          <div className="edit-comment-text-container">
            <textarea
              id= "comment-text"
              className="edit-comment-text"
              type="text"
              onChange={e => setCommentText(e.target.value)}
              onClick={() => setSelected(true)}
              value={commentText}
              placeholder="Write a comment..."
              // contentEditable
            />
          </div>
          <div className={commentLengthErrorClass}>Comment must be 256 characters or less</div>
          <button className={buttonClass} disabled={!validity ? true : false}>Save</button>
          <button className="edit-comment-discard" onClick={handleDiscard}>Discard changes</button>
        </div>
      </form>

    </div>
  )
}

export default EditComment
