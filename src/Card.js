import React from 'react';

function Card({
  card,
  isSelected,
  handleDragStart,
  handleCardClick,
  handleDeleteClick,
}) {
  return (
    <div
      className={`card ${isSelected ? 'selected' : ''}`}
      draggable="true"
      onDragStart={(e) => handleDragStart(e)}
      onClick={() => handleCardClick(card.id)}
    >
      {card.text}
      {isSelected && (
        <button className="delete-button" onClick={handleDeleteClick}>
          Delete
        </button>
      )}
    </div>
  );
}

export default Card;



