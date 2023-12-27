import React, { useState } from 'react';
import { useModal } from "../../context/Modal";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addList } from "../../redux/lists";

function ListEditModal({ boardId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  console.log("Board ID : ", boardId)
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
        <button onClick={() => setIsAdding(true)}>Add another list</button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter List Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength="50"
          />
          <button onClick={handleSubmit}>Add List</button>
        </>
      )}
    </div>
  );
}

export default ListEditModal;
