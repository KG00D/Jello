import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLists, addList } from './redux/actionTypes'; 

const Lists = ({ boardId }) => {
  const dispatch = useDispatch();
  const lists = useSelector(state => state.lists); 
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    dispatch(getLists(boardId));
  }, [dispatch, boardId]);

  const handleAddList = () => {
    if (newTitle) {
      dispatch(addList(boardId, newTitle));
      setNewTitle('');
    }
  };

  return (
    <div>
      <h2>Lists</h2>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="New List Title"
      />
      <button onClick={handleAddList}>Add List</button>

      <div>
        {lists && lists.map(list => (
          <div key={list.id}>
            <h3>{list.title}</h3>
            {/* placeholder for other stuff*/}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lists;
