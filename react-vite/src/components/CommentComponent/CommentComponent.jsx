import { useEffect, useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { useModal } from "../../context/Modal";
import * as commentActions from "../../redux/comments"
import './CommentComponent.css'
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteComment from "../DeleteCommentModal/DeleteCommentModal";
import EditComment from "../EditCommentComponent/EditCommentComponent";

const hourArr = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

const Comment = () => {
  const dispatch = useDispatch()
  const { cardId } = useParams()
  const comments = useSelector(state => {
    return state.comments
  })
  const [ isBeingEdited, setIsBeingEdited ] = useState(false)
  const [ editCommentId, setEditCommentId ] = useState()

  useEffect(() => {
    dispatch(commentActions.getCommentsThunk(cardId))
  }, [dispatch])

  let revCommentsArrVals = Object.values(comments).reverse()

  if (!comments) {
    return (
      <div>...loading</div>
    )
  } else {
    return (
      <div>
        <h1>Comments: (this isn't staying)</h1>

        {revCommentsArrVals.map((comment) => {
          let updatedDateSplit = new Date(comment.updated_at).toDateString().split(' ')
          let updatedTimeSplit = new Date(comment.updated_at).toTimeString().split(' ')
          let dateDay = updatedDateSplit[0]
          let dateMonth = updatedDateSplit[1]
          let dateDate = updatedDateSplit[2]
          let dateYear = updatedDateSplit[3]
          let timeTimeSplit = updatedTimeSplit[0].split(':')
          let timeHour = timeTimeSplit[0]
          let postedHour
          let meridiem
          if (timeHour < 12) {
            postedHour = hourArr[+timeHour]
            meridiem = 'AM'
          } else {
            postedHour = hourArr[+timeHour - 12]
            meridiem = 'PM'
          }
          let postedMinute = timeTimeSplit[1]

          if (isBeingEdited && editCommentId === comment.id) {
            return <EditComment commentId={comment.id} key={comment.id}/>
          } else {
            return (
              <div className="comment-container" key={comment.id}>

              <div className="comment-initials-logo">{comment.commenter_details.first_name[0]}{comment.commenter_details.last_name[0]}</div>

              <div className="comment-name-time">
                <div className="comment-name">{comment.commenter_details.first_name} {comment.commenter_details.last_name}</div>

                <div className="comment-timestamp">{dateMonth} {dateDate} at {postedHour}:{postedMinute} {meridiem}</div> {/*look into Moment.js */}
              </div>

              <div className="comment-text">{comment.comment_text}</div>

              <div className="comment-edit-delete">
                <button className="comment-edit" onClick={() => {
                  setIsBeingEdited(true)
                  setEditCommentId(comment.id)
                }}
                >Edit</button>
                <div className="comment-dot">·</div>
                <div className="comment-delete">
                  <OpenModalButton
                    buttonText={'Delete'}
                    modalComponent={<DeleteComment commentId={comment.id}/>}

                    />
                </div>
              </div>

            </div>

            )}
        })}

      </div>
      )
    }
  }

export default Comment
