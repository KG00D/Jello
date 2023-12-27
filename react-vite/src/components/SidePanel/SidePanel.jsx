import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SidePanel.css";
import SideItem from "./SideItem";
import { publicBoardsThunk, myBoardsThunk } from "../../redux/board";

function SidePanel() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const myBoards = useSelector((state) => state.boards.myBoards);
  const publicBoards = useSelector((state) => state.boards.publicBoards);
  const [ownedBoards, setOwnedBoards] = useState({});
  const [sharedBoards, setSharedBoards] = useState({});
  const [ownedBoardsMenu, setOwnedBoardsMenu] = useState(true);
  const [sharedBoardsMenu, setSharedBoardsMenu] = useState(true);

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

  const toggleOwnedMenu = (e) => {
    e.stopPropagation();
    setOwnedBoardsMenu(!ownedBoardsMenu);
  };

  const toggleSharedMenu = (e) => {
    e.stopPropagation();
    setSharedBoardsMenu(!sharedBoardsMenu);
  };

  return (
    <div className="side-panel-component">
      <ul>
        <h4 className="toggle-menu" onClick={toggleOwnedMenu}>
          <span>
            <i class="fa-solid fa-user fa"></i> Your Boards
          </span>
          {ownedBoardsMenu ? (
            <i class="fa-solid fa-angle-up"></i>
          ) : (
            <i class="fa-solid fa-angle-down"></i>
          )}
        </h4>
        {ownedBoardsMenu &&
          Object.values(ownedBoards).map((item) => <SideItem item={item} />)}
      </ul>
      <ul>
        <h4 className="toggle-menu" onClick={toggleSharedMenu}>
          <span>
            <i class="fa-solid fa-users fa-2xs"></i>Shared Boards
          </span>
          {sharedBoardsMenu ? (
            <i class="fa-solid fa-angle-up"></i>
          ) : (
            <i class="fa-solid fa-angle-down"></i>
          )}
        </h4>
        {sharedBoardsMenu &&
          Object.values(sharedBoards).map((item) => <SideItem item={item} />)}
      </ul>
    </div>
  );
}

export default SidePanel;
