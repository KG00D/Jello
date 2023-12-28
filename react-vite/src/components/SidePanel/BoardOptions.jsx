import "./BoardOptions.css";
import DeleteBoardModal from "../BoardDetails/DeleteBoardModal";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { editBoardThunk } from "../../redux/board";

function BoardOptions({ item }) {
  const dispatch = useDispatch();
  console.log("item------->}", item);
  const { id, is_public, background_image, name } = item;
  const { setModalContent } = useModal();
  const deleteBoard = (e) => {
    e.preventDefault();
    setModalContent(<DeleteBoardModal id={id} />);
  };
  const [isPublic, setIsPublic] = useState(is_public);
  const [previewColor, setPreviewColor] = useState(background_image);

  const updateBoard = async (e) => {
    console.log("preview color--->".name, isPublic, previewColor)
    const boardDetails = {
      id: id,
      name: name,
      is_public: isPublic,
      background_image: previewColor,
    };
    dispatch(editBoardThunk(boardDetails, id));
  };

  return (
    <div className="board-options">
      <ul>
        <h4>Board Options</h4>
        <h5>Background Color</h5>
        <div className="background-colors">
          <input
            className="radio-color"
            type="radio"
            id="burlywood"
            name="color"
            value="burlywood"
            checked={previewColor === "burlywood"}
            onChange={(e) => {
              setPreviewColor(e.target.value);
              updateBoard();
            }}
          />
          <label
            className="radio-label"
            for="burlywood"
            style={{ backgroundColor: "burlywood" }}
          >
            {" "}
          </label>
          <br />
          <input
            className="radio-color"
            type="radio"
            id="cadetblue"
            name="color"
            value="cadetblue"
            onChange={(e) => {
              setPreviewColor(e.target.value);
              updateBoard();
            }}
            checked={previewColor === "cadetblue"}
          />
          <label
            className="radio-label"
            for="cadetblue"
            style={{ backgroundColor: "cadetblue" }}
          >
            {" "}
          </label>
          <br />
          <input
            className="radio-color"
            type="radio"
            id="lightsalmon"
            name="color"
            value="lightsalmon"
            checked={previewColor === "lightsalmon"}
            onChange={(e) => {
              setPreviewColor(e.target.value);
              updateBoard();
            }}
          />
          <label
            className="radio-label"
            for="lightsalmon"
            style={{ backgroundColor: "lightsalmon" }}
          >
            {" "}
          </label>
        </div>
        <h5>Visibility</h5>
        <select onChange={(e) => setIsPublic(e.target.value)} value={isPublic}>
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
  );
}

export default BoardOptions;
