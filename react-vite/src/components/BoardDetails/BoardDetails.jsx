import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { boardDetailsThunk, editBoardThunk } from "../../redux/board";
import { deleteListThunk , updateListTitleThunk } from '../../redux/lists';
import DeleteBoardModal from "./DeleteBoardModal";
import ListEditModal from "../ListEditModal";
import "./BoardDetails.css";

function BoardDetails() {
  const { setModalContent } = useModal();
  const dispatch = useDispatch();
  const { id } = useParams();
  const boardDetails = useSelector((state) => state.boards.boardDetails[id]);
  const [boardName, setBoardName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");

  const [editingListId, setEditingListId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  useEffect(() => {
    dispatch(boardDetailsThunk(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!boardDetails) return;
    setBoardName(boardDetails.name);
    setIsPublic(boardDetails.is_public);
    setBackgroundImage(boardDetails.background_image);
  }, [boardDetails]);

  if (!boardDetails) return <div>Loading...</div>;

  const deleteBoard = async (e) => {
    e.preventDefault();
    setModalContent(<DeleteBoardModal id={id} />);
  };

  const updateTitle = async (e) => {
    const boardDetails = {
      name: boardName,
      is_public: isPublic,
      background_image: backgroundImage,
    };
    dispatch(editBoardThunk(boardDetails, id));
  };
  
  const handleDeleteList = async (listId) => {
    try {
      await dispatch(deleteListThunk(id, listId));
      dispatch(boardDetailsThunk(id));
    } catch (error) {
      console.error("Failed to delete list:", error);
    }
  };
  

  const handleEditListTitle = (list) => {
    setEditingListId(list.id);
    setEditingTitle(list.title);
  };

  const handleSaveTitle = async (listId) => {
    try {
      if (editingTitle !== "") {
        await dispatch(updateListTitleThunk(id, listId, editingTitle));
        setEditingTitle(""); 
        dispatch(boardDetailsThunk(id)); 
      }
    } catch (error) {
      console.error("Failed to save title:", error);
    } finally {
      setEditingListId(null);
    }
  };
  

  const handleTitleChange = (e) => {
    setEditingTitle(e.target.value);
    dispatch(boardDetailsThunk(id)); 
  };
  
  return (
    <div className="board-details" style={{ backgroundColor: backgroundImage }}>
      <h4>
        Board Name:{" "}
        <input
          className="live-board-title"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          onBlur={updateTitle}
        />
      </h4>

      <div className="lists-container">
        {Object.values(boardDetails.Lists || {}).map((list) => (
          <div className="list-container" key={list.id}>
            {editingListId === list.id ? (
              <input
                type="text"
                value={editingTitle}
                onChange={handleTitleChange}
                onBlur={() => handleSaveTitle(list.id)}
                autoFocus
                className="edit-list-title-input"
              />
            ) : (
              <h4 onClick={() => 
               handleEditListTitle(list)
              }>
                List: {list.title}
              </h4>
            )}
            {list.Cards &&
              Object.values(list.Cards).map((card) => (
                <div key={card.id}>
                  <h5>Card Name: {card.name}</h5>
                  <p>Card Description: {card.description}</p>
                </div>
              ))}
            <button onClick={() => handleDeleteList(list.id)}>Delete List</button>
          </div>
        ))}
      </div>
      
      <div className="modal-container">
        <ListEditModal boardId={id} />
      </div>
      <button className="delete-board" onClick={deleteBoard}>
        Delete Board
      </button>
    </div>
  );
}

export default BoardDetails;
