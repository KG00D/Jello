import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as commentActions from "../../redux/comments"

const CreateComment = () => {
  const dispatch = useDispatch()
  const [commentText, setCommentText] = useState('')
  const [errors, setErrors] = useState({})


  const commentForm = {
    comment_text: commentText
  }

  useEffect(() => {
    dispatch(commentActions)
  }, [dispatch])
}

export default CreateComment
