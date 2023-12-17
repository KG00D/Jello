import { Link } from "react-router-dom";
import "./BoardTile.css";

function BoardTile({ board }) {
  let { background_image, name, id } = board;
  return (
    <div className="board-tile">
      <Link to={`/boards/${id}`}>
        <div
          className="board-tile"
          style={{ backgroundColor: background_image }}
        >
          {name}
        </div>
      </Link>
    </div>
  );
}

export default BoardTile;
