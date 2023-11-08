export class Board {
  constructor() {
    const data = this.getDataFromLocalStorage();
    this.lists = data ? data : [];
  }

  addList(list) {
    this.lists.push(list);
    this.saveDataToLocalStorage();
  }

  addCardToList(card) {
    this.lists.forEach((list) => {
      if (list.id === card.parentListId) {
        list.cards.push(card);
      }
    });
    this.saveDataToLocalStorage();
  }

  updateListTitle(listId, title) {
    this.lists.forEach((list) => {
      if (list.id === listId) list.title = title;
    });
    this.saveDataToLocalStorage();
  }

  updateCardTitle(cardId, listId, title) {
    this.lists.forEach((list) => {
      if (list.id === listId) {
        list.cards.forEach((card) => {
          if (card.id === cardId) card.title = title;
        });
      }
    });
    this.saveDataToLocalStorage();
  }

  deleteCard(cardId, listId) {
    this.lists.forEach((list) => {
      if (list.id === listId) {
        list.cards = list.cards.filter((card) => {
          return card.id !== cardId;
        });
      }
    });
    this.saveDataToLocalStorage();
  }

  deleteList(listId) {
    this.lists = this.lists.filter((list) => {
      return list.id !== listId;
    });
    this.saveDataToLocalStorage();
  }

  moveListToEnd(currListId) {
    const currListIndex = this.findListIndex(currListId);
    this.lists.push({ ...this.lists[currListIndex] });
    this.lists.splice(currListIndex, 1);
    this.saveDataToLocalStorage();
  }

  reOderList(rightListId, currListId) {
    const rightListIndex = this.findListIndex(rightListId);
    const currListIndex = this.findListIndex(currListId);
    if (currListIndex < rightListIndex) {
      this.lists.splice(rightListIndex, 0, { ...this.lists[currListIndex] });
      this.lists.splice(currListIndex, 1);
    } else {
      const currList = { ...this.lists[currListIndex] };
      this.lists.splice(currListIndex, 1);
      this.lists.splice(rightListIndex, 0, currList);
    }
    this.saveDataToLocalStorage();
  }

  findListIndex(listId) {
    let index = -1;
    this.lists.forEach((list, i) => {
      if (list.id === listId) return (index = i);
    });
    return index;
  }

  /////
  moveCard(currCardId, currListId, droppedListId) {
    const currList = this.findListByListId(currListId);
    const currCardIndex = this.findCardIndex(currCardId, currListId);
    const droppedList = this.findListByListId(droppedListId);
    if (currListId === droppedListId) {
      currList.cards.push({ ...currList.cards[currCardIndex] });
      currList.cards.splice(currCardIndex, 1);
    } else {
      const droppedCard = { ...currList.cards[currCardIndex] };
      currList.cards.splice(currCardIndex, 1);
      droppedCard.parentListId = droppedListId;
      droppedList.cards.push(droppedCard);
    }
    this.saveDataToLocalStorage();
  }

  reOderCard(currCardId, bottomCardId, currListId, droppedListId) {
    const bottomCardIndex = this.findCardIndex(bottomCardId, droppedListId);
    const currCardIndex = this.findCardIndex(currCardId, currListId);
    const currList = this.findListByListId(currListId);
    const droppedList = this.findListByListId(droppedListId);

    if (currListId === droppedListId) {
      if (currCardIndex < bottomCardIndex) {
        currList.cards.splice(bottomCardIndex, 0, {
          ...currList.cards[currCardIndex],
        });
        currList.cards.splice(currCardIndex, 1);
      } else {
        const currCard = { ...currList.cards[currCardIndex] };
        currList.cards.splice(currCardIndex, 1);
        currList.cards.splice(bottomCardIndex, 0, currCard);
      }
    } else {
      const droppedCard = { ...currList.cards[currCardIndex] };
      droppedCard.parentListId = droppedListId;
      currList.cards.splice(currCardIndex, 1);
      droppedList.cards.splice(bottomCardIndex, 0, droppedCard);
    }
    this.saveDataToLocalStorage();
  }

  findListByListId(listId) {
    let result = null;
    this.lists.forEach((list) => {
      if (list.id === listId) result = list;
    });
    return result;
  }

  findCardIndex(cardId, listId) {
    let index = -1;
    this.lists.forEach((list) => {
      if (list.id === listId) {
        list.cards.forEach((card, i) => {
          if (card.id === cardId) return (index = i);
        });
      }
    });
    return index;
  }

  /////
  saveDataToLocalStorage() {
    localStorage.setItem("lists", JSON.stringify(this.lists));
  }

  getDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem("lists"));
  }
}
