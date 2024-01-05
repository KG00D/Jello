import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as commentActions from "../../redux/comments"
import './CreateCommentComponent.css'

const CreateComment = ({cardId}) => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => {
    return state.session
  })
  const [ commentText, setCommentText ] = useState('')
  const [ validationErrors, setValidationErrors ] = useState({})
  const [ selected, setSelected ] = useState(false)
  const [ validity, setValidity ] = useState(false)

  const initials = `${user.first_name[0]}${user.last_name[0]}`

  useEffect(() => {

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
    buttonClass = "create-comment-save-hidden"
  }
  if (selected) {
    buttonClass = "create-comment-save"
  }
  if (selected && commentText) {
    buttonClass = "create-comment-save-enabled"
  }
  if (validationErrors.comment_text) {
    buttonClass = "create-comment-save"
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const commentForm = {
      comment_text: commentText,
      user_id: user.id,
      card_id: cardId
    }

    if (!Object.values(validationErrors).length) {
      dispatch(commentActions.postCommentThunk(cardId, commentForm))
    }


    setCommentText('')
    setSelected(false)
  }

  const commentLengthErrorClass = 'comment-length-error' + (validity ? '' : '-error')


  return (
    <div className="create-comment-container">

      <div className="create-comment-initials">{initials}</div>

      <form onSubmit={handleSubmit} className="create-comment-form">
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
            />
          </div>

          <div className="button-validation-combo">
            <div className={commentLengthErrorClass}>Comment must be 256 characters or less</div>
            <button className={buttonClass} disabled={!validity ? true : false}>Save</button>
          </div>

        </div>
      </form>

    </div>
  )
}

export default CreateComment
