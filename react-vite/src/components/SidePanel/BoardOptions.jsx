import "./BoardOptions.css";

function BoardOptions({ boardId }) {
  return (
    <div className="board-options">
      <ul>
        Options for: {boardId}
        <li>1. Option 1</li>
        <lie>2. Option 2</lie>
      </ul>
    </div>
  );
}

export default BoardOptions;
