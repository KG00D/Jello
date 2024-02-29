import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "./SidePanel.css";
import SideItem from "./SideItem";
import { publicBoardsThunk, myBoardsThunk } from "../../redux/board";

function SidePanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const boards = useSelector((state) => state.boards);
  const myBoards = useSelector((state) => state.boards.myBoards);
  const publicBoards = useSelector((state) => state.boards.publicBoards);
  const [ownedBoards, setOwnedBoards] = useState({});
  const [sharedBoards, setSharedBoards] = useState({});
  const [ownedBoardsMenu, setOwnedBoardsMenu] = useState(true);
  const [sharedBoardsMenu, setSharedBoardsMenu] = useState(false);

  if (!sessionUser) {
    navigate("/");
  }

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
  }, [myBoards, publicBoards, id, boards]);

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
            <i className="fa-solid fa-user fa"></i> Your Boards
          </span>
          {ownedBoardsMenu ? (
            <i className="fa-solid fa-angle-up"></i>
          ) : (
            <i className="fa-solid fa-angle-down"></i>
          )}
        </h4>
        {ownedBoardsMenu && (
          <>
            {Object.values(ownedBoards).length ? (
              <>
                {Object.values(ownedBoards).map((item) => (
                  <SideItem item={item} key={item.id}/>
                ))}
              </>
            ) : (
              <div className="side-panel-noboards">
                No boards have been added yet
              </div>
            )}
          </>
        )}
      </ul>
      <ul>
        <h4 className="toggle-menu" onClick={toggleSharedMenu}>
          <span>
            <i className="fa-solid fa-users fa-2xs"></i>Shared Boards
          </span>
          {sharedBoardsMenu ? (
            <i className="fa-solid fa-angle-up"></i>
          ) : (
            <i className="fa-solid fa-angle-down"></i>
          )}
        </h4>
        {/* {sharedBoardsMenu &&
          Object.values(sharedBoards).map((item) => <SideItem item={item} />)} */}
        {sharedBoardsMenu && `Feature Coming Soon!`}
      </ul>
    </div>
  );
}

export default SidePanel;
