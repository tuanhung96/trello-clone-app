import Card from "./Card/Card";
import styles from "./Cards.module.css";

function Cards({ list, cards }) {
  function handleDragOver(e) {
    e.preventDefault();

    const currCard = document.querySelector(".dragging");
    if (currCard.classList.contains("draggable-list")) return;

    const zone = document.getElementById(list.id);
    if (currCard.classList.contains("draggable-card") && e.target === zone) {
      const bottomCard = insertAboveCard(zone, e.clientY);

      if (!bottomCard) {
        zone.append(currCard);
      } else {
        zone.insertBefore(currCard, bottomCard);
      }
    }
  }

  function insertAboveCard(zone, mouseY) {
    const cards = zone.querySelectorAll(".draggable-card:not(.dragging)");
    let closestCard = null;
    let closestOffset = Number.NEGATIVE_INFINITY;
    cards.forEach((card) => {
      const box = card.getBoundingClientRect();
      const offset = mouseY - box.top - box.height / 2;
      if (offset < 0 && offset > closestOffset) {
        closestOffset = offset;
        closestCard = card;
      }
    });
    return closestCard;
  }

  return (
    <ol id={list.id} className={styles["cards"]} onDragOver={handleDragOver}>
      {cards.map((card) => (
        <Card card={card} key={card.id} />
      ))}
    </ol>
  );
}

export default Cards;
