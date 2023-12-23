import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as commentActions from "../../redux/comments"
import { useParams } from "react-router-dom";

const CreateComment = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => {
    return state.session
  })
  const { cardId } = useParams()
  const [commentText, setCommentText] = useState('')
  const [errors, setErrors] = useState({})

  const initials = `${user.first_name[0]}${user.last_name[0]}`

  useEffect(() => {

  }, [dispatch])


  const handleSubmit = async (e) => {
    e.preventDefault()

    const commentForm = {
      comment_text: commentText,
      user_id: user.id,
      card_id: cardId
    }
    console.log('in handleSubmit, before dispatch')
    dispatch(commentActions.postCommentThunk(cardId, commentForm))
    console.log('in handleSubmit, after dispatch')

  }

  return (
    <div>
      <div>{initials}</div>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            id= "comment-text"
            type="text"
            onChange={e => setCommentText(e.target.value)}
            value={commentText}
            placeholder="Write a comment..."
          />
          <button>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default CreateComment
