import React from 'react';

function Column({ title, cards, inputText, onDragOver, onDrop, onInputChange, onAddCard }) {
  return (
    <div className="column" onDragOver={onDragOver} onDrop={onDrop}>
      <h2>{title}</h2>
      <div className="card-list">
        {cards.map((card) => (
          <div key={card.id} className="card" draggable="true">
            {card.text}
          </div>
        ))}
      </div>
      <div className="card-form">
        <input
          type="text"
          placeholder="Enter task"
          value={inputText}
          onChange={onInputChange}
        />
        <button onClick={onAddCard}>Add</button>
      </div>
    </div>
  );
}

export default Column;
