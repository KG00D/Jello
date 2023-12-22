import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import { useSelector, useDispatch  } from "react-redux";
import './EditCardModal.css'
import { deleteCardThunk, editCardThunk } from "../../redux/cards";

function EditCardModal() {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const card = useSelector((state) => state.cards.Card)
    const [ nameBorderVisible, setNameBorderVisible ] = useState(false)
    const [ descriptionBorderVisible, setDescriptionBorderVisible ] = useState(false)
    const [ name, setName ] = useState(card.name)
    const [ description, setDescription ] = useState(card.description)
    const [ errors, setErrors ] = useState({})
    const [ showErrors, setShowErrors] = useState(false)

    useEffect(() => {
        const error = {}

        if (name.length === 0) error.name = 'Name is required'
        if (name.length >= 64) error.name = 'Name must be less than 64 characters'

        setErrors(error)
    }, [name])


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


    const descriptionText = !description ? 'Add a more detailed description' : description

    
    const deleteCard = () => {
        console.log('-delete clicked')
        dispatch(deleteCardThunk(card.id))
        closeModal()
    }


    return (
        <>
            <div>
                <div className='card-name-box'>
                    <div className='card-name-logo'>
                        <p><i className="fa-sharp fa-regular fa-credit-card"></i></p>
                    </div>
                    <div className='card-name-right'>
                        <input onClick={showNameBorder} placeholder={card.name} id='card-name' className={ showNameBorder ? `card-name-border-visible` : 'card-name-border-hidden'}type='text' onChange={(e) => setName(e.target.value)} value={name}></input>
                        {errors.name && <p>{errors.name}</p>}
                        <p>in list LIST </p>
                    </div>
                </div>
                <div className='card-description-box'>
                    <div className='card-description-logo'>
                        <p><i className="fa-solid fa-bars-staggered"></i></p>
                    </div>
                    <div className='card-description-text'>
                        <p>Description</p>
                        <input onClick={showDescriptionBorder} placeholder={descriptionText} id='card-description' className={ showDescriptionBorder ? `card-description-border-visible` : 'card-description-border-hidden'} type='text' onChange={(e) => setDescription(e.target.value)} value={description}></input>
                    </div>
                </div>
                <div className='comments box'>
                    
                </div>
                <div>
                    <button onClick={onSubmit}>Save</button>
                    <button onClick={deleteCard}>Delete</button>
                </div>
            </div>
        </>
    )
}

export default EditCardModal