import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import CreateBoardModal from "../CreateBoardModal";
import { useModal } from "../../context/Modal";

function Navigation() {
  const { setModalContent } = useModal();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <ul className="navigation">
      <li>
        <NavLink to="/">Jello</NavLink>
      </li>
      <li>
        <button className="new-board-button" onClick={toggleMenu}>Board+</button>
        {showMenu && <CreateBoardModal />}
      </li>
      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
