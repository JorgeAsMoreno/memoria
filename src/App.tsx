import React, { useState, useEffect } from 'react';
import { cardsImages } from './data';
import Card from './components/Card/Card';
import './App.css';

interface ICards {
  src: string
  animal: string
}

function App() {
  const [cards, setCards] = useState<ICards[]>([])

  useEffect(() => {
    setCards(cardsImages)
  }, [])

  return (
    <div className="App">
      {
        cards.map((card) => (
          <Card />
        ))
      }
    </div>
  );
}

export default App;
