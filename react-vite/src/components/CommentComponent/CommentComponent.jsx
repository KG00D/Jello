import { useEffect, useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { useModal } from "../../context/Modal";
import * as commentActions from "../../redux/comments"
import './CommentComponent.css'

const hourArrAM = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
const hourArrPM = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

const Comment = () => {
  const dispatch = useDispatch()
  const { cardId } = useParams()
  const comments = useSelector(state => {
    return state.comments
  })

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
            postedHour = hourArrAM[+timeHour]
            meridiem = 'AM'
          } else {
            postedHour = hourArrPM[+timeHour - 12]
            meridiem = 'PM'
          }
          let postedMinute = timeTimeSplit[1]

          return (
            <div className="comment-container">

              <div className="comment-initials-logo">{comment.commenter_details.first_name[0]}{comment.commenter_details.last_name[0]}</div>

              <div className="comment-name-time">
                <div className="comment-name">{comment.commenter_details.first_name} {comment.commenter_details.last_name}</div>

                <div className="comment-timestamp">{dateMonth} {dateDate} at {postedHour}:{postedMinute} {meridiem}</div>
              </div>

              <div className="comment-text">{comment.comment_text}</div>

              <div className="comment-edit-delete">
                <button className="comment-edit">Edit</button>
                <div className="comment-dot">·</div>
                <button className="comment-delete">Delete</button>
              </div>

            </div>

          )
        })}

      </div>
      )
    }
  }

export default Comment
