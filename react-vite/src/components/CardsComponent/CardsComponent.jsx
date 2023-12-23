import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCardsThunk, addCardThunk, editCardThunk, deleteCardThunk, getCardThunk } from '../../redux/cards';
import { useModal } from '../../context/Modal';
import EditCardModal from '../EditCardModal/EditCardModal';
import OpenModalCardEdit from './OpenModalCardEdit';

const Cards = ({ card }) => {
    const dispatch = useDispatch()

    const cardPlaceholder = {
        name: 'Hat',
        id: 11,
        description: 'we have a hat',
        listId: 1,
        
    }

    const currentCard = card ? card : cardPlaceholder

    console.log(currentCard)
    
    const openEditCardModal = () => {
        dispatch(getCardThunk(currentCard))
        return <EditCardModal />
    }


    return (
        <>
            <div>
                <OpenModalCardEdit modalComponent={openEditCardModal} itemText={card ? card.name : cardPlaceholder.name}/>
            </div>
        </>
    )
}

export default Cards
