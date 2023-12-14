import AddList from "./AddList/AddList.js";
import BoardList from "./BoardList/BoardList.js";
import { useEffect, useRef, useState } from "react";
import { getBoardById } from "../../apis/api.js";
import { cloneDeep } from "lodash";

function BoardContent() {
  const [board, setBoard] = useState(null);
  const boardRef = useRef(null);
  const testRef = useRef(null);

  useEffect(() => {
    getBoardById().then((board) => {
      setBoard(board);
    });
    // fetch("http://localhost:8000/api/v1/boards/654db46b87a6c42e38f901ad")
    //   .then((res) => res.json())
    //   .then((data) => setBoard(data.data.board));
  }, []);

  useEffect(() => {
    boardRef.current = cloneDeep(board);
    testRef.current = board?.listIds.map((listId) =>
      document.getElementById(listId)
    );
  }, [board]);

  // useEffect(() => {
  //   testRef.current = board?.listIds.map((listId) =>
  //     document.getElementById(listId)
  //   );
  // });

  return board ? (
    <>
      <BoardList
        board={board}
        boardRef={boardRef}
        testRef={testRef}
        setBoard={setBoard}
      />
      <AddList boardRef={boardRef} setBoard={setBoard} />
    </>
  ) : (
    <></>
  );
}
export default BoardContent;
