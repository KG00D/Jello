import { useModal } from "../../context/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./CreateBoardModal.css";

function CreateBoardModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [previewColor, setPreviewColor] = useState("lightgrey");
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="create-board">
      <h4>Create board</h4>
      <div className="preview-board" style={{ backgroundColor: previewColor }}>
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
      <select onChange={(e) => setIsPublic(e.target.value)} value={isPublic}>
        <option value={false}>Private</option>
        <option value={true}>Public</option>
      </select>

      <form onSubmit={handleSubmit}></form>
    </div>
  );
}

export default CreateBoardModal;
