import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ListCreateModal from "../ListCreateModal";
import { boardDetailsThunk } from "../../redux/board";
import "./BoardDetails.css";

function BoardDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const boardDetails = useSelector((state) => state.boards.boardDetails[id]);

  useEffect(() => {
    dispatch(boardDetailsThunk(id));
  }, [dispatch, id]);

  if (!boardDetails) return <div></div>;

  const { name, background_image } = boardDetails;
  let Lists = {};
  if (boardDetails.Lists) Lists = { ...boardDetails.Lists };
  return (
    <div className="board-details" style={{ backgroundColor: background_image }}>
      <h4>Board Name: {name}</h4>
      <div className='lists-container'>
        {Object.values(Lists).map((list) => (
          <div className="list-container"> 
            <h4>List: {list.title}</h4>
            {list.Cards && Object.values(list.Cards).map((card) => ( // Check if Cards exist
              <div key={card.id}> {/* Add a key prop here */}
                <h5>Card Name: {card.name}</h5>
                <p>Card Description: {card.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="modal-container">
        <ListCreateModal boardId={id}/>
      </div>
    </div>
    );
  }
  

export default BoardDetails;
