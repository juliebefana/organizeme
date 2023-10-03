import React from 'react';
import Card from './Card';

function Column({
  columnId,
  column,
  selectedCard,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleInputChange,
  handleAddCard,
  handleInputKeyPress,
  handleCardClick,
  handleDeleteClick,
}) {
  return (
    <div className="column" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, columnId)}>
      <h2>{column.title}</h2>
      <div className="card-list">
        {column.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            isSelected={selectedCard === card.id}
            handleDragStart={(e) => handleDragStart(e, card, columnId)}
            handleCardClick={handleCardClick}
            handleDeleteClick={() => handleDeleteClick(columnId)}
          />
        ))}
      </div>
      <div className="card-form">
        <input
          type="text"
          placeholder="Enter task"
          value={column.inputText}
          onChange={(e) => handleInputChange(e, columnId)}
          onKeyDown={(e) => handleInputKeyPress(e, columnId)}
        />
        <button onClick={() => handleAddCard(columnId)}>Add</button>
      </div>
    </div>
  );
}

export default Column;





