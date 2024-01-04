import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCardsThunk, addCardThunk, editCardThunk, deleteCardThunk, getCardThunk } from '../../redux/cards';
import { useModal } from '../../context/Modal';
import EditCardModal from '../EditCardModal/EditCardModal';
import OpenModalCardEdit from './OpenModalCardEdit';
import './CardsComponent.css'

const Cards = ({ currCard }) => {
    const dispatch = useDispatch()

    const cardPlaceholder = {
        name: 'Hat',
        id: 11,
        description: 'we have a hat',
        listId: 1,
    }

   

    // const cardList = {
    //     listTitle: currCard.listTitle
    // }

    const currentCard = currCard ? currCard : cardPlaceholder

    const openEditCardModal = () => {
        dispatch(getCardThunk(currentCard))
        return <EditCardModal currCard={currCard}/>
    }


    return (
        <>
            <div className='cards-component-box'>
                <OpenModalCardEdit modalComponent={openEditCardModal} itemText={currCard ? currCard.name : cardPlaceholder.name}/>
            </div>
        </>
    )
}

export default Cards
