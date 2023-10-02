import React, { useState } from 'react';
import './App.css';

function App() {
  const [columns, setColumns] = useState({
    todo: {
      title: 'To Do',
      cards: [],
      inputText: '',
    },
    inProgress: {
      title: 'In Progress',
      cards: [],
      inputText: '',
    },
    done: {
      title: 'Done',
      cards: [],
      inputText: '',
    },
  });

  const handleDragStart = (e, card, columnId) => {
    e.dataTransfer.setData('card', JSON.stringify(card));
    e.dataTransfer.setData('columnId', columnId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    const droppedCardJSON = e.dataTransfer.getData('card');
    const sourceColumnId = e.dataTransfer.getData('columnId');

    try {
      const droppedCard = JSON.parse(droppedCardJSON);
      if (droppedCard && droppedCard.id) {
        if (sourceColumnId !== targetColumnId) {
          // Remove the card from the source column
          const newColumns = { ...columns };
          newColumns[sourceColumnId].cards = newColumns[sourceColumnId].cards.filter(
            (card) => card.id !== droppedCard.id
          );

          // Add the card to the target column
          newColumns[targetColumnId].cards.push(droppedCard);

          setColumns(newColumns);
        }
      }
    } catch (error) {
      console.error('Error parsing dropped card JSON:', error);
    }
  };

  const handleInputChange = (e, columnId) => {
    const newColumns = { ...columns };
    newColumns[columnId].inputText = e.target.value;
    setColumns(newColumns);
  };

  const handleAddCard = (columnId) => {
    const text = columns[columnId].inputText.trim();
    if (text) {
      const newColumns = { ...columns };
      const newCard = { id: Date.now().toString(), text };
      newColumns[columnId].cards.push(newCard);
      newColumns[columnId].inputText = '';
      setColumns(newColumns);
    }
  };

  return (
    <div className="App">
      <h1>OrganizeMe</h1>
      <div className="columns-container">
        {Object.keys(columns).map((columnId) => (
          <div key={columnId} className="column" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, columnId)}>
            <h2>{columns[columnId].title}</h2>
            <div className="card-list">
              {columns[columnId].cards.map((card) => (
                <div
                  key={card.id}
                  className="card"
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, card, columnId)}
                >
                  {card.text}
                </div>
              ))}
            </div>
            <div className="card-form">
              <input
                type="text"
                placeholder="Enter task"
                value={columns[columnId].inputText}
                onChange={(e) => handleInputChange(e, columnId)}
              />
              <button onClick={() => handleAddCard(columnId)}>Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;


