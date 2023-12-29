import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Landingpage.css";
import { publicBoardsThunk, myBoardsThunk } from "../../redux/board";
import BoardTile from "./BoardTile";
import SidePanel from "../SidePanel";

function Landingpage() {
  //Boards disappear after refresh. only appears when code is changed
  const dispatch = useDispatch();
  const publicBoards = useSelector((state) => state.boards.publicBoards);
  const boards = useSelector((state) => state.boards);
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
  }, [myBoards, boards]);

  return (
    <div className="Side-Panel">
      <SidePanel />
      <div className="Landing-Page">
        <h4>YOUR BOARDS</h4>
        <div className="your-workspaces">
          {Object.values(ownedBoards).map((board) => {
            return <BoardTile board={board} />;
          })}
        </div>
        <h4>SHARED BOARDS</h4>
        <div className="guest-workspaces"></div>
      </div>
    </div>
  );
}

export default Landingpage;
