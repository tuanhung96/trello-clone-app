import React from "react";
import Card from "./Card/Card";
import styles from "./Cards.module.css";
import { cloneDeep, isEqual } from "lodash";

function Cards({
  boardRef,
  setBoard,
  list,
  handleDragCardStart,
  handleDragCardEnd,
  handleDragOverCards,
  handleDropCard,
  handleDragEnter,
}) {
  const cards = order(list.cards, list.cardIds, "_id");

  function order(originalArr, orderArr, key) {
    const cloneArr = cloneDeep(originalArr);
    const orderedArr = cloneArr.sort((a, b) => {
      return orderArr.indexOf(a[key]) - orderArr.indexOf(b[key]);
    });
    return orderedArr;
  }

  ////////////////

  return (
    <ol
      id={list._id}
      data-list-id={list._id}
      className={styles["cards"]}
      onDragOver={(e) => handleDragOverCards(e)}
      onDrop={(e) => handleDropCard(e)}
      onDragEnter={(e) => handleDragEnter(e)}
    >
      {cards.map((card) => (
        <Card
          boardRef={boardRef}
          setBoard={setBoard}
          card={card}
          listId={list._id}
          key={card._id.toString()}
          handleDragCardStart={handleDragCardStart}
          handleDragCardEnd={handleDragCardEnd}
        />
      ))}
    </ol>
  );
}

export default React.memo(Cards, isEqual);
