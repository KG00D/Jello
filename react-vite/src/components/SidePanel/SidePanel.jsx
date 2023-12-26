import "./SidePanel.css";

function SidePanel (ownedBoards, sharedBoards ) {
  console.log(ownedBoards);
  return (
    <div className="side-panel-component">
      <ul>
        <h4>
          <span>Your WorkSpaces</span>
          <i class="fa-solid fa-angle-down"></i>
        </h4>
        <li>first</li>
      </ul>
      <ul>
        <h4>
          <span>Guest Workspaces</span>
          <i class="fa-solid fa-angle-down"></i>
        </h4>
        <li>first</li>
      </ul>
    </div>
  );
}

export default SidePanel;
