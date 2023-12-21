const GET_PUBLIC_BOARDS = "board/public";
const GET_MY_BOARDS = "board/my";
const GET_BOARD_DETAILS = "board/details";
const ADD_BOARD = "board/add";
const EDIT_BOARD = "board/edit";
const DELETE_BOARD = "board/delete";
import { ADD_LIST } from "./actionTypes";


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
            Lists: boards.boardDetails[boardId] && boards.boardDetails[boardId].Lists
              ? [...boards.boardDetails[boardId].Lists, list]
              : [list]  
          }
        }
      };
    

    default:
      return boards;
  }
}

export default boardReducer;
