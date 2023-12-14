import styles from "./AddList.module.css";
import React, { useRef, useState } from "react";
import { createList } from "../../../apis/api";
import AddIcon from "../../../icon/AddIcon";
import CloseIcon from "../../../icon/CloseIcon";
import { cloneDeep, isEqual } from "lodash";

function AddList({ boardRef, setBoard }) {
  const [showForm, setShowForm] = useState(false);

  const inputRef = useRef(null);

  function handleShowAddListForm() {
    setShowForm((showForm) => !showForm);
  }

  function handleAddList(e) {
    e.preventDefault();
    if (inputRef.current.value.trim() === "") return;
    const list = {
      title: inputRef.current.value,
      boardId: boardRef.current._id,
    };
    async function saveListToDb(list) {
      const savedList = await createList(list);
      const newBoard = cloneDeep(boardRef.current);
      newBoard.listIds.push(savedList._id.toString());
      savedList.cards = [];
      newBoard.lists.push(savedList);
      setBoard(newBoard);
    }
    saveListToDb(list);
    inputRef.current.value = "";
  }

  function handleAddListByEnter(e) {
    if (e.key === "Enter") handleAddList(e);
  }

  return (
    <div>
      <div className={showForm ? "hidden" : ""}>
        <button
          className={styles["add-list-btn"]}
          onClick={handleShowAddListForm}
        >
          <AddIcon />
          Add a list
        </button>
      </div>

      <div className={showForm ? "" : "hidden"}>
        <form className={styles["add-list-form"]} onSubmit={handleAddList}>
          <textarea
            className={styles["text-add-list-form"]}
            spellCheck="false"
            placeholder="Enter list title…"
            ref={inputRef}
            onKeyPress={handleAddListByEnter}
          ></textarea>
          <div className={styles["btns"]}>
            <button className={styles["add-btn"]} type="submit">
              Add list
            </button>
            <button
              className={styles["close-list-btn"]}
              onClick={handleShowAddListForm}
            >
              <CloseIcon />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default React.memo(AddList, isEqual);
