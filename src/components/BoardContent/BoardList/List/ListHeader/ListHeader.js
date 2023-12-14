import React, { useEffect, useRef, useState } from "react";
import styles from "./ListHeader.module.css";
import { updateList } from "../../../../../apis/api";
import ThreePointIcon from "../../../../../icon/ThreePointIcon";
import { cloneDeep, isEqual } from "lodash";

function ListHeader({ boardRef, setBoard, listId, title, handleShowEditList }) {
  const [editListHeader, setEditListHeader] = useState(false);
  const [listTitle, setListTitle] = useState(title);

  function handleShowEditListHeader() {
    setEditListHeader((editListHeader) => !editListHeader);
  }
  function handleEditList(e) {
    if (e.key === "Enter") {
      handleShowEditListHeader();
      // update list to database
      updateList(listId, { title: listTitle });
      // update board
      const newBoard = cloneDeep(boardRef.current);
      newBoard.lists.forEach((el) => {
        if (el._id.toString() === listId.toString()) el.title = listTitle;
      });
      setBoard(newBoard);
    }
  }
  useEffect(
    function () {
      function callback(e) {
        const text = document.querySelector(`.show-textarea${listId}`);
        if (text !== null) {
          const box = text.getBoundingClientRect();
          if (
            e.clientX < box.left ||
            e.clientX > box.right ||
            e.clientY < box.top ||
            e.clientY > box.bottom
          )
            handleShowEditListHeader();
        }
      }
      document.addEventListener("click", callback);

      return function () {
        document.removeEventListener("click", callback);
      };
    },
    [listId]
  );
  return (
    <div className={styles["list-header"]}>
      <div className={styles["list-name"]}>
        {editListHeader ? (
          <textarea
            className={styles["show-textarea"] + " " + `show-textarea${listId}`}
            spellCheck="false"
            autoFocus
            value={listTitle}
            onChange={(e) => setListTitle(e.target.value)}
            onKeyPress={handleEditList}
          ></textarea>
        ) : (
          <h4
            className={styles["list-title"]}
            onClick={handleShowEditListHeader}
          >
            {listTitle}
          </h4>
        )}
      </div>
      <button className={styles["edit-list-btn"]} onClick={handleShowEditList}>
        <ThreePointIcon />
      </button>
    </div>
  );
}

export default React.memo(ListHeader, isEqual);
