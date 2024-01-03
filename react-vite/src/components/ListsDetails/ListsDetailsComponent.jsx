import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLists } from "../../redux/actionTypes";
import './ListDetails.css';

const ListDetails = ({ boardId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const lists = useSelector((state) => state.lists);


  useEffect(() => {
    dispatch(getLists(boardId)).then(() => setLoading(false));
  }, [dispatch, boardId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="board">
      {lists.map((list) => (
        <div key={list.id} className="list">
          <h3 className="list-title">{list.title}</h3>
          <div className="list-cards">
            {list.cards.map((card) => (
              <div key={card.id} className="card">
                {card.content}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListDetails;
