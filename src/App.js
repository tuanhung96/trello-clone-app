import BoardBar from "./components/BoardBar/BoardBar.js";
import BoardContent from "./components/BoardContent/BoardContent.js";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <BoardBar />
      <div className={styles["board-container"]}>
        <BoardContent />
      </div>
    </>
  );
}

export default App;
