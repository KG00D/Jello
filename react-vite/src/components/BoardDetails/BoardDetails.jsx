import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { boardDetailsThunk, deleteBoardThunk } from "../../redux/board";
import DeleteBoardModal from "./DeleteBoardModal";
import "./BoardDetails.css";

function BoardDetails() {
  const { setModalContent } = useModal();
  const dispatch = useDispatch();
  const { id } = useParams();
  const boardDetails = useSelector((state) => state.boards.boardDetails[id]);
  const [boardName, setBoardName] = useState("");

  useEffect(() => {
    dispatch(boardDetailsThunk(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!boardDetails) return;
    setBoardName(boardDetails.name);
  }, [boardDetails]);

  if (!boardDetails) return <div></div>;

  const deleteBoard = async (e) => {
    e.preventDefault();
    setModalContent(<DeleteBoardModal id={id} />);
  };

  const updateTitle = async (e) => {
    //add update board title thunk
    console.log("updated");
  };

  const { name, background_image } = boardDetails;

  let Lists = {};
  if (boardDetails.Lists) Lists = { ...boardDetails.Lists };
  return (
    <div
      className="board-details"
      style={{ backgroundColor: background_image }}
    >
      <h4>
        Board Name:{" "}
        <input
          className="live-board-title"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          onBlur={(e) => updateTitle()}
        />
      </h4>
      {Object.values(Lists).map((list) => {
        return (
          <>
            <h4>List: {list.title}</h4>
            {Object.values(list.Cards).map((card) => {
              return (
                <>
                  <h5>Card Name: {card.name}</h5>
                  <p>Card Description: {card.description}</p>
                </>
              );
            })}
          </>
        );
      })}
      <button className="delete-board" onClick={deleteBoard}>
        Delete Board
      </button>
    </div>
  );
}

export default BoardDetails;
