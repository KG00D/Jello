import "./BoardOptions.css";
import DeleteBoardModal from "../BoardDetails/DeleteBoardModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useState, useEffect } from "react";
import { editBoardThunk, boardDetailsThunk } from "../../redux/board";

function BoardOptions({ item }) {
  const { id: currBoardId } = useParams();
  const dispatch = useDispatch();
  const { id, is_public, background_image, name } = item;
  const { setModalContent } = useModal();
  const [boardOptions, setBoardOptions] = useState(true);

  const deleteBoard = (e) => {
    e.preventDefault();
    setBoardOptions(false);
    setModalContent(<DeleteBoardModal id={id} />);
  };
  const [isPublic, setIsPublic] = useState(is_public);
  const [previewColor, setPreviewColor] = useState(background_image);

  const updateBoard = async (e) => {
    const boardDetails = {
      id: id,
      name: name,
      is_public: isPublic,
      background_image: previewColor,
    };
    dispatch(editBoardThunk(boardDetails, id, currBoardId));
  };

  useEffect(() => {
    updateBoard();
  }, [previewColor, isPublic]);

  return (
    <>
      {boardOptions && (
        <div className="board-options">
          <ul>
            <h4>Board Options</h4>
            <h5>Background Color</h5>
            <div className="background-colors">
              <input
                className="radio-color"
                type="radio"
                id="#404747"
                name="color"
                value="#404747"
                onChange={(e) => setPreviewColor(e.target.value)}
                checked={previewColor === "#404747"}
              />
              <label
                className="radio-label"
                for="#404747"
                style={{ backgroundColor: "#404747" }}
              >
                {" "}
              </label>
              <br />
              <input
                className="radio-color"
                type="radio"
                id="#B3754F"
                name="color"
                value="#B3754F"
                checked={previewColor === "#B3754F"}
                onChange={(e) => setPreviewColor(e.target.value)}
              />
              <label
                className="radio-label"
                for="#B3754F"
                style={{ backgroundColor: "#B3754F" }}
              >
                {" "}
              </label>
              <br />
              <input
                className="radio-color"
                type="radio"
                id="#25999E"
                name="color"
                value="#25999E"
                onChange={(e) => setPreviewColor(e.target.value)}
                checked={previewColor === "#25999E"}
              />
              <label
                className="radio-label"
                for="#25999E"
                style={{ backgroundColor: "#25999E" }}
              >
                {" "}
              </label>
              <br />
              <input
                className="radio-color"
                type="radio"
                id="#F07222"
                name="color"
                value="#F07222"
                checked={previewColor === "#F07222"}
                onChange={(e) => setPreviewColor(e.target.value)}
              />
              <label
                className="radio-label"
                for="#F07222"
                style={{ backgroundColor: "#F07222" }}
              >
                {" "}
              </label>
            </div>
            <h5>Visibility</h5>
            <select
              onChange={(e) => setIsPublic(e.target.value)}
              value={isPublic}
            >
              <option value={false} selected={String(isPublic) === "false"}>
                Private
              </option>
              <option value={true} selected={String(isPublic) === "true"}>
                Public
              </option>
            </select>
            <button className="delete-board" onClick={deleteBoard}>
              Delete Board
            </button>
          </ul>
        </div>
      )}
    </>
  );
}

export default BoardOptions;
