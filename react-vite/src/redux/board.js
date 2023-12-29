const GET_PUBLIC_BOARDS = "board/public";
const GET_MY_BOARDS = "board/my";
const GET_BOARD_DETAILS = "board/details";
const ADD_BOARD = "board/add";
const EDIT_BOARD = "board/edit";
const DELETE_BOARD = "board/delete";
// const UPDATE_LIST_ORDER = "board/updateListOrder";
import { ADD_LIST, EDIT_LIST, EDIT_LIST_ORDER } from "./actionTypes";

const publicBoards = (publicBoards) => {
  return {
    type: GET_PUBLIC_BOARDS,
    payload: publicBoards,
  };
};

const myBoards = (myBoards) => {
  return {
    type: GET_MY_BOARDS,
    payload: myBoards,
  };
};

const boardDetails = (boardDetails) => {
  return {
    type: GET_BOARD_DETAILS,
    payload: boardDetails,
  };
};

// const addBoard = (newBoard) => {
//   return {
//     type: ADD_BOARD,
//     payload: newBoard,
//   };
// };

const deleteBoard = (boardId) => {
  return {
    type: DELETE_BOARD,
    payload: boardId,
  };
};

const editBoard = (boardDetails) => {
  return {
    type: EDIT_BOARD,
    payload: boardDetails,
  };
};

// const updateListOrder = (boardId, newLists) => {
//   return {
//     type: UPDATE_LIST_ORDER,
//     payload: { boardId, newLists },
//   };
// };

export const publicBoardsThunk = () => async (dispatch) => {
  const response = await fetch("/api/boards");

  if (response.ok) {
    const data = await response.json();
    dispatch(publicBoards(data.Public_Boards));
    return data;
  } else {
    const error = await response.json();
    return error;
  }
};

export const myBoardsThunk = () => async (dispatch) => {
  const response = await fetch("/api/boards/session");

  if (response.ok) {
    const data = await response.json();
    dispatch(myBoards(data.My_Boards));
    return data;
  } else {
    const error = await response.json();
    return error;
  }
};

export const boardDetailsThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/boards/${id}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(boardDetails(data.Board_Details));
    return data;
  } else {
    const error = await response.json();
    return error;
  }
};

export const newBoardThunk = (newBoard) => async (dispatch) => {
  const response = await fetch("/api/boards/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newBoard),
  });

  if (response.ok) {
    const data = await response.json();
    return data.id;
  } else {
    const error = await response.json();
    return error;
  }
};

export const deleteBoardThunk = (boardId) => async (dispatch) => {
  const response = await fetch(`/api/boards/${boardId}`, { method: "DELETE" });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const error = await response.json();
    return error;
  }
};

export const editBoardThunk = (boardDetails, id) => async (dispatch) => {
  const response = await fetch(`/api/boards/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(boardDetails),
  });

  if (response.ok) {
    const data = await response.json();
    return data.id;
  } else {
    const error = await response.json();
    return error;
  }
};

// export const updateListOrderThunk = (boardId, newLists) => async (dispatch) => {
//   const response = await csrfFetch(`/api/boards/${boardId}/lists/reorder`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ lists: newLists }),
//   });

//   if (response.ok) {
//     const updatedList = await response.json();
//     console.log("Dispatching EDIT_LIST_ORDER with:", updatedList);
//     // dispatch(updateListOrder(boardId, newLists));
//     dispatch({ type: EDIT_LIST_ORDER, payload: { boardId, updatedLists: updatedList } });
//   } else {
//     const error = await response.json();
//     console.error("Failed to update list order:", error);
//   }
// };

export const updateListOrderThunk = (boardId, newOrder) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/boards/${boardId}/lists/reorder`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ new_order: newOrder })
    });

    if (response.ok) {
    const updatedList = await response.json();
    console.log("Dispatching EDIT_LIST_ORDER with:", updatedList);
//     // dispatch(updateListOrder(boardId, newLists));
    dispatch({ type: EDIT_LIST_ORDER, payload: { boardId, updatedLists: updatedList } });
    } else {
      // Log error details
      const error = await response.text();
      console.error('Error response body:', error);
      dispatch({ type: LISTS_ERROR, error: 'Failed to update list order' });
    }
  } catch (error) {
    console.error('Catch error:', error);
    dispatch({ type: LISTS_ERROR, error });
  }
};




const initialState = { publicBoards: {}, myBoards: {}, boardDetails: {} };

function boardReducer(boards = initialState, action) {
  let newBoards = {};
  switch (action.type) {
    case GET_PUBLIC_BOARDS:
      newBoards = { ...boards };
      newBoards.publicBoards = {};
      action.payload.forEach((board) => {
        newBoards.publicBoards[board.id] = board;
      });
      return newBoards;
    case GET_MY_BOARDS:
      newBoards = { ...boards };
      newBoards.myBoards = {};
      action.payload.forEach((board) => {
        newBoards.myBoards[board.id] = board;
      });
      return newBoards;
    case GET_BOARD_DETAILS:
      newBoards = { ...boards };
      newBoards.boardDetails = {};
      newBoards.boardDetails[action.payload.id] = action.payload;

      return newBoards;

    case DELETE_BOARD:
      newBoards = { ...boards };
      delete newBoards.myBoards[action.payload];
      return newBoards;

    case ADD_LIST:

      const { boardId, list } = action.payload;
      return {
        ...boards,
        boardDetails: {
          ...boards.boardDetails,
          [boardId]: {
            ...boards.boardDetails[boardId],
            Lists:
              boards.boardDetails[boardId] && boards.boardDetails[boardId].Lists
                ? [...boards.boardDetails[boardId].Lists, list]
                : [list],
          },
        },
      };

      case EDIT_LIST: {
        const updatedList = action.payload; 
        newBoards = { ...boards };
        const boardToUpdate = newBoards.boardDetails[updatedList.board_id];
        if (boardToUpdate && boardToUpdate.Lists) {
          const listIndex = boardToUpdate.Lists.findIndex(list => list.id === updatedList.id);
          if (listIndex !== -1) {
            boardToUpdate.Lists = [
              ...boardToUpdate.Lists.slice(0, listIndex),
              updatedList,
              ...boardToUpdate.Lists.slice(listIndex + 1),
            ];
          }
        }
        return newBoards;
      }
  
      case EDIT_LIST_ORDER: {
        const { boardId, updatedLists } = action.payload;
        console.log("Updated lists in reducer:", updatedLists);

        return {
          ...boards,
          boardDetails: {
            ...boards.boardDetails,
            [boardId]: {
              ...boards.boardDetails[boardId],
              Lists: updatedLists
            }

          }
        };
      }

      case EDIT_BOARD:
      newBoards = { ...boards };
      const { id, name, is_public, background_image } = action.payload;
      console.log(id, name, is_public, background_image, 'THIS IS THE BOARD EDIT DETAILS')
      newBoards.boardDetails[id].name = name;
      newBoards.boardDetails[id].is_public = is_public;
      newBoards.boardDetails[id].background_image = background_image;
      return newBoards;

    default:
      return boards;
  }
}

export default boardReducer;
