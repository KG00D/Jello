import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import board from './images/board.png'
import card from './images/card.png'

function Homepage() {
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  if (sessionUser) navigate("/session/boards");
  
  return (
  <div className="homepage">
    <h1 id='homepage-welcome'>Welcome to Jello!</h1>
    <div id='homepage-content'>
      <div id='homepage-board-content'>
        <p className='homepage-description'>With Jello, you can make kanban boards to track all of your projects.</p>
        <img className='homepage-image' src={board} alt='board image'></img>
      </div>
      <div id='homepage-card-content'>
        <p className='homepage-description'>Create cards and write comments to track your progress.</p>
        <img className='homepage-image' src={card} alt='card-image'></img>
      </div>
    </div>
   
  </div>
  )
}

export default Homepage;
