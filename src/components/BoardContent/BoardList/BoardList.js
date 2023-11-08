import List from "./List/List.js";
import styles from "./BoardList.module.css";

function BoardList({ lists }) {
  function handleDragOver(e) {
    e.preventDefault();

    const draggingEl = document.querySelector(".dragging");
    if (draggingEl.classList.contains("draggable-card")) return;

    const listBoard = document.querySelector("#boards");
    if (draggingEl.classList.contains("draggable-list")) {
      const rightList = insertLeftList(listBoard, e.clientX);
      const currList = document.querySelector(".dragging");
      if (!rightList) {
        listBoard.append(currList);
      } else {
        listBoard.insertBefore(currList, rightList);
      }
    }
  }

  function insertLeftList(listBoard, mouseX) {
    const lists = listBoard.querySelectorAll(".draggable-list:not(.dragging)");
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

  return (
    <ol
      id="boards"
      className={styles["board-list"]}
      onDragOver={handleDragOver}
    >
      {lists.map((list) => (
        <List list={list} key={list.id} />
      ))}
    </ol>
  );
}

export default BoardList;
