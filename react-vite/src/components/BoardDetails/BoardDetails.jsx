import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { boardDetailsThunk, editBoardThunk } from "../../redux/board";
import { deleteListThunk, updateListTitleThunk } from "../../redux/lists"; // Add these imports
import DeleteBoardModal from "./DeleteBoardModal";
import ListEditModal from "../ListEditModal";
import SidePanel from "../SidePanel";
import AddCard from "../AddCardComponent/AddCard";
import Cards from "../CardsComponent/CardsComponent";

import "./BoardDetails.css";

function BoardDetails() {
  const { setModalContent } = useModal();
  const dispatch = useDispatch();
  const { id } = useParams();
  const boardDetails = useSelector((state) => state.boards.boardDetails[id]);
  const boards = useSelector((state) => state.boards);
  const [boardName, setBoardName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");

  const [editingListId, setEditingListId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    dispatch(boardDetailsThunk(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!boardDetails) return;
    setBoardName(boardDetails.name);
    setIsPublic(boardDetails.is_public);
    setBackgroundImage(boardDetails.background_image);
  }, [boardDetails]);

  if (!boardDetails)
    return (
      <div style={{ backgroundColor: "rgb(40, 40, 48)" }}>
        <SidePanel />
      </div>
    );

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

  const isMenuOpen = (listId) => {
    return openMenuId === listId;
  };

  const toggleMenu = (listId) => {
    if (openMenuId === listId) {
      setOpenMenuId(null);
    } else {
      setOpenMenuId(listId);
    }
  };

  const handleTitleChange = (e) => {
    setEditingTitle(e.target.value);
    dispatch(boardDetailsThunk(id));
  };

  const deleteBoard = async (e) => {
    e.preventDefault();
    setModalContent(<DeleteBoardModal id={id} />);
  };

  const { name, background_image } = boardDetails;

  let Lists = {};
  if (boardDetails.Lists) Lists = { ...boardDetails.Lists };

  return (
    <div className="Side-Panel">
      <SidePanel />
      <div
        className="board-details"
        style={{ backgroundColor: backgroundImage }}
      >
        <div className="board-details-header">
          <input
            className="live-board-title"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            onBlur={updateTitle}
          />
        </div>

        <div className="lists-container">
          {Object.values(boardDetails.Lists || {}).map((list) => (
            <div className="list-container" key={list.id}>
              <button
                className="menu-button"
                onClick={() => toggleMenu(list.id)}
              >
                ...
              </button>
              {/* Dropdown menu */}
              {isMenuOpen(list.id) && (
                <div className="lists-dropdown-menu">
                  <button
                    className="delete-list-button"
                    onClick={() => handleDeleteList(list.id)}
                  >
                    Delete List
                  </button>
                  {/* Add more menu items here if we want */}
                </div>
              )}

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
                <h4 onClick={() => handleEditListTitle(list)}>{list.title}</h4>
              )}

              {/* List Cards */}
              {list.Cards &&
                Object.values(list.Cards).map((card) => (
                  <div key={card.id}>
                    <Cards card={card} />
                  </div>
                ))}
              <AddCard list={list} />
            </div>
          ))}
        </div>
        <div className="modal-container">
          <ListEditModal boardId={id} /> {/* Assuming id is a prop or state */}
        </div>
      </div>
    </div>
  );
}

export default BoardDetails;
