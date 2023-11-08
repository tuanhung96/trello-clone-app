import styles from "./List.module.css";
import ListHeader from "./ListHeader/ListHeader.js";
import Cards from "./Cards/Cards.js";
import AddCard from "./AddCard/AddCard.js";
import EditList from "./EditList/EditList.js";
import { useState } from "react";

function List({ list }) {
  const [showEditList, setShowEditList] = useState(false);
  const [cards, setCards] = useState(list.cards);
  const [isDragging, setIsDragging] = useState(false);

  function handleShowEditList() {
    setShowEditList((showEditList) => !showEditList);
  }
  function handleDragStartOrEnd(e) {
    if (e.target.classList.contains("draggable-list"))
      setIsDragging((isDragging) => !isDragging);
  }

  return (
    <li
      draggable="true"
      className={"draggable-list" + " " + (isDragging ? "dragging" : "")}
      onDragStart={handleDragStartOrEnd}
      onDragEnd={handleDragStartOrEnd}
    >
      <div className={styles["list"]}>
        <ListHeader list={list} handleShowEditList={handleShowEditList} />
        <Cards list={list} cards={cards}></Cards>
        <AddCard list={list} cards={cards} setCards={setCards}></AddCard>
        {showEditList ? (
          <EditList handleShowEditList={handleShowEditList} />
        ) : (
          <></>
        )}
      </div>
    </li>
  );
}

export default List;
