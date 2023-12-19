import { GET_CARDS, ADD_CARD, EDIT_CARD, DELETE_CARD } from './actionTypes';

const getCards = (cards) => {
    return {
        type: GET_CARDS,
        payload: cards
    }
}

const addCard = (card) => {
    return {
        type: ADD_CARD,
        payload: card
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
        return newCard.message
    }
    dispatch(getCardsThunk(listId))
    return newCard
   } else {
    const error = res.json()
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
        default:
            return cards
    }
}

export default cardReducer