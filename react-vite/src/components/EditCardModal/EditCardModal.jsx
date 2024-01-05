import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./EditCardModal.css";
import {
  deleteCardThunk,
  editCardThunk,
  getCardThunk,
} from "../../redux/cards";
import * as commentActions from "../../redux/comments";
import Comment from "../CommentComponent/CommentComponent";
import CreateComment from "../CreateCommentComponent/CreateCommentComponent";
import { boardDetailsThunk } from "../../redux/board";
import { useNavigate } from "react-router-dom";

function EditCardModal({ currCard }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const card = useSelector((state) => state.cards.Card);
  const board = useSelector((state) => state.boards.boardDetails);
  const boardId = currCard.boardId;
  const list = board[boardId].Lists.find((list) => list.id === currCard.listId);
  const comments = useSelector((state) => state.comments);
  const [nameBorderVisible, setNameBorderVisible] = useState(false);
  const [descriptionBorderVisible, setDescriptionBorderVisible] =
    useState(false);
  const [name, setName] = useState(card.name);
  const [description, setDescription] = useState(card.description);
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [deleteCounter, setDeleteCounter] = useState(0);

  useEffect(() => {
    dispatch(boardDetailsThunk(boardId));
  }, [deleteCounter]);

  // useEffect(() => {
  //     console.log(card, '-------card in use effect')
  //     console.log('----re render in getCard use effect triggered')
  //     dispatch(getCardThunk(card))
  // }, [card])

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const error = {};

    if (name.length === 0) error.name = "Name is required";
    if (name.length > 64) error.name = "Name must be less than 64 characters";

    setErrors(error);
  }, [name]);

  // useEffect(() => {
  //     dispatch(commentActions.getCommentsThunk(card.id))
  // }, [dispatch, counter])

  const onSubmit = async (e) => {
    e.preventDefault();

    if (errors.name) {
      setShowErrors(true);
    } else {
      const updatedCard = {
        name,
        description,
        id: card.id,
      };

      // const updatedCardRes = await

      dispatch(editCardThunk(updatedCard));
      closeModal();
      reset();

      // const newCardLoad = await updatedCardRes.json()
      // console.log(updatedCardRes, '-----updatedCardRes')
      // dispatch(getCardThunk(updatedCardRes.Card)).then(() => {
      //     closeModal()
      //     reset()
      // })
      // setDeleteCounter(deleteCounter + 1)
      // closeModal()
      // reset()
    }
  };

  const reset = () => {
    setNameBorderVisible(false);
    setName(card.title);
    setDescription(card.description);
    setDescriptionBorderVisible(false);
  };

  const showNameBorder = () => {
    setNameBorderVisible(!nameBorderVisible);
  };

  const showDescriptionBorder = () => {
    setDescriptionBorderVisible(!descriptionBorderVisible);
  };

  const descriptionText =
    description === "None" || !description
      ? "Add a more detailed description"
      : description;

  const placeholderText = description === "None" ? "" : description;

  const deleteCard = async () => {
    setDeleteCounter(deleteCounter + 1);
    await dispatch(deleteCardThunk(currCard));
    closeModal();
  };

  if (!card) return <h1>loading...</h1>;

  return (
    <>
      <div className="edit-card-form">
        <div className="card-name-box">
          <div className="card-name-logo">
            <p>
              <i className="fa-sharp fa-regular fa-credit-card"></i>
            </p>
          </div>
          <div className="card-name-right">
            <input
              maxLength="64"
              onClick={showNameBorder}
              placeholder={card.name}
              id="card-name"
              className={
                showNameBorder
                  ? `card-name-border-visible`
                  : "card-name-border-hidden"
              }
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></input>
          </div>
          <div className="card-x" onClick={closeModal}>
            X
          </div>
        </div>
        <div className="card-description-box">
          <div className="card-description-logo">
            <p>
              <i class="fa-solid fa-bars-staggered"></i>
            </p>
          </div>
          <div className="card-description-text">
            <p id="card-description-p">Description</p>
            <textarea
              maxLength="1000"
              onClick={showDescriptionBorder}
              placeholder={descriptionText}
              id="card-description"
              className={
                showDescriptionBorder
                  ? `card-description-border-visible`
                  : "card-description-border-hidden"
              }
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={placeholderText}
            ></textarea>
          </div>
        </div>
        <div className="card-button-box">
          <button onClick={onSubmit}>Save</button>
          <button id="card-delete-button" onClick={deleteCard}>
            Delete
          </button>
        </div>

        <div className="comments-super-container">
          <div className="create-comment-super-container">
            <CreateComment cardId={card.id} />
          </div>
          <div className="comments box">
            <Comment
              cardId={card.id}
              counter={counter}
              setCounter={setCounter}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default EditCardModal;
