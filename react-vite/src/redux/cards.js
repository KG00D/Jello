import { csrfFetch } from './csrf';
import { GET_CARDS, ADD_CARD, EDIT_CARD, DELETE_CARD } from './actionTypes';

export const getCards = (listId) => async (dispatch) => {
    const res = await csrfFetch(`/api/${listId}/cards`)
    if (res.ok) {
        const cards = await res.json()
        dispatch( { type: GET_CARDS, cards} )
    } else {
        return { 'error': 'failed to fetch cards'}
    }
}