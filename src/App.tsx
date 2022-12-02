import React, { useState, useEffect } from 'react'
import { cardsImages } from './data'
import styled from 'styled-components'
import Card from './components/Card/Card'
import moon from './assets/icons/moon.svg'
import sun from './assets/icons/sun.svg'
import devices from './utils/devices'
import { gradient, gradientButton, showBoard } from './animations/animations.styles'

interface ICards {
  id: number
  frontFace: string
  name: string
}

const AppContainer = styled.div`
  align-items: center;
  justify-content: space-around;
  display: flex;
  background: var(--background);
  flex-direction: column;

  @media screen and ${devices.desktop} {
    flex-direction: row;
    height: 100vh;
  }
`

const Headings = styled.div`
  p {
    color: var(--color);
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
  box-shadow: 0px 0px 15px 0px rgba(181,181,181,.8);
  border-radius: 2.5em;
  overflow: hidden;

  &.disabled-board {
    margin-top: 120%;
  }

  &.active-board {
    animation: ${showBoard} 2s ease;
  }

  @media screen and ${devices.desktop} {
    width: 1000px;
  }
`

function App() {
  const [disabledCards, setDisabledCards] = useState<Array<number>>([])
  const [unFlipCard, setUnflipCard] = useState<Array<number>>([])
  const [theme, setTheme] = useState<string>('light')
  const [cards, setCards] = useState<ICards[]>([])
  const [isDisabledBoard, setisDisabledBoard] = useState<boolean>(true)
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
      firstCard.name === secondCard.name ? disableCards() : unFlipCards()
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
      <Headings className={isDisabledBoard ? 'disabled-board' : 'active-board'}>
        <Title>Juego de <span>Memoria</span></Title>
        <p>
        El jugador escoge dos cartas, si son iguales, se quedarán boca arriba; si las dos
        cartas que escogió son diferentes, las cartas se colocan boca abajo en el mismo
        lugar.
        </p>
        {
          isDisabledBoard ?
          <button onClick={() => setisDisabledBoard(false)}>Iniciar juego!</button> :
          <button onClick={() => setCards(cardsImages.sort(() => { return Math.random() - 0.5 }))}>Reiniciar juego</button>
        }
      </Headings>
      <CardsContainer className={isDisabledBoard ? 'disabled-board' : 'active-board'}>
        {
          cards.map(({ name, frontFace, id}) => (
            <Card {...{name, frontFace, flipCard, unFlipCard, disabledCards }} number={id} key={id} />
          ))
        }
      </CardsContainer>
    </AppContainer>
  );
}

export default App;
