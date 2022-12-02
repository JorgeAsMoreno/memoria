import React, { useState, useEffect } from 'react'
import { cardsImages } from './data'
import styled, { keyframes } from 'styled-components'
import Card from './components/Card/Card'
import moon from './assets/icons/moon.svg'
import sun from './assets/icons/sun.svg'
import devices from './utils/devices'

interface ICards {
  id: number
  frontFace: string
  name: string
}

const gradient = keyframes`
  0% {
    color: #cf59e6;
  }

  50% {
    color: #6bc5f8;
  }

  100% {
    color: #cf59e6;
  }
`;

const gradientButton = keyframes`
  0% {
    background: #cf59e6;
  }

  50% {
    background: #6bc5f8;
  }

  100% {
    background: #cf59e6;
  }
`;

const AppContainer = styled.div`
  align-items: center;
  justify-content: space-around;
  display: flex;
  background: var(--background);
  flex-direction: column;

  @media screen and ${devices.desktop} {
    flex-direction: row;
  }
`

const Headings = styled.div`
  p {
    width: 20em;
  }

  button {
    animation: ${gradientButton} 4s ease infinite;
    border-radius: 1em;
    color: #fff;
    cursor: pointer;
    background: transparent;
    padding: 1em 4em;
    border: 0;
  }
`

const Title = styled.h1`
  color: var(--color);
  font-size: 3em;
  margin: 0;
  text-align: center;

  span {
    animation: ${gradient} 4s ease infinite;
  }
`

const ToggleThemeButton = styled.button`
  background: var(--color);
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  position: absolute;
  top: 2em;
  left: 2em;

  img {
    width: 4em;
  }
`

const CardsContainer = styled.div`
  box-shadow: 0px 0px 15px 0px rgba(181,181,181,.2);
  border-radius: 2.5em;

  @media screen and ${devices.desktop} {
    width: 1000px;
  }
`

function App() {
  const [disabledCards, setDisabledCards] = useState<Array<number>>([])
  const [unFlipCard, setUnflipCard] = useState<Array<number>>([])
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
      <Headings>
        <Title>Juego de <span>Memoria</span></Title>
        <p>
        El jugador escoge dos cartas, si son iguales, se quedarán boca arriba; si las dos
        cartas que escogió son diferentes, las cartas se colocan boca abajo en el mismo
        lugar.
        </p>
        <button>Iniciar juego!</button>
      </Headings>
      <CardsContainer>
        {
          cards.map(({ name, frontFace, id}) => (
            <Card {...{name, frontFace, flipCard, unFlipCard, disabledCards}} number={id} key={id} />
          ))
        }
      </CardsContainer>
    </AppContainer>
  );
}

export default App;
