import React, { useState, useEffect } from 'react'
import { cardsImages } from './data'
import Card from './components/Card/Card'
import './App.css'

interface ICards {
  frontFace: string
  name: string
}

function App() {
  const [cards, setCards] = useState<ICards[]>([])

  useEffect(() => {
    setCards(cardsImages)
  }, [])

  return (
    <div className="App">
      {
        cards.map(({ name, frontFace }, index) => (
          <Card {...{name, frontFace}} number={index} />
        ))
      }
    </div>
  );
}

export default App;
