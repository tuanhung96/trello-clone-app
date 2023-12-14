import styles from "./EditList.module.css";
import { deleteListById } from "../../../../../apis/api";
import CloseIcon from "../../../../../icon/CloseIcon";
import { cloneDeep, isEqual } from "lodash";
import React from "react";

function EditList({ boardRef, setBoard, listId, handleShowEditList }) {
  function handleDeleteList() {
    // delete list by id in DB
    deleteListById(listId);

    // update listIds of board
    const board = cloneDeep(boardRef.current);
    const newBoard = {
      ...board,
      listIds: board.listIds.filter(
        (id) => id.toString() !== listId.toString()
      ),
      lists: board.lists.filter(
        (list) => list._id.toString() !== listId.toString()
      ),
    };
    setBoard(newBoard);
  }
  return (
    <div className={styles["edit-list-container"]}>
      <div className={styles["edit-list-modal"]}>
        <div className={styles["pop-over-header"]}>
          <span className={styles["pop-over-header-title"]}>List actions</span>
          <button
            className={styles["pop-over-header-close-btn"]}
            onClick={handleShowEditList}
          >
            <CloseIcon />
          </button>
        </div>
        <div className={styles["pop-over-content"]}>
          <ul className={styles["pop-over-list"]}>
            <li>
              <a>Add card…</a>
            </li>
            <li>
              <a>Copy list…</a>
            </li>
          </ul>
          <hr></hr>
          <ul className={styles["pop-over-list"]}>
            <li>
              <a>Sort by…</a>
            </li>
          </ul>
          <hr></hr>

          <ul className={styles["pop-over-list"]}>
            <li>
              <a>Archive all cards in this list…</a>
            </li>
          </ul>
          <hr></hr>

          <ul className={styles["pop-over-list"]}>
            <li>
              <a onClick={handleDeleteList}>Archive this list</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default React.memo(EditList, isEqual);
