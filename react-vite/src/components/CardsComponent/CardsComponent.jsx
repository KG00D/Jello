import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCardsThunk, addCardThunk, editCardThunk, deleteCardThunk } from '../../redux/cards';
import { useModal } from '../../context/Modal';
import EditCardModal from '../EditCardModal/EditCardModal';
import OpenModalCardEdit from './OpenModalCardEdit';

const Cards = ({ card }) => {

    const cardPlaceholder = {
        name: 'cool card',
        id: 2
    }

    const openEditCardModal = () => {
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
