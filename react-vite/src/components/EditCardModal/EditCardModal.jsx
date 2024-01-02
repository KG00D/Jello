import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import { useSelector, useDispatch  } from "react-redux";
import './EditCardModal.css'
import { deleteCardThunk, editCardThunk } from "../../redux/cards";
import * as commentActions from "../../redux/comments"
import Comment from "../CommentComponent/CommentComponent";
import CreateComment from "../CreateCommentComponent/CreateCommentComponent";

function EditCardModal({cardList}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const card = useSelector((state) => state.cards.Card)
    const comments = useSelector((state) => state.comments)
    const [ nameBorderVisible, setNameBorderVisible ] = useState(false)
    const [ descriptionBorderVisible, setDescriptionBorderVisible ] = useState(false)
    const [ name, setName ] = useState(card.name)
    const [ description, setDescription ] = useState(card.description)
    const [ errors, setErrors ] = useState({})
    const [ showErrors, setShowErrors] = useState(false)
    const [ counter, setCounter ] = useState(0)

    useEffect(() => {
        const error = {}

        if (name.length === 0) error.name = 'Name is required'
        if (name.length >= 64) error.name = 'Name must be less than 64 characters'

        setErrors(error)
    }, [name])
    
    // useEffect(() => {
    //     dispatch(commentActions.getCommentsThunk(card.id))
    // }, [dispatch, counter])

    const onSubmit = async (e) => {
        e.preventDefault()
        if (errors.name) {
            setShowErrors(true)
            console.log(errors, '----we are in errors')
        }
        else {
            const updatedCard = {
                name,
                description,
                id: card.id
            }

            const updatedCardRes = dispatch(editCardThunk(updatedCard))
            console.log(updatedCardRes, '----updatedCardRes')
            closeModal()
            reset()
        }

    }

    const reset = () => {
        setNameBorderVisible(false)
        setName(card.title)
        setDescription(card.description)
        setDescriptionBorderVisible(false)
    }

    const showNameBorder = () => {
        setNameBorderVisible(!nameBorderVisible)
    }

    const showDescriptionBorder = () => {
        setDescriptionBorderVisible(!descriptionBorderVisible)
    }


    const descriptionText = description === 'None'  || !description ? 'Add a more detailed description' : description

    const placeholderText = description === 'None' ? '' : description

    // console.log(description, '---description')
    // console.log(typeof description)
    // console.log(description === 'None')
    // console.log(descriptionText, '----descriptionText')


    const deleteCard = () => {
        // console.log('-delete clicked')
        dispatch(deleteCardThunk(card.id))
        closeModal()
    }


    return (
        <>
            <div className='edit-card-form'>
                <div className='card-name-box'>
                    <div className='card-name-logo'>
                        <p><i className="fa-sharp fa-regular fa-credit-card"></i></p>
                    </div>
                    <div className='card-name-right'>
                        <input onClick={showNameBorder} placeholder={card.name} id='card-name' className={ showNameBorder ? `card-name-border-visible` : 'card-name-border-hidden'} type='text' onChange={(e) => setName(e.target.value)} value={name}></input>
                    </div>
                    <div className='card-x' onClick={closeModal}>
                        X
                    </div>
                </div>
                <div className='card-description-box'>
                    <div className='card-description-logo'>
                        <p><i class="fa-solid fa-bars-staggered"></i></p>
                    </div>
                    <div className='card-description-text'>
                        <p id='card-description-p'>Description</p>
                        <textarea maxlength='1000' onClick={showDescriptionBorder} placeholder={descriptionText} id='card-description' className={ showDescriptionBorder ? `card-description-border-visible` : 'card-description-border-hidden'} type='text' onChange={(e) => setDescription(e.target.value)} value={placeholderText}></textarea>
                    </div>
                </div>
                <div className='card-button-box'>
                    <button onClick={onSubmit}>Save</button>
                    <button id='card-delete-button' onClick={deleteCard}>Delete</button>
                </div>
                <div>
                    <CreateComment cardId={card.id}/>
                </div>
                <div className='comments box'>
                    <Comment cardId={card.id} counter={counter} setCounter={setCounter}/>
                </div>
            </div>
        </>
    )
}

export default EditCardModal
