import { NavLink } from "react-router-dom";

function SideItem({ item }) {
  console.log(item);
  return (
    <li className="side-item">
      <NavLink to={`/boards/${item.id}`}>
        <div>
          <div
            className="item-preview"
            style={{ backgroundColor: item.background_image }}
          >
            {" "}
          </div>
          {item.name}
        </div>
        <span className="item-ellipsis">
          <i class="fa-solid fa-ellipsis"></i>
        </span>
      </NavLink>
    </li>
  );
}
export default SideItem;
