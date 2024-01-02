import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

function Homepage() {
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  if (sessionUser) navigate("/session/boards");
  return <div className="homepage">Homepage</div>;
}

export default Homepage;
