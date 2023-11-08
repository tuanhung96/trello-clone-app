import styles from "./EditList.module.css";

function EditList({ handleShowEditList }) {
  return (
    <div className={styles["edit-list-container"]}>
      <div className={styles["edit-list-modal"]}>
        <div className={styles["pop-over-header"]}>
          <span className={styles["pop-over-header-title"]}>List actions</span>
          <button
            className={styles["pop-over-header-close-btn"]}
            onClick={handleShowEditList}
          >
            <svg
              class="pop-over-close-icon"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                class="pop-over-close-icon"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
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
              <a>Archive this list</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EditList;
