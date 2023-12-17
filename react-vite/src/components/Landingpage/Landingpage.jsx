import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./Landingpage.css";
import { publicBoardsThunk, myBoardsThunk } from "../../redux/board";
import BoardTile from "./BoardTile";

function Landingpage() {
  //Boards disappear after refresh. only appears when code is changed
  const dispatch = useDispatch();
  const publicBoards = useSelector((state) => state.boards.publicBoards);
  const myBoards = useSelector((state) => state.boards.myBoards);
  const sessionUser = useSelector((state) => state.session.user);
  const [ownedBoards, setOwnedBoards] = useState({});
  const [sharedBoards, setSharedBoards] = useState({});

  useEffect(() => {
    dispatch(publicBoardsThunk());
    dispatch(myBoardsThunk());
  }, [dispatch]);

  useEffect(() => {
    let tempOwnedBoards = {};
    let tempSharedBoards = {};
    for (let key in myBoards) {
      if (sessionUser.id === myBoards[key].user_id) {
        tempOwnedBoards[key] = myBoards[key];
      } else {
        tempSharedBoards[key] = myBoards[key];
      }
    }
    setOwnedBoards(tempOwnedBoards);
    setSharedBoards(tempSharedBoards);
  }, [myBoards]);
  console.log("owned-->", ownedBoards);
  console.log("myboards-->", myBoards);
  return (
    <div className="Landing-Page">
      <h4>YOUR WORKSPACES</h4>
      <div className="your-workspaces">
        {Object.values(ownedBoards).map((board) => {
          return <BoardTile board={board} />;
        })}
      </div>
      <h4>GUEST WORKSPACES</h4>
      <div className="guest-workspaces"></div>
    </div>
  );
}

export default Landingpage;
