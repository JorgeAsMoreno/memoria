import React, { useState, useEffect } from 'react'
import { cardsImages } from './data'
import Card from './components/Card/Card'
import styled from 'styled-components'
import moon from './assets/icons/moon.svg'
import sun from './assets/icons/sun.svg'

interface ICards {
  frontFace: string
  name: string
}

const AppContainer = styled.div`
  align-items: center;
  background: var(--background);
  display: flex;
  flex-flow: wrap;
  height: 100vh;
  justify-content: center;
  position: relative;
  width: 100vw;
`

const ToggleThemeButton = styled.button`
  background: transparent;
  border: 0;
  position: absolute;
  top: 0;
  right: 0;

  img {
    width: 5em;
  }
`

function App() {
  const [theme, setTheme] = useState<string>('light')
  const [cards, setCards] = useState<ICards[]>([])
  const [firstCard, setFirstCard] = useState<{
    name: string;
    number: number;
  }>({
    name: '',
    number: 0,
  });

  const [secondCard, setSecondCard ] = useState<{
    name: string;
    number: number;
  }>({
    name: '',
    number: 0,
  });
  const [disabledCards, setDisabledCards] = useState<Array<number>>([])
  const [unFlipCard, setUnflipCard] = useState<Array<number>>([])

  useEffect(() => {
    setCards(cardsImages.sort(() => { return Math.random() - 0.5 }))
  }, [])

  useEffect(() => {
    validateSameCard()
  }, [secondCard])

  const handleSwitchTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const flipCard = (number: number, name: string) => {
    if(firstCard.number === number && firstCard.name === name) {
      return 0
    }
    if (!firstCard.name) {
      setFirstCard({ name, number})
    } else if (!secondCard.name) {
      setSecondCard({ name, number })
    }
    return 1
  }
  
  const validateSameCard = () => {
    if (firstCard.name && secondCard.name) {
      const match = firstCard.name === secondCard.name
      match ? disableCards() : unFlipCards()
    }
  }

  const disableCards = () => {
    setDisabledCards([firstCard.number, secondCard.number])
    resetCards()

  }

  const unFlipCards = () => {
    setUnflipCard([firstCard.number, secondCard.number])
    resetCards()
  }

  const resetCards = () => {
    setFirstCard({
      name: '',
      number: 0,
    })
    setSecondCard({
      name: '',
      number: 0,
    })
  }

  return (
    <AppContainer data-theme={theme}>
      <ToggleThemeButton onClick={handleSwitchTheme}>
        <img
          alt={`icon-${theme}`}
          onClick={handleSwitchTheme}  
          src={theme === 'light' ? moon : sun}
        />
      </ToggleThemeButton>
        {
          cards.map(({ name, frontFace }, index) => (
            <Card {...{name, frontFace, flipCard, unFlipCard, disabledCards}} number={index} />
          ))
        }
    </AppContainer>
  );
}

export default App;
