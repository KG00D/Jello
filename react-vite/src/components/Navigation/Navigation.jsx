import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import CreateBoardModal from "../CreateBoardModal";
import { useModal } from "../../context/Modal";

function Navigation() {
  const { setModalContent } = useModal();

  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();


  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

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

  return (
    <ul className="navigation">
      <li>
        {user ? (
          <NavLink id="logo" to="/session/boards">
            <i class="fa-solid fa-jar"></i> Jello
          </NavLink>
        ) : (
          <NavLink id="logo" to="/">
            <i class="fa-solid fa-jar"></i> Jello
          </NavLink>
        )}
      </li>
      <li>
        {user ? (
          <button className="new-board-button" onClick={toggleMenu}>
            Board+
          </button>
        ) : (
          <></>
        )}

        {showMenu && (
          <span ref={ulRef}>
            <CreateBoardModal />
          </span>
        )}
      </li>
      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
