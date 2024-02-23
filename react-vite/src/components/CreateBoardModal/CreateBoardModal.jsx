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
  const [previewColor, setPreviewColor] = useState("#404747");
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
            style={{ background: previewColor }}
          >
            {""}
          </div>
          <div className="preview-1">{""}</div>
          <div className="preview-2">{""}</div>
          <div className="preview-3">{""}</div>

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
          <h5>Board Title</h5>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxlength="50"
            minlength="1"
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
