import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as commentActions from "../../redux/comments"
import './CreateCommentComponent.css'

const CreateComment = ({cardId}) => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => {
    return state.session
  })
  const [commentText, setCommentText] = useState('')
  const [selected, setSelected] = useState(false)

  const initials = `${user.first_name[0]}${user.last_name[0]}`

  useEffect(() => {

  }, [dispatch])

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    const commentForm = {
      comment_text: commentText,
      user_id: user.id,
      card_id: cardId
    }

    dispatch(commentActions.postCommentThunk(cardId, commentForm))

    setCommentText('')
    setSelected(false)
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
          <button className={buttonClass}>Save</button>
        </div>
      </form>

    </div>
  )
}

export default CreateComment
