import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ListCreateModal from "../ListsCreateModal";
import { boardDetailsThunk } from "../../redux/board"; 
import { deleteList } from "../../redux/lists";
import "./BoardDetails.css";

function BoardDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const boardDetails = useSelector((state) => state.boards.boardDetails[id]);

  useEffect(() => {
    dispatch(boardDetailsThunk(id));
  }, [dispatch, id]);

  const handleDelete = (listId) => {
    dispatch(deleteList(id, listId)); 
    dispatch(boardDetailsThunk(id));
  };

  if (!boardDetails) return <div>Loading...</div>;

  const { name, background_image, Lists } = boardDetails;

  return (
    <div className="board-details" style={{ backgroundColor: background_image }}>
      <h4>Board Name: {name}</h4>
      <div className='lists-container'>
        {Lists && Object.values(Lists).map((list) => (
          <div key={list.id} className="list-container">
            <h4>List: {list.title}</h4>
            <button onClick={() => handleDelete(list.id)}>Delete List</button>
            {list.Cards && Object.values(list.Cards).map((card) => (
              <div key={card.id}>
                <h5>Card Name: {card.name}</h5>
                <p>Card Description: {card.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="modal-container">
        <ListCreateModal boardId={id} />
      </div>
    </div>
  );
}

export default BoardDetails;



