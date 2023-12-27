import "./BoardOptions.css";
import DeleteBoardModal from "../BoardDetails/DeleteBoardModal";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";

function BoardOptions({ boardId }) {
  const { setModalContent } = useModal();
  const deleteBoard = (e) => {
    e.preventDefault();
    setModalContent(<DeleteBoardModal id={boardId} />);
  };

  return (
    <div className="board-options">
      <ul>
        Options for: {boardId}
        <li>Background Color</li>
        <li>Visibility</li>
        <button className="delete-board" onClick={deleteBoard}>
          Delete Board
        </button>
      </ul>
    </div>
  );
}

export default BoardOptions;
