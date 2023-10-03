import React, { useState } from 'react';

function Card({
  card,
  isSelected,
  handleDragStart,
  handleCardClick,
  handleDeleteClick,
}) {
  const [isDeleteButtonVisible, setDeleteButtonVisible] = useState(false);

  const toggleDeleteButton = () => {
    setDeleteButtonVisible(!isDeleteButtonVisible);
  };

  return (
    <div
      className={`card ${isSelected ? 'selected' : ''}`}
      draggable="true"
      onDragStart={(e) => handleDragStart(e)}
      onClick={() => {
        handleCardClick(card.id);
        toggleDeleteButton(); 
      }}
      onMouseLeave={() => setDeleteButtonVisible(false)} 
    >
      {card.text}
      {isDeleteButtonVisible && (
        <button className="delete-button" onClick={(e) => handleDeleteClick(e)}>
          Delete
        </button>
      )}
    </div>
  );
}

export default Card;




