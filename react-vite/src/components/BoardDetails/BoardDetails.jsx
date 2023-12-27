import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { boardDetailsThunk, editBoardThunk } from "../../redux/board";
import ListCreateModal from "../ListCreateModal";
import SidePanel from "../SidePanel";

import "./BoardDetails.css";

function BoardDetails() {
  const { setModalContent } = useModal();
  const dispatch = useDispatch();
  const { id } = useParams();
  const boardDetails = useSelector((state) => state.boards.boardDetails[id]);
  const [boardName, setBoardName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    dispatch(boardDetailsThunk(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!boardDetails) return;
    setBoardName(boardDetails.name);
    setIsPublic(boardDetails.is_public);
    setBackgroundImage(boardDetails.background_image);
  }, [boardDetails]);

  if (!boardDetails)
    return (
      <div>
        <SidePanel />
      </div>
    );

  const updateTitle = async (e) => {
    console.log("update called---")
    const boardDetails = {
      name: boardName,
      is_public: isPublic,
      background_image: backgroundImage,
    };
    dispatch(editBoardThunk(boardDetails, id));
  };

  const { name, background_image } = boardDetails;

  let Lists = {};
  if (boardDetails.Lists) Lists = { ...boardDetails.Lists };
  return (
    <div className="Side-Panel">
      <SidePanel />
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
            onBlur={updateTitle}
          />
        </h4>
        <div className="lists-container">
          {Object.values(Lists).map((list) => (
            <div className="list-container">
              <h4>List: {list.title}</h4>
              {list.Cards &&
                Object.values(list.Cards).map(
                  (
                    card // Check if Cards exist
                  ) => (
                    <div key={card.id}>
                      {" "}
                      {/* Add a key prop here */}
                      <h5>Card Name: {card.name}</h5>
                      <p>Card Description: {card.description}</p>
                    </div>
                  )
                )}
            </div>
          ))}
        </div>
        <div className="modal-container">
          <ListCreateModal boardId={id} />
        </div>
      </div>
    </div>
  );
}

export default BoardDetails;
