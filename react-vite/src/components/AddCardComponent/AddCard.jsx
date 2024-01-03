import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCardThunk } from '../../redux/cards'
import './AddCard.css'

const AddCard = ( { list }) => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [ showAddButton, setShowAddButton ] = useState(true)
    const [ addCardDisabled, setAddCardDisabled ] = useState(false)
    const listId = list.id

    useEffect(() => {
        if (name.length > 64) setAddCardDisabled(true)
        else setAddCardDisabled(false)
    }, [name])


    const onSubmit = (e) => {
        e.preventDefault()

        if (!name) reset()
        else {
            const data = {
                card: {
                    name,
                    list_id: listId
                }
            }
            const newCardRes = dispatch(addCardThunk(data))
            reset()
        }
    }

    const reset = () => {
        setShowAddButton(!showAddButton)
        setAddCardDisabled(false)
        setName('')
    }

    const addCardButton = <button id='add-card-button' onClick={() => setShowAddButton(!showAddButton)}>+ Add a card</button>

    return (
        <>
            {showAddButton && addCardButton}
            { !showAddButton &&
             <form className='add-card-form-box'>
                <textarea maxLength='64' placeholder='Enter a title for this card...' id='new-card-name' type='text' onChange={(e) => setName(e.target.value)} value={name}></textarea>
                <div className='add-card-buttons-box'>
                    <button id='add-card-save-button' className={`card-disabled-${addCardDisabled}`} disabled={addCardDisabled} onClick={onSubmit}>Add Card</button>
                    <p id='cancel-add-card-save' onClick={reset}>X</p>
                </div>
             </form>
            }
            
        </>
    )
}

export default AddCard