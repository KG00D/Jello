import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./CreateBoardModal.css";
import { newBoardThunk } from "../../redux/board";

function CreateBoardModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [previewColor, setPreviewColor] = useState("lightgrey");
  const [showForm, setShowForm] = useState(true);
  const sessionUser = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newBoard = {
      name: title,
      is_public: isPublic,
      background_image: previewColor,
      user_id: sessionUser.id,
    };
    const response = await dispatch(newBoardThunk(newBoard));
    navigate(`/boards/${response}`);
    setShowForm(false);
  };
  return (
    <>
      {showForm && (
        <form className="create-board" onSubmit={handleSubmit}>
          <h4>Create board</h4>
          <div
            className="preview-board"
            style={{ backgroundColor: previewColor }}
          >
            {""}
          </div>
          <div className="preview-1">{""}</div>
          <div className="preview-2">{""}</div>
          <div className="preview-3">{""}</div>
          <h5>Background Image</h5>
          <div className="background-colors">
            <input
              className="radio-color"
              type="radio"
              id="burlywood"
              name="color"
              value="burlywood"
              onChange={(e) => setPreviewColor(e.target.value)}
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
              onChange={(e) => setPreviewColor(e.target.value)}
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
              onChange={(e) => setPreviewColor(e.target.value)}
            />
            <label
              className="radio-label"
              for="lightsalmon"
              style={{ backgroundColor: "lightsalmon" }}
            >
              {" "}
            </label>
          </div>
          <h5>Board Title</h5>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxlength="50"
          />

          <h5>Visibility</h5>
          <select
            onChange={(e) => setIsPublic(e.target.value)}
            value={isPublic}
          >
            <option value={false}>Private</option>
            <option value={true}>Public</option>
          </select>
          <button type="submit" className="create-board-button">
            Create
          </button>
        </form>
      )}
    </>


  );
}

export default CreateBoardModal;
