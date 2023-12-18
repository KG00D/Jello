import { useModal } from "../../context/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./CreateBoardModal.css";

function CreateBoardModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="create-board">
      <h4>Create board</h4>
      <label>Background Image</label><br/>
      <input className="radio-color" type="radio" id = "red" name="color" value="red"/>
      <label for="red">Red</label><br/>
      <input className="radio-color" type="radio" id = "blue" name="color" value="blue"/>
      <label for="blue">Blue</label><br/>
      <input className="radio-color" type="radio" id="green" name="color" value="green"/>
      <label for="green">Green</label><br/>
      <label>
        Board Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Visibility
        <select onChange={(e) => setIsPublic(e.target.value)} value={isPublic}>
          <option value={false}>Private</option>
          <option value={true}>Public</option>
        </select>
      </label>

      <form onSubmit={handleSubmit}></form>
    </div>
  );
}

export default CreateBoardModal;
