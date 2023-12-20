import { GET_CARD, GET_CARDS, ADD_CARD, EDIT_CARD, DELETE_CARD, CARD_ERROR } from './actionTypes';

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
    console.log('in getCardsThunk, frontend')
    const res = await fetch(`/api/lists/${listId}/cards`)
    console.log('in get cards thunk after fetch, frontend')
    if (res.ok) {
        const cards = await res.json()
        console.log(cards, '----cards in getCard thunk after res.ok')
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


export const addCardThunk = (data) => async (dispatch) => {
   const { listId, card } = data
   const fetchObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(card) 
   }
   const res = await fetch(`/api/lists/${listId}/cards`, fetchObj)

   if (res.ok) {
    const newCard = await res.json()
    if (newCard.message) {
        dispatch(cardError(newCard))
        return newCard.message
    }
    dispatch(getCardsThunk(listId))
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
            dispatch(getCard(updatedCard))
            return updatedCard
        }
   } else {
    const error = await res.json()
    return error
   }
}

export const deleteCardThunk = (cardId) => async (dispatch) => {
    const fetchObj = {
        method: "DELETE",
   } 
   const res = await fetch(`/api/cards/${cardId}`, fetchObj)

   if (res.ok) {
        const message = await res.json()
        console.log(message)
        if (message.message === "Card does not exist") {
            dispatch(cardError(message))
        } else {
            dispatch(deleteCard(message))
        }
        return message
   } else {
        const error = await res.json()
        dispatch(cardError(error))
        return error
   }
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
            let cardState = { Cards: action.payload.Cards}
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