import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCardThunk } from '../../redux/cards'

const AddCard = ( { listId }) => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [ showAddButton, setShowAddButton ] = useState(true)
    const [ addCardDisabled, setAddCardDisabled ] = useState(false)

    useEffect(() => {
        if (name.length >= 64) setAddCardDisabled(true)
        else setAddCardDisabled(false)
    }, [name])

    const onCancel = () => {
        reset()
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log('in onSubmit')

        if (!name) reset()
        else {
            const data = {
                card: {
                    name,
                    list_id: listId
                }
            }

            console.log(data, '---before dispatch')
            const newCardRes = dispatch(addCardThunk(data))
            
            console.log(newCardRes, '----after dispatch')
        }
    }

    const reset = () => {
        console.log('---in reset')
        setShowAddButton(!showAddButton)
        setAddCardDisabled(false)
        setName('')
    }

    const addCardButton = <button onClick={() => setShowAddButton(!showAddButton)}>+ Add a card</button>

    return (
        <>
            {showAddButton && addCardButton}
            { !showAddButton &&
             <form>
                <input placeholder='Enter a title for this card...' id='new-card-name' type='text' onChange={(e) => setName(e.target.value)} value={name}></input>
                <div>
                    <button disabled={addCardDisabled} onClick={onSubmit}>Save</button>
                    <button onClick={onCancel}>X</button>
                </div>
             </form>
            }
            
        </>
    )
}

export default AddCard