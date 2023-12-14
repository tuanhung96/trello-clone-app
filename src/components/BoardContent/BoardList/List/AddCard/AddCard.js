import styles from "./AddCard.module.css";
import React, { useRef, useState } from "react";
import { createCard } from "../../../../../apis/api";
import AddIcon from "../../../../../icon/AddIcon";
import FuctionIcon from "../../../../../icon/FuctionIcon";
import CloseIcon from "../../../../../icon/CloseIcon";
import { cloneDeep, isEqual } from "lodash";

function AddCard({ boardRef, setBoard, listId }) {
  const [showForm, setShowForm] = useState(false);
  const inputRef = useRef(null);

  function handleShowAddCardForm() {
    setShowForm((showForm) => !showForm);
  }

  function handleAddCard(e) {
    e.preventDefault();
    if (inputRef.current.value.trim() === "") return;
    const card = {
      title: inputRef.current.value,
      boardId: boardRef.current._id,
      listId: listId,
    };
    async function saveCardToDb(card) {
      const savedCard = await createCard(card);
      // update board
      const newBoard = cloneDeep(boardRef.current);
      newBoard.lists.forEach((element) => {
        if (element._id.toString() === listId.toString()) {
          element.cardIds.push(savedCard._id.toString());
          element.cards.push(savedCard);
        }
      });
      setBoard(newBoard);
    }
    saveCardToDb(card);
    inputRef.current.value = "";
  }

  function handleAddCardByEnter(e) {
    if (e.key === "Enter") handleAddCard(e);
  }

  return (
    <div>
      <div
        className={
          styles["add-card-btn-div"] + " " + (showForm ? "hidden" : "")
        }
      >
        <button
          className={styles["add-cart-btn"]}
          onClick={handleShowAddCardForm}
        >
          <AddIcon />
          Add a card
        </button>
        <button>
          <FuctionIcon />
        </button>
      </div>

      <div
        className={
          styles["add-card-form-div"] + " " + (showForm ? "" : "hidden")
        }
      >
        <form className={styles["add-card-form"]} onSubmit={handleAddCard}>
          <textarea
            className={styles["text-add-card-form"]}
            placeholder="Enter a title for this card…"
            ref={inputRef}
            onKeyPress={handleAddCardByEnter}
          ></textarea>

          <div className={styles["btns"]}>
            <button className={styles["add-btn"]} type="submit">
              Add card
            </button>
            <button
              className={styles["close-card-btn"]}
              onClick={handleShowAddCardForm}
            >
              <CloseIcon />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default React.memo(AddCard, isEqual);
