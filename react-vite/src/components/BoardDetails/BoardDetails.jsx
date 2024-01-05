import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { boardDetailsThunk, editBoardThunk } from "../../redux/board";
import { deleteListThunk, updateListTitleThunk } from "../../redux/lists";
import AddCard from "../AddCardComponent/AddCard";
import Cards from "../CardsComponent/CardsComponent";
import ListEditModal from "../ListEditModal";
import SidePanel from "../SidePanel";
import DeleteBoardModal from "./DeleteBoardModal";
import { useNavigate } from "react-router-dom";

import "./BoardDetails.css";

function BoardDetails() {
  const navigate = useNavigate();
  const { setModalContent } = useModal();
  const dispatch = useDispatch();
  const { id } = useParams();
  const dropdownRef = useRef(null);
  const card = useSelector((state) => state.cards.Card);

  const boardDetails = useSelector((state) => state.boards.boardDetails[id]);
  const user = useSelector((state) => state.session.user);
  const boards = useSelector((state) => state.boards);
  const [boardName, setBoardName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");

  const [editingListId, setEditingListId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    dispatch(boardDetailsThunk(id));

    if (!boards.myBoards[id]) {
      navigate("/session/boards");
    }
  }, [dispatch, id, card]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  if (String(boardDetails.user_id) !== String(user.id)) {
    navigate("/session/boards");
  }

  const updateTitle = async (e) => {
    if (boardName) {
      const boardDetails = {
        name: boardName,
        is_public: isPublic,
        background_image: backgroundImage,
      };
      dispatch(editBoardThunk(boardDetails, id));
    } else {
      const boardDetails = {
        name: "New Board",
        is_public: isPublic,
        background_image: backgroundImage,
      };
      dispatch(editBoardThunk(boardDetails, id));
      setBoardName("New Board");
    }
  };

  const handleDeleteList = async (listId) => {
    try {
      await dispatch(deleteListThunk(id, listId));
      dispatch(boardDetailsThunk(id));
    } catch (error) {}
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
            maxlength="50"
            minlength="1"
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
                <div className="lists-dropdown-menu" ref={dropdownRef}>
                  <button
                    className="delete-list-button"
                    onClick={() => handleDeleteList(list.id)}
                  >
                    Delete List
                  </button>
                  <button
                    className="edit-list-title-button"
                    onClick={() => handleEditListTitle(list)}
                  >
                    Edit List Title
                  </button>
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
                <h4 className="lists-title">{list.title}</h4>
              )}
              {list.Cards &&
                Object.values(list.Cards).map((card) => {
                  let currCard = {
                    ...card,
                    boardId: id,
                    listId: list.id,
                  };
                  return (
                    <div key={card.id}>
                      <Cards currCard={currCard} />
                    </div>
                  );
                })}
              <AddCard list={list} />
            </div>
          ))}
          <div className="add-list-modal">
            <ListEditModal className="add-list-modal" boardId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoardDetails;
