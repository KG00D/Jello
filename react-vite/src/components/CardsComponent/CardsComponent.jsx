import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCardsThunk, addCardThunk } from '../../redux/cards';

const Cards = ({listId}) => {
    const dispatch = useDispatch();
    const allCards = useSelector((state) => Object.values(state.cards))

    console.log('in cards component')
    //LIST ID IS HARD CODED - NEEDS TO CHANGE
    useEffect(() => {
        dispatch(addCardThunk({
            listId: 100,
            card: {
                name: "Make cranberries",
                description: "Make 20 cranberries for christmas eve.",
                list_id: "4"
            }
        }))
    }, [dispatch, listId])

    let newCard = {
        listId: 1,
        card: {
            name: "Make apple pie",
            description: "Make 20 apple pies for christmas eve.",
            list_id: "1"
        }
    }
    return (
        <h1>'Cards'</h1>
    )
}

export default Cards
