import styles from "./Card.module.css";
import React, { useState } from "react";
import { deleteCardById, updateCard } from "../../../../../../apis/api";
import EditIcon from "../../../../../../icon/EditIcon";
import DeleteIcon from "../../../../../../icon/DeleteIcon";
import { cloneDeep, isEqual } from "lodash";

function Card({
  boardRef,
  setBoard,
  card,
  listId,
  handleDragCardStart,
  handleDragCardEnd,
}) {
  const [showForm, setShowForm] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [cardTitle, setCardTitle] = useState(card.title);

  function handleShowEditCardForm() {
    setShowForm((showForm) => !showForm);
  }

  function handleDeleteCard() {
    // delete card by id in database
    deleteCardById(card._id);

    // update board
    const newBoard = cloneDeep(boardRef.current);
    newBoard.lists.forEach((list) => {
      if (list._id.toString() === listId.toString()) {
        list.cardIds = list.cardIds.filter(
          (id) => id.toString() !== card._id.toString()
        );
        list.cards = list.cards.filter(
          (c) => c._id.toString() !== card._id.toString()
        );
      }
    });
    setBoard(newBoard);
  }

  function handleEditCard(e) {
    e.preventDefault();
    handleShowEditCardForm();
    updateCard(card._id, { title: cardTitle });
    // update board
    const newBoard = cloneDeep(boardRef.current);
    newBoard.lists.forEach((list) => {
      list.cards.forEach((c) => {
        if (c._id.toString() === card._id.toString()) {
          c = { ...c, title: cardTitle };
        }
      });
    });
    setBoard(newBoard);
  }

  function handleEditCardByEnter(e) {
    if (e.key === "Enter") handleEditCard(e);
  }

  function handleDragStart(e) {
    setIsDragging((isDragging) => !isDragging);
    handleDragCardStart(e);
  }

  function handleDragEnd(e) {
    setIsDragging((isDragging) => !isDragging);
    handleDragCardEnd(e);
  }

  return (
    <li
      data-card-id={card._id.toString()}
      className={`draggable-card ${isDragging ? "dragging" : ""}`}
      draggable="true"
      onDragStart={(e) => handleDragStart(e)}
      onDragEnd={(e) => handleDragEnd(e)}
    >
      <div className={styles["card"] + " " + (showForm ? "hidden" : "")}>
        <div className={styles["card-content"]}>{cardTitle}</div>
        <button
          className={styles["edit-card-btn"]}
          onClick={handleShowEditCardForm}
        >
          <EditIcon />
        </button>
        <button
          className={styles["delete-card-btn"]}
          onClick={handleDeleteCard}
        >
          <DeleteIcon />
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
                onKeyPress={handleEditCardByEnter}
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

export default React.memo(Card, isEqual);
