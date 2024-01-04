import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteBoardThunk } from "../../redux/board";
import { useNavigate, useParams } from "react-router-dom";
import "./DeleteBoardModal.css";

function DeleteBoardModal({ id }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const { id: boardId } = useParams();
  const confirmDelete = async () => {
    dispatch(deleteBoardThunk(id)).then(() => {
      if (id == boardId) navigate("/session/boards");
    });
    closeModal();
  };
  return (
    <div className="delete-board-modal">
      <h3>Delete Board?</h3>
      <p>Note: This cannot be undone</p>
      <div className="delete-yesno">
        <button id="delete-yes" onClick={confirmDelete}>
          Yes
        </button>
        <button onClick={closeModal}>No</button>
      </div>
    </div>
  );
}

export default DeleteBoardModal;
