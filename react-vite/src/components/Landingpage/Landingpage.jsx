import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Landingpage.css";
import { publicBoardsThunk, myBoardsThunk } from "../../redux/board";
import BoardTile from "./BoardTile";
import SidePanel from "../SidePanel";
import CreateBoardModal from "../CreateBoardModal";

function Landingpage() {
  const dispatch = useDispatch();
  const publicBoards = useSelector((state) => state.boards.publicBoards);
  const boards = useSelector((state) => state.boards);
  const myBoards = useSelector((state) => state.boards.myBoards);
  const sessionUser = useSelector((state) => state.session.user);
  const [ownedBoards, setOwnedBoards] = useState({});
  const [sharedBoards, setSharedBoards] = useState({});
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

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

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu, true);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);
  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };
  return (
    <div className="Side-Panel">
      <SidePanel />
      <div className="Landing-Page">
        <h4>YOUR BOARDS</h4>
        <div className="your-workspaces">
          {Object.values(ownedBoards).map((board) => {
            return <BoardTile board={board} />;
          })}
          <div onClick={toggleMenu} className="create-new-board">
            Create new Board
          </div>
          {showMenu && (
            <span ref={ulRef}>
              <CreateBoardModal />
            </span>
          )}
        </div>
        <h4>SHARED BOARDS</h4>
        <div className="guest-workspaces"></div>
      </div>
    </div>
  );
}

export default Landingpage;
