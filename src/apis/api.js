import axios from "axios";

export const getBoardById = async () => {
  const res = await axios.get(
    "http://localhost:8000/api/v1/boards/654db46b87a6c42e38f901ad"
  );
  return res.data.data.board;
};

export const updateBoard = async (boardId, updateObj) => {
  const res = await axios.patch(
    `http://localhost:8000/api/v1/boards/${boardId}`,
    updateObj
  );
  return res.data.data.board;
};

export const getListById = async (listId) => {
  const res = await axios.get(`http://localhost:8000/api/v1/lists/${listId}`);
  return res.data.data.list;
};

export const createList = async (list) => {
  const res = await axios.post(`http://localhost:8000/api/v1/lists`, list);
  return res.data.data.list;
};

export const updateList = async (listId, updateObj) => {
  const res = await axios.patch(
    `http://localhost:8000/api/v1/lists/${listId}`,
    updateObj
  );
  return res.data.data.list;
};

export const deleteListById = async (listId) => {
  await axios.delete(`http://localhost:8000/api/v1/lists/${listId}`);
};

export const getCardById = async (cardId) => {
  const res = await axios.get(`http://localhost:8000/api/v1/cards/${cardId}`);
  return res.data.data.card;
};

export const createCard = async (card) => {
  const res = await axios.post(`http://localhost:8000/api/v1/cards`, card);
  return res.data.data.card;
};

export const deleteCardById = async (cardId) => {
  await axios.delete(`http://localhost:8000/api/v1/cards/${cardId}`);
};

export const updateCard = async (cardId, updateObj) => {
  const res = await axios.patch(
    `http://localhost:8000/api/v1/cards/${cardId}`,
    updateObj
  );
  return res.data.data.card;
};
