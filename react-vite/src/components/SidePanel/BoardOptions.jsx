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
                id='linear-gradient(to left top, #404747, #919e9e)'
                name="color"
                value='linear-gradient(to left top, #404747, #919e9e)'
                onChange={(e) => setPreviewColor(e.target.value)}
                checked={previewColor === 'linear-gradient(to left top, #404747, #919e9e)'}
              />
              <label
                className="radio-label"
                for='linear-gradient(to left top, #404747, #919e9e)'
                style={{ background: 'linear-gradient(to left top, #404747, #919e9e)' }}
              >
                {" "}
              </label>
              <br />
              <input
                className="radio-color"
                type="radio"
                id="linear-gradient(to left top, #70311f, #B3754F)"
                name="color"
                value="linear-gradient(to left top, #70311f, #B3754F)"
                checked={previewColor === "linear-gradient(to left top, #70311f, #B3754F)"}
                onChange={(e) => setPreviewColor(e.target.value)}
              />
              <label
                className="radio-label"
                for="linear-gradient(to left top, #70311f, #B3754F)"
                style={{ background: "linear-gradient(to left top, #70311f, #B3754F)" }}
              >
                {" "}
              </label>
              <br />
              <input
                className="radio-color"
                type="radio"
                id="linear-gradient(to left top, #203e6e, #25999E)"
                name="color"
                value="linear-gradient(to left top, #203e6e, #25999E)"
                onChange={(e) => setPreviewColor(e.target.value)}
                checked={previewColor === "linear-gradient(to left top, #203e6e, #25999E)"}
              />
              <label
                className="radio-label"
                for="linear-gradient(to left top, #203e6e, #25999E)"
                style={{ background: "linear-gradient(to left top, #203e6e, #25999E)" }}
              >
                {" "}
              </label>
              <br />
              <input
                className="radio-color"
                type="radio"
                id="linear-gradient(to left top, #450f0a, #F07222)"
                name="color"
                value="linear-gradient(to left top, #450f0a, #F07222)"
                checked={previewColor === "linear-gradient(to left top, #450f0a, #F07222)"}
                onChange={(e) => setPreviewColor(e.target.value)}
              />
              <label
                className="radio-label"
                for="linear-gradient(to left top, #450f0a, #F07222)"
                style={{ background: "linear-gradient(to left top, #450f0a, #F07222)" }}
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
