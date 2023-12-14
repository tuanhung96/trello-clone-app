import styles from "./List.module.css";
import ListHeader from "./ListHeader/ListHeader.js";
import Cards from "./Cards/Cards.js";
import AddCard from "./AddCard/AddCard.js";
import EditList from "./EditList/EditList.js";
import React, { useCallback, useState } from "react";
import { isEqual } from "lodash";

function List({
  boardRef,
  setBoard,
  list,
  handleDragCardStart,
  handleDragCardEnd,
  handleDragOverCards,
  handleDropCard,
  handleDragEnter,
}) {
  const [showEditList, setShowEditList] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleShowEditList = useCallback(() => {
    setShowEditList((showEditList) => !showEditList);
  }, []);

  const handleDragStartOrEnd = useCallback((e) => {
    if (e.target.classList.contains("draggable-list"))
      setIsDragging((isDragging) => !isDragging);
  }, []);

  return list ? (
    <li
      draggable="true"
      data-list-id={list._id.toString()}
      className={`draggable-list ${isDragging ? "dragging" : ""}`}
      onDragStart={handleDragStartOrEnd}
      onDragEnd={handleDragStartOrEnd}
    >
      <div className={styles["list"]}>
        <ListHeader
          boardRef={boardRef}
          setBoard={setBoard}
          listId={list._id}
          title={list.title}
          handleShowEditList={handleShowEditList}
        />
        <Cards
          boardRef={boardRef}
          setBoard={setBoard}
          list={list}
          handleDragCardStart={handleDragCardStart}
          handleDragCardEnd={handleDragCardEnd}
          handleDragOverCards={handleDragOverCards}
          handleDropCard={handleDropCard}
          handleDragEnter={handleDragEnter}
        />
        <AddCard
          boardRef={boardRef}
          setBoard={setBoard}
          listId={list._id.toString()}
        />
        {showEditList ? (
          <EditList
            boardRef={boardRef}
            setBoard={setBoard}
            listId={list._id.toString()}
            handleShowEditList={handleShowEditList}
          />
        ) : (
          <></>
        )}
      </div>
    </li>
  ) : (
    <></>
  );
}

export default React.memo(List, isEqual);
