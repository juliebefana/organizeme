import React, { useState } from 'react';
import './App.css';
import Column from './Column';
import Card from './Card';

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

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
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
      <h1>Task Board</h1>
      <div className="columns-container">
        {Object.keys(columns).map((columnId) => (
          <Column
            key={columnId}
            title={columns[columnId].title}
            cards={columns[columnId].cards}
            inputText={columns[columnId].inputText}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, columnId)}
            onInputChange={(e) => handleInputChange(e, columnId)}
            onAddCard={() => handleAddCard(columnId)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;



