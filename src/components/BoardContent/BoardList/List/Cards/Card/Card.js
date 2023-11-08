import styles from "./Card.module.css";
import { useState } from "react";
function Card({ card }) {
  const [showForm, setShowForm] = useState(false);
  const [cardTitle, setCardTitle] = useState(card.title);
  const [isDragging, setIsDragging] = useState(false);

  function handleShowEditCardForm() {
    setShowForm((showForm) => !showForm);
  }
  function handleDeleteCard() {}
  function handleEditCard(e) {
    e.preventDefault();
    handleShowEditCardForm();
  }
  function handleDragStartOrEnd() {
    setIsDragging((isDragging) => !isDragging);
  }
  return (
    <li
      className={"draggable-card" + " " + (isDragging ? "dragging" : "")}
      draggable="true"
      onDragStart={handleDragStartOrEnd}
      onDragEnd={handleDragStartOrEnd}
    >
      <div className={styles["card"] + " " + (showForm ? "hidden" : "")}>
        <div className={styles["card-content"]}>
          <a draggable="false" href="#">
            {cardTitle}
          </a>
        </div>
        <button
          className={styles["edit-card-btn"]}
          type="button"
          onClick={handleShowEditCardForm}
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
              d="M7.82034 14.4893L9.94134 16.6103L18.4303 8.12131L16.3093 6.00031H16.3073L7.82034 14.4893ZM17.7233 4.58531L19.8443 6.70731C20.6253 7.48831 20.6253 8.7543 19.8443 9.53531L10.0873 19.2933L5.13734 14.3433L14.8943 4.58531C15.2853 4.19531 15.7973 4.00031 16.3093 4.00031C16.8203 4.00031 17.3323 4.19531 17.7233 4.58531ZM5.20094 20.4097C4.49794 20.5537 3.87694 19.9327 4.02094 19.2297L4.80094 15.4207L9.00994 19.6297L5.20094 20.4097Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
        <button
          className={styles["delete-card-btn"]}
          type="button"
          onClick={handleDeleteCard}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            width="16"
            height="16"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>

      <div
        className={
          styles["edit-card-container"] + " " + (showForm ? "" : "hidden")
        }
      >
        <div className={styles["edit-card-modal"]}>
          <form className={styles["edit-card-form"]} onSubmit={handleEditCard}>
            <div className={styles["edit-content"]}>
              <textarea
                className={styles["text-edit-card-form"]}
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
              ></textarea>
            </div>
            <button className={styles["save-btn"]} type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </li>
  );
}

export default Card;
