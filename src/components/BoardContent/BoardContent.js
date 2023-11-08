import AddList from "./AddList/AddList.js";
import BoardList from "./BoardList/BoardList.js";
import styles from "./BoardContent.module.css";
import { Board } from "../../models/board.js";
import { useState } from "react";

const board = new Board();

function BoardContent() {
  const [lists, setLists] = useState(board.lists);

  return (
    <div className={styles["board-container"]}>
      <BoardList lists={lists} />
      <AddList lists={lists} setLists={setLists} />
    </div>
  );
}
export default BoardContent;
