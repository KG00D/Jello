import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as commentActions from "../../redux/comments"
import './CommentComponent.css'
import DeleteComment from "../DeleteCommentModal/DeleteCommentModal";
import EditComment from "../EditCommentComponent/EditCommentComponent";

const hourArr = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

const Comment = ({cardId, counter, setCounter}) => {
  const dispatch = useDispatch()
  const comments = useSelector(state => {
    return state.comments
  })
  const { user } = useSelector(state => {
    return state.session
  })
  const [ isBeingEdited, setIsBeingEdited ] = useState(false)
  const [ focusedCommentId, setFocusedCommentId ] = useState()
  const [ isBeingDeleted, setIsBeingDeleted ] = useState(false)

  useEffect(() => {
    dispatch(commentActions.getCommentsThunk(cardId))
  }, [dispatch])

  let cardCommentsArr = Object.values(comments).filter(comment => comment.card_id === cardId)
  let revCommentsArrVals = cardCommentsArr.reverse()

  if (!comments) {
    return (
      <div>...loading</div>
    )
  } else {
    return (
      <div>
        {revCommentsArrVals.map((comment) => {
          let updatedDateSplit = new Date(comment.updated_at).toDateString().split(' ')
          let updatedTimeSplit = new Date(comment.updated_at).toTimeString().split(' ')
          let dateMonth = updatedDateSplit[1]
          let dateDate = updatedDateSplit[2]
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

          let editDeleteButtonClass

          if (user && comment.user_id !== user.id) {
            editDeleteButtonClass = 'comment-edit-delete-hidden'
          } else {
            editDeleteButtonClass = 'comment-edit-delete'
          }

          let deleteButtonClass
          if (isBeingDeleted) {
            deleteButtonClass = 'comment-delete-shown'
          } else {
            deleteButtonClass = 'comment-delete-hidden'
          }


          if (isBeingEdited && focusedCommentId === comment.id) {
            return <EditComment commentId={comment.id} key={comment.id} setIsBeingEdited={setIsBeingEdited} cardId={cardId}/>
          } else if (isBeingDeleted && focusedCommentId === comment.id) {
            return (
            <div className="comment-container" key={comment.id}>

              <div className="comment-initials-logo">{comment.commenter_details.first_name[0]}{comment.commenter_details.last_name[0]}</div>

              <div className="comment-name-time">
                <div className="comment-name">{comment.commenter_details.first_name} {comment.commenter_details.last_name}</div>

                <div className="comment-timestamp">{dateMonth} {dateDate} at {postedHour}:{postedMinute} {meridiem}</div>
              </div>

              <div className="comment-text">{comment.comment_text}</div>

              <div className={editDeleteButtonClass}>
                <div>
                  <button className="comment-edit" onClick={() => {
                    setIsBeingEdited(true)
                    setFocusedCommentId(comment.id)
                  }}>Edit</button>
                </div>

                <div className="comment-dot">·</div>

                <div>
                  <button className='comment-delete' onClick={() => {
                    setIsBeingDeleted(true)
                    setFocusedCommentId(comment.id)
                  }}>Delete</button>

                  <div className='comment-delete-shown'>
                    <DeleteComment commentId={comment.id} setIsBeingDeleted={setIsBeingDeleted} counter={counter} setCounter={setCounter} cardId={cardId}/>
                  </div>

                </div>

              </div>
            </div>
          )
          } else {
            return (
              <div className="comment-container" key={comment.id}>

              <div className="comment-initials-logo">{comment.commenter_details.first_name[0]}{comment.commenter_details.last_name[0]}</div>

              <div className="comment-name-time">
                <div className="comment-name">{comment.commenter_details.first_name} {comment.commenter_details.last_name}</div>

                <div className="comment-timestamp">{dateMonth} {dateDate} at {postedHour}:{postedMinute} {meridiem}</div>
              </div>

              <div className="comment-text">{comment.comment_text}</div>

              <div className={editDeleteButtonClass}>
                <div>
                  <button className="comment-edit" onClick={() => {
                    setIsBeingEdited(true)
                    setFocusedCommentId(comment.id)
                  }}>Edit</button>
                </div>

                <div className="comment-dot">·</div>

                <div className="comment-delete">
                  <button className='comment-delete' onClick={() => {
                    setIsBeingDeleted(true)
                    setFocusedCommentId(comment.id)
                  }}>Delete</button>

                  <div className='comment-delete-hidden'>
                    <DeleteComment commentId={comment.id} setIsBeingDeleted={setIsBeingDeleted} counter={counter} setCounter={setCounter} cardId={cardId}/>
                  </div>

                </div>

              </div>
            </div>
            )}
            // else {
            //   return <div>...loading some more</div>
            // }
        })}
      </div>
      )
    }
  }

export default Comment
