import React, { useState } from 'react';
import './App.css';

function App() {
  const [cards, setCards] = useState([
    { id: '1', text: 'Card 1' },
    { id: '2', text: 'Card 2' },
    { id: '3', text: 'Card 3' },
  ]);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData('card', JSON.stringify(card));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetCard) => {
    e.preventDefault();
    const droppedCardJSON = e.dataTransfer.getData('card');

    try {
      const droppedCard = JSON.parse(droppedCardJSON);
      if (droppedCard && droppedCard.id) {
        const droppedIndex = cards.findIndex((c) => c.id === droppedCard.id);

        const newCards = [...cards];
        newCards.splice(droppedIndex, 1); 
        newCards.splice(cards.indexOf(targetCard), 0, droppedCard); 

        setCards(newCards);
      }
    } catch (error) {
      console.error('Error parsing dropped card JSON:', error);
    }
  };

  return (
    <div className="App">
      <h1>OrganizeMe</h1>
      <div className="card-container" onDragOver={handleDragOver}>
        {cards.map((card) => (
          <div
            key={card.id}
            className="card"
            draggable="true"
            onDragStart={(e) => handleDragStart(e, card)}
            onDrop={(e) => handleDrop(e, card)} 
          >
            {card.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

