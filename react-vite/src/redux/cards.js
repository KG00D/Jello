import { GET_CARD, GET_CARDS, ADD_CARD, EDIT_CARD, DELETE_CARD, CARD_ERROR } from './actionTypes';
import { boardDetailsThunk } from './board';

const getCards = (cards) => {
    return {
        type: GET_CARDS,
        payload: cards
    }
}

const getCard = (card) => {
    return {
        type: GET_CARD,
        payload: card
    }
}

const cardError = (error) => {
    return {
        type: CARD_ERROR,
        payload: error
    }
}

const deleteCard = (message) => {
    return {
        type: DELETE_CARD,
        payload: message
    }
}

export const getCardsThunk = (listId) => async (dispatch) => {
    const res = await fetch(`/api/lists/${listId}/cards`)
    if (res.ok) {
        const cards = await res.json()
        if (!cards.Cards) {
            return undefined
        }
        dispatch(getCards(cards))
        return cards
    } else {
        const error = await res.json()
        return error
    }
}


export const addCardThunk = ({card, boardId}) => async (dispatch) => {
   const fetchObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(card)
   }
   const res = await fetch(`/api/lists/${card.list_id}/cards`, fetchObj)

   if (res.ok) {
    const newCard = await res.json()
    if (newCard.message) {
        dispatch(cardError(newCard))
        return newCard.message
    }
    dispatch(getCardsThunk(card.list_id))
    dispatch(boardDetailsThunk(boardId))
    return newCard
   } else {
    const error = res.json()
    return error
   }
}

export const editCardThunk = (card) => async (dispatch) => {
    const fetchObj = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(card)
   }

   const res = await fetch(`/api/cards/${card.id}`, fetchObj)

   if (res.ok) {
    const updatedCard = await res.json()
        if (updatedCard.message) {
            dispatch(cardError(updatedCard))
            return updatedCard
        } else {

            dispatch(getCard(updatedCard.Card))
            // dispatch(getCardThunk(card))
            return updatedCard
        }
   } else {
    const error = await res.json()
    return error
   }
}

export const deleteCardThunk = (currCard) => async (dispatch) => {
    const cardId = currCard.id
    const fetchObj = {
        method: "DELETE",
   }
   const res = await fetch(`/api/cards/${cardId}`, fetchObj)

   if (res.ok) {
        const message = await res.json()
        if (message.message === "Card does not exist") {
            dispatch(cardError(message))
        } else {
            dispatch(boardDetailsThunk(currCard.boardId))
        }
        return message
   } else {
        const error = await res.json()
        dispatch(cardError(error))
        return error
   }
}

export const getCardThunk = (card) => async (dispatch) => {
    dispatch(getCard(card))
    return card
}

const initialState = {
    Cards: {}
}

function cardReducer(cards = initialState, action) {
    switch (action.type) {
        case GET_CARDS:
            let newState = { Cards: action.payload.Cards }
            return newState;
        case GET_CARD:
            let cardState = { Card: action.payload}
            return cardState
        case CARD_ERROR:
            let errorState = { Error: action.payload}
            return errorState
        case DELETE_CARD:
            let messageState = { Deleted: action.payload}
            return messageState
        default:
            return cards
    }
}

export default cardReducer
