const GET_PUBLIC_BOARDS = "board/public";
const GET_MY_BOARDS = "board/my";
const GET_BOARD_DETAILS = "board/details";
const ADD_BOARD = "board/add";
const EDIT_BOARD = "board/edit";
const DELETE_bOARD = "board/delete";

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

const initialState = { publicBoards: {}, myBoards: {}, boardDetails: {} };

function boardReducer(boards = initialState, action) {
  let newBoards = {};
  switch (action.type) {
    case GET_PUBLIC_BOARDS:
      newBoards = { ...boards };
      action.payload.forEach((board) => {
        newBoards.publicBoards[board.id] = board;
      });
      return newBoards;
    case GET_MY_BOARDS:
      newBoards = { ...boards };
      action.payload.forEach((board) => {
        newBoards.myBoards[board.id] = board;
      });
      return newBoards;
    default:
      return boards;
  }
}

export default boardReducer;
