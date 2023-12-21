import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteBoardThunk } from "../../redux/board";
import { useNavigate } from "react-router-dom";
import "./DeleteBoardModal.css";

function DeleteBoardModal({ id }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const confirmDelete = async () => {
    dispatch(deleteBoardThunk(id)).then(() => navigate("/session/boards"));
    closeModal();
  };
  return (
    <div className="delete-board-modal">
      <h4>Delete Board?</h4>
      <button onClick={confirmDelete}>Yes</button>
      <button onClick={closeModal}>No</button>
    </div>
  );
}

export default DeleteBoardModal;
