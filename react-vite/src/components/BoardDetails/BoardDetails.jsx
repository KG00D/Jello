import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { boardDetailsThunk } from "../../redux/board";
import "./BoardDetails.css";

function BoardDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const boardDetails = useSelector((state) => state.boards.boardDetails[id]);

  useEffect(() => {
    dispatch(boardDetailsThunk(id));
  }, [dispatch]);

  if (!boardDetails) return <div></div>;

  const { name, background_image, Lists } = boardDetails;
  console.log("-->", Lists);
  return (
    <div
      className="board-details"
      style={{ backgroundColor: background_image }}
    >
      <h4>Board Name: {name}</h4>
      {Object.values(Lists).map((list) => {
        return (
          <>
            <h4>List: {list.title}</h4>
            {Object.values(list.Cards).map((card) => {
              return (
                <>
                  <h5>Card Name: {card.name}</h5>
                  <p>Card Description: {card.description}</p>
                </>
              );
            })}
          </>
        );
      })}
    </div>
  );
}

export default BoardDetails;
