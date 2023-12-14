import List from "./List/List.js";
import styles from "./BoardList.module.css";
import { updateBoard } from "../../../apis/api.js";
import { cloneDeep, isEqual } from "lodash";
import React, { useCallback, useRef } from "react";
import { updateCard, updateList } from "../../../apis/api";

function BoardList({ board, boardRef, testRef, setBoard }) {
  const newListIds = cloneDeep(board.listIds);
  const listBoardRef = useRef(null);
  // const listBoard = document.querySelector("#boards");

  const lists = order(board.lists, board.listIds, "_id");

  function order(originalArr, orderArr, key) {
    if (!originalArr || !orderArr) return;
    const cloneArr = cloneDeep(originalArr);
    const orderedArr = cloneArr.sort((a, b) => {
      return orderArr.indexOf(a[key]) - orderArr.indexOf(b[key]);
    });
    return orderedArr;
  }

  function handleDragOver(e) {
    e.preventDefault();

    const draggingEl = listBoardRef.current.querySelector(".dragging");
    if (draggingEl.classList.contains("draggable-card")) return;

    if (draggingEl.classList.contains("draggable-list")) {
      const rightList = closestRightList(e.clientX);
      const currList = draggingEl;
      if (!rightList) {
        listBoardRef.current.append(currList);
        const currListId = currList.getAttribute("data-list-id");
        moveListToEnd(currListId);
      } else {
        listBoardRef.current.insertBefore(currList, rightList);
        const rightListId = rightList.getAttribute("data-list-id");
        const currListId = currList.getAttribute("data-list-id");
        reOderList(rightListId, currListId);
      }
    }
  }

  function closestRightList(mouseX) {
    const lists = listBoardRef.current.querySelectorAll(
      ".draggable-list:not(.dragging)"
    );
    let closestList = null;
    let closestOffset = Number.NEGATIVE_INFINITY;
    lists.forEach((list) => {
      const box = list.getBoundingClientRect();
      const offset = mouseX - box.left - box.width / 2;
      if (offset < 0 && offset > closestOffset) {
        closestOffset = offset;
        closestList = list;
      }
    });
    return closestList;
  }

  function moveListToEnd(currListId) {
    const currListIndex = findListIndex(currListId);
    newListIds.push(newListIds[currListIndex]);
    newListIds.splice(currListIndex, 1);
  }

  function reOderList(rightListId, currListId) {
    const rightListIndex = findListIndex(rightListId);
    const currListIndex = findListIndex(currListId);
    if (currListIndex < rightListIndex) {
      newListIds.splice(rightListIndex, 0, newListIds[currListIndex]);
      newListIds.splice(currListIndex, 1);
    } else {
      newListIds.splice(currListIndex, 1);
      newListIds.splice(rightListIndex, 0, currListId);
    }
  }

  function findListIndex(listId) {
    let index = -1;
    newListIds.forEach((id, i) => {
      if (id === listId) index = i;
    });
    return index;
  }

  function handleDrop(e) {
    const draggingEl = listBoardRef.current.querySelector(".dragging");
    if (draggingEl.classList.contains("draggable-card")) return;
    // update board in database
    updateBoard(board._id, { listIds: newListIds });
    ///
    setBoard({ ...boardRef.current, listIds: newListIds });
  }

  /////////

  const draggingCardId = useRef(null);
  const listIdOfDraggingCard = useRef(null);
  const oldListIdRef = useRef(null);
  const draggingEl = useRef(null);

  const handleDragCardStart = useCallback((e) => {
    draggingEl.current = e.target;
    draggingEl.clone = e.target.cloneNode(true);
    const cardId = e.target.getAttribute("data-card-id");
    const listId = e.target.parentElement.getAttribute("data-list-id");
    draggingCardId.current = cardId;
    listIdOfDraggingCard.current = listId;
    oldListIdRef.current = listId;
  }, []);

  const findListById = useCallback(
    (listId) => {
      let result = null;
      boardRef.current.lists.forEach((list) => {
        if (list._id.toString() === listId.toString()) result = list;
      });
      return result;
    },
    [boardRef]
  );

  const findCardIndex = useCallback((cardId, cardIds) => {
    let index = -1;
    cardIds.forEach((id, i) => {
      if (id.toString() === cardId.toString()) index = i;
    });
    return index;
  }, []);

  const findCardByIdInCurrentList = useCallback((cardId, list) => {
    let result = null;
    list.cards.forEach((card) => {
      if (card._id.toString() === cardId.toString()) result = card;
    });
    return result;
  }, []);

  //////////
  const droppedListIdRef = useRef(null);

  const handleDragEnter = useCallback((e) => {
    const lists = document.querySelectorAll(".draggable-list");
    lists.forEach((list) => {
      const box = list.getBoundingClientRect();
      if (
        e.clientX > box.left &&
        e.clientX < box.right &&
        e.clientY > box.top &&
        e.clientY < box.bottom
      ) {
        droppedListIdRef.current = list.getAttribute("data-list-id");
      }
    });
  }, []);

  const closestBottomCard = useCallback((zone, mouseY) => {
    const cards = zone.querySelectorAll(".draggable-card:not(.dragging)");
    let closestCard = null;
    let closestOffset = Number.NEGATIVE_INFINITY;
    cards.forEach((card) => {
      const box = card.getBoundingClientRect();
      const offset = mouseY - box.top;
      if (offset < 0 && offset > closestOffset) {
        closestOffset = offset;
        closestCard = card;
      }
    });
    return closestCard;
  }, []);

  const moveCard = useCallback(
    (currCardId, droppedListId) => {
      const currListId = listIdOfDraggingCard.current;
      const currList = findListById(currListId);
      if (currListId === droppedListId) {
        const currCardIndex = findCardIndex(currCardId, currList.cardIds);
        currList.cardIds.push(currCardId);
        currList.cardIds.splice(currCardIndex, 1);
      } else {
        const currCardIndex = findCardIndex(currCardId, currList.cardIds);
        const droppedList = findListById(droppedListId);
        const currCard = findCardByIdInCurrentList(currCardId, currList);
        if (currCard) {
          const newCard = { ...currCard, listId: droppedListId };
          droppedList.cardIds.push(currCardId);
          droppedList.cards.push(newCard);
        }
        if (currCardIndex >= 0) {
          currList.cardIds.splice(currCardIndex, 1);
          currList.cards = currList.cards.filter(
            (card) => card._id.toString() !== currCardId
          );
        }
      }
    },
    [findListById, findCardIndex, findCardByIdInCurrentList]
  );

  const reOderCard = useCallback(
    (currCardId, bottomCardId, droppedListId) => {
      const droppedList = findListById(droppedListId);
      const droppedCardIds = droppedList.cardIds;
      const bottomCardIndex = findCardIndex(bottomCardId, droppedCardIds);
      const currListId = listIdOfDraggingCard.current;
      const currList = findListById(currListId);

      if (currListId === droppedListId) {
        const currCardIndex = findCardIndex(currCardId, droppedCardIds);

        if (currCardIndex < bottomCardIndex) {
          droppedCardIds.splice(bottomCardIndex, 0, currCardId);
          droppedCardIds.splice(currCardIndex, 1);
        } else {
          droppedCardIds.splice(currCardIndex, 1);
          droppedCardIds.splice(bottomCardIndex, 0, currCardId);
        }
      } else {
        const currCardIds = currList.cardIds;
        const currCardIndex = findCardIndex(currCardId, currCardIds);
        const currCard = findCardByIdInCurrentList(currCardId, currList);
        if (currCard) {
          const newCard = { ...currCard, listId: droppedListId };
          droppedList.cards.push(newCard);
          droppedCardIds.splice(bottomCardIndex, 0, currCardId);
        }
        if (currCardIndex >= 0) {
          currCardIds.splice(currCardIndex, 1);
          currList.cards = currList.cards.filter(
            (card) => card._id.toString() !== currCardId
          );
        }
      }
    },
    [findListById, findCardIndex, findCardByIdInCurrentList]
  );

  const handleDragOverCards = useCallback(
    (e) => {
      e.preventDefault();
      const draggingElement = listBoardRef.current.querySelector(".dragging");
      if (draggingElement.classList.contains("draggable-list")) return;

      const currCard = draggingEl.current;
      currCard.style.display = "none";

      const droppedListId = droppedListIdRef.current;
      const zone = testRef.current.find(
        (ele) => ele.getAttribute("id") === droppedListId
      );

      if (currCard.classList.contains("draggable-card") && e.target === zone) {
        const bottomCard = closestBottomCard(zone, e.clientY);
        const currCardId = draggingCardId.current;

        if (!bottomCard) {
          zone.append(draggingEl.clone);
          moveCard(currCardId, droppedListId);
          listIdOfDraggingCard.current = droppedListId;
        } else {
          zone.insertBefore(draggingEl.clone, bottomCard);
          const bottomCardId = bottomCard.getAttribute("data-card-id");
          reOderCard(currCardId, bottomCardId, droppedListId);
          listIdOfDraggingCard.current = droppedListId;
        }
      }
    },
    [moveCard, reOderCard, closestBottomCard, testRef]
  );

  const handleDropCard = useCallback(
    (e) => {
      e.stopPropagation();
      const draggingElement = listBoardRef.current.querySelector(".dragging");
      if (draggingElement.classList.contains("draggable-list")) return;

      draggingEl.clone.remove();
      draggingEl.current.style.display = "block";

      const droppedListId = droppedListIdRef.current;
      const droppedList = findListById(droppedListId);
      const droppedCardIds = droppedList.cardIds;
      const oldListId = oldListIdRef.current;
      if (oldListId === droppedListId) {
        updateList(droppedListId, { cardIds: droppedCardIds });
      } else {
        const currCardId = draggingCardId.current;
        const oldList = findListById(oldListId);
        const oldCardIds = oldList.cardIds;
        updateList(droppedListId, { cardIds: droppedCardIds });
        updateCard(currCardId, { listId: droppedListId });
        updateList(oldListId, { cardIds: oldCardIds });
      }
      setBoard(boardRef.current);
    },
    [findListById, boardRef, setBoard]
  );

  const handleDragCardEnd = useCallback(
    (e) => {
      e.stopPropagation();
      draggingEl.clone.remove();
      draggingEl.current.style.display = "block";

      const droppedListId = droppedListIdRef.current;
      const droppedList = findListById(droppedListId);
      const droppedCardIds = droppedList.cardIds;
      const oldListId = oldListIdRef.current;
      if (oldListId === droppedListId) {
        updateList(droppedListId, { cardIds: droppedCardIds });
      } else {
        const currCardId = draggingCardId.current;
        const oldList = findListById(oldListId);
        const oldCardIds = oldList.cardIds;
        updateList(droppedListId, { cardIds: droppedCardIds });
        updateCard(currCardId, { listId: droppedListId });
        updateList(oldListId, { cardIds: oldCardIds });
      }
      setBoard(boardRef.current);
    },
    [findListById, boardRef, setBoard]
  );

  return (
    <ol
      id="boards"
      ref={listBoardRef}
      className={styles["board-list"]}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e)}
    >
      {lists?.map((list) => (
        <List
          boardRef={boardRef}
          setBoard={setBoard}
          list={list}
          key={list._id.toString()}
          handleDragCardStart={handleDragCardStart}
          handleDragCardEnd={handleDragCardEnd}
          handleDragOverCards={handleDragOverCards}
          handleDropCard={handleDropCard}
          handleDragEnter={handleDragEnter}
        />
      ))}
    </ol>
  );
}

export default React.memo(BoardList, isEqual);
