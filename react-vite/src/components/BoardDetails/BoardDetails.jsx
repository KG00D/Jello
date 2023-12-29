import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { boardDetailsThunk, editBoardThunk} from "../../redux/board";
import { deleteListThunk, updateListTitleThunk, updateListOrderThunk} from '../../redux/lists';
import DeleteBoardModal from "./DeleteBoardModal";
import ListEditModal from "../ListEditModal";
import "./BoardDetails.css";

function BoardDetails() {
  
  const { setModalContent } = useModal();
  const { id } = useParams();

  const dispatch = useDispatch();
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

  const deleteBoard = async () => {
    setModalContent(<DeleteBoardModal id={id} />);
  };

  const updateTitle = async () => {
    const updatedDetails = {
      name: boardName,
      is_public: isPublic,
      background_image: backgroundImage,
    };
    dispatch(editBoardThunk(updatedDetails, id));
  };

  const handleDeleteList = async (listId) => {
    console.log("Deleting list with id:", listId);
    await dispatch(deleteListThunk(id, listId));
    dispatch(boardDetailsThunk(id));
  };

  const handleEditListTitle = (list) => {
    console.log(list, 'THIS IS THE LIST')
    setEditingListId(list.id);
    setEditingTitle(list.title);
  };

  const handleSaveTitle = async (listId) => {
    if (editingTitle !== "") {
      await dispatch(updateListTitleThunk(id, listId, editingTitle));
      setEditingTitle(""); 
      dispatch(boardDetailsThunk(id));
    }
    setEditingListId(null);
  };

  const handleTitleChange = (e) => {
    setEditingTitle(e.target.value);
  };

  const onDragEnd = (result) => {
    const { source, destination, type } = result;
    // console.log(source, destination, type, 'NEW STATE LOGGED HERE')
  
    if (!destination) {
      return;
    }
  
    if (type === 'LIST') {
      const reorderedLists = Array.from(boardDetails.Lists);

      console.log(reorderedLists, 'REORDERED LISTS')

      const [reorderedItem] = reorderedLists.splice(source.index, 1);
      reorderedLists.splice(destination.index, 0, reorderedItem);
  
      const newOrderIds = reorderedLists.map(list => list.id);

      console.log(newOrderIds, 'NEW ORDER IDS');

      dispatch(updateListOrderThunk(id, newOrderIds));

    } else if (type === 'CARD') {
      // TODO: Cards for Alex
    }
  };

return (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="droppable" direction="horizontal" type="LIST">
      {(provided) => (
        <div 
          ref={provided.innerRef} 
          {...provided.droppableProps}
          className="board-details" 
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <h4>
            Board Name:
            <input
              className="live-board-title"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              onBlur={updateTitle}
            />
          </h4>

          {boardDetails.Lists && Object.values(boardDetails.Lists).map((list, index) => (
            <Draggable key={list.id} draggableId={`${list.id}`} index={index}>
              {(provided) => (
                <div 
                  ref={provided.innerRef} 
                  {...provided.draggableProps} 
                  {...provided.dragHandleProps}
                  className="list-container"
                >
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
                     <h4 onClick={() => handleEditListTitle(list)}>
                      List: {list.title}
                    </h4>
                  )}
                  <Droppable droppableId={`list-${list.id}`} type="CARD">
                    {(provided) => (
                      <div 
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="cards-container"
                      >
                        {list.Cards && list.Cards.map((card, index) => (
                          <Draggable key={card.id} draggableId={`card-${card.id}`} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="card"
                              >
                                <h5>Card Name: {card.name}</h5>
                                <p>Card Description: {card.description}</p>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  <button onClick={() => handleDeleteList(list.id)}>Delete List</button>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
    <div className="buttons-container">
      <div className="modal-container">
        <ListEditModal boardId={id} />
      </div>
      <button className="delete-board" onClick={deleteBoard}>
        Delete Board
      </button>
    </div>
  </DragDropContext>
    );
}

export default BoardDetails;