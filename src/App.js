import React, { useState } from 'react';
import './App.css';
import Column from './Column';

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
  const [selectedCard, setSelectedCard] = useState(null);

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
          const newColumns = { ...columns };
          newColumns[sourceColumnId].cards = newColumns[sourceColumnId].cards.filter(
            (card) => card.id !== droppedCard.id
          );

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

  const handleInputKeyPress = (e, columnId) => {
    if (e.key === 'Enter') {
      handleAddCard(columnId);
    }
  };

  const handleCardClick = (cardId) => {
    setSelectedCard(cardId);
  };

  const handleDeleteClick = (columnId) => {
    if (selectedCard !== null) {
      const newColumns = { ...columns };
      newColumns[columnId].cards = newColumns[columnId].cards.filter(
        (card) => card.id !== selectedCard
      );
      setSelectedCard(null);
      setColumns(newColumns);
    }
  };

  return (
    <div className="App">
      <h1>OrganizeMe</h1>
      <div className="columns-container">
        {Object.keys(columns).map((columnId) => (
          <Column
            key={columnId}
            columnId={columnId}
            column={columns[columnId]}
            selectedCard={selectedCard}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleInputChange={handleInputChange}
            handleAddCard={handleAddCard}
            handleInputKeyPress={handleInputKeyPress}
            handleCardClick={handleCardClick}
            handleDeleteClick={handleDeleteClick}
          />
        ))}
      </div>
      <footer className="footer">
        &copy; {new Date().getFullYear()} Developed and designed by Julia Hiller. All Rights Reserved.
      </footer>
    </div>
  );
}

export default App;







