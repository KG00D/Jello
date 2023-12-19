import { NavLink } from "react-router-dom";
import "./BoardTile.css";

function BoardTile({ board }) {
  let { background_image, name, id } = board;
  console.log(background_image);
  return (
    <NavLink
      to={`/boards/${id}`}
      className="board-tile"
      style={{ backgroundColor: background_image }}
    >
      {name}
    </NavLink>
  );
}

export default BoardTile;
