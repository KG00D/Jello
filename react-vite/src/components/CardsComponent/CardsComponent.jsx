import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCardsThunk, addCardThunk, editCardThunk, deleteCardThunk, getCardThunk } from '../../redux/cards';
import { getCommentsThunk } from '../../redux/comments';
import { useModal } from '../../context/Modal';
import EditCardModal from '../EditCardModal/EditCardModal';
import OpenModalCardEdit from './OpenModalCardEdit';

const Cards = ({ card }) => {
    const dispatch = useDispatch()
    const comments = useSelector((state) => state.comments)

    const cardPlaceholder = {
        name: 'Hat',
        id: 11,
        description: 'we have a hat',
        listId: 1,
        
    }

    const commentsPlaceholder = {
        1: {
            comment: 'we have a comment'
        }
    }

    //change cardPlaceholder to card!!!
    useEffect(() => {
     dispatch(getCommentsThunk(card ? card.id : cardPlaceholder.id))   
    }, [dispatch])

    const currentCard = card ? card : cardPlaceholder

    let commentText;

    if (Object.keys(commentsPlaceholder).length) {
        commentText = <span><i class="fa-regular fa-comment"></i> {Object.keys(commentsPlaceholder).length}</span>
    } else {
        commentText = null
    }

    console.log(currentCard)
    
    const openEditCardModal = () => {
        dispatch(getCardThunk(currentCard))
        return <EditCardModal />
    }


    return (
        <>
            <div>
                <OpenModalCardEdit modalComponent={openEditCardModal} itemText={card ? card.name : cardPlaceholder.name}/>
                {commentText && <OpenModalCardEdit modalComponent={openEditCardModal} itemText={commentText}/>}
            </div>
        </>
    )
}

export default Cards
