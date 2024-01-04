import { useState } from 'react';
import { useModal } from "../../context/Modal";
import { useDispatch } from 'react-redux';
import { addList } from "../../redux/lists";

import './ListEditModal.css'


function ListEditModal({ boardId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [title, setTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addList(boardId, title));
      setTitle('');
      setIsAdding(false);
    }
  };

  return (
    <div className="create-list">
      {!isAdding ? (
        <button className="create-list-button" onClick={() => setIsAdding(true)}>Add another list</button>
      ) : (
        <>
        <div className='new-list-input-container'>
          <input
          className='new-list-input'
            type="text"
            placeholder="Enter list title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength="50"
          />
        <button className="create-list-add" onClick={handleSubmit}>Add List</button>


        </div>
        </>
      )}
    </div>
  );
}

export default ListEditModal;
