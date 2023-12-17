import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./Landingpage.css";
import { publicBoardsThunk, myBoardsThunk } from "../../redux/board";

function Landingpage() {
  const dispatch = useDispatch();
  const publicBoards = useSelector((state) => state.boards.publicBoards);
  const myboards = useSelector((state) => state.boards.myBoards);
  const sessionUser = useSelector((state) => state.session.user);

  const ownedBoards = {}
  const sharedBoards= {}

  for (let key in myboards) {
    console.log("key", key)
    if (sessionUser.id === myboards[key].user_id) {
        ownedBoards[key] = myboards[key]
    } else {
        sharedBoards[key] = myboards[key]
    }
  }
  console.log("owned", ownedBoards, "/n/nshared",sharedBoards)
  useEffect(() => {
    dispatch(publicBoardsThunk());
    dispatch(myBoardsThunk());
  }, [dispatch]);

  return <div className="Landing-Page">
    <h4>YOUR WORKSPACES</h4>
    <h4>GUEST WORKSPACE</h4>
    </div>;
}

export default Landingpage;
