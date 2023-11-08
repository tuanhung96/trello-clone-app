import styles from "./AddList.module.css";
import { useState } from "react";
import { List } from "../../../models/list.js";

function AddList({ lists, setLists }) {
  const [showForm, setShowForm] = useState(false);
  const [listTitle, setListTitle] = useState("");

  function handleShowAddListForm() {
    setShowForm((showForm) => !showForm);
  }

  function handleAddList(e) {
    e.preventDefault();
    if (listTitle.trim() === "") return;
    const id = Math.floor(Math.random() * 1000);
    const list = new List(id, listTitle);
    setLists((lists) => [...lists, list]);
    setListTitle("");
  }

  return (
    <div class="add-container">
      <div className={showForm ? "hidden" : ""}>
        <button
          className={styles["add-list-btn"]}
          onClick={handleShowAddListForm}
        >
          <svg
            width="16"
            height="16"
            role="presentation"
            focusable="false"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z"
              fill="currentColor"
            ></path>
          </svg>
          Add a list
        </button>
      </div>

      <div className={showForm ? "" : "hidden"}>
        <form className={styles["add-list-form"]} onSubmit={handleAddList}>
          <textarea
            className={styles["text-add-list-form"]}
            spellcheck="false"
            placeholder="Enter list title…"
            value={listTitle}
            onChange={(e) => setListTitle(e.target.value)}
          ></textarea>
          <div className={styles["btns"]}>
            <button className={styles["add-btn"]} type="submit">
              Add list
            </button>
            <button
              className={styles["close-list-btn"]}
              type="button"
              onClick={handleShowAddListForm}
            >
              <svg
                width="16"
                height="16"
                role="presentation"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddList;
