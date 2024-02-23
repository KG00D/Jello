import { NavLink } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import BoardOptions from "./BoardOptions";

function SideItem({ item }) {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.preventDefault();
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
    <li className="side-item">
      <NavLink to={`/boards/${item.id}`}>
        <div>
          <div
            className="item-preview"
            style={{ background: item.background_image }}
          >
            {" "}
          </div>
          {item.name}
        </div>
        <span className="item-ellipsis" onClick={toggleMenu}>
          <i class="fa-solid fa-ellipsis"></i>
        </span>
      </NavLink>
      {showMenu && (
        <span id={`panel-board-${item.id}`} ref={ulRef}>
          <BoardOptions item={item} />
        </span>
      )}
    </li>
  );
}
export default SideItem;
