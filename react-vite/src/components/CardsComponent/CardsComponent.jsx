import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCardsThunk, addCardThunk, updateCardThunk } from '../../redux/cards';

const Cards = ({listId}) => {
    const dispatch = useDispatch();
    const allCards = useSelector((state) => Object.values(state.cards))

    console.log('in cards component')
    //LIST ID IS HARD CODED - NEEDS TO CHANGE
    //getCardsThunk takes list id as a string
    useEffect(() => {
        dispatch(updateCardThunk({
            name: "Make cranberry pie",
            description: "Make 20 cranberry pies for christmas eve.",
            id: 112
        }))
    }, [dispatch])

    let updatedCard = {
        listId: 1,
        card: {
            name: "Make apple pie",
            description: "Make 20 apple pies for christmas eve.",
            id: 1
        }
    }
    return (
        <h1>'Cards'</h1>
    )
}

export default Cards
