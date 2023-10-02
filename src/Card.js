import React from 'react';

function Card({ text }) {
  return (
    <div className="card" draggable="true">
      {text}
    </div>
  );
}

export default Card;
