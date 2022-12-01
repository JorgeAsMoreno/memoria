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
  const [cards, setCards] = useState<ICards[]>([])
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    setCards(cardsImages)
  }, [])

  const handleSwitchTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
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
            <Card {...{name, frontFace}} number={index} />
          ))
        }
    </AppContainer>
  );
}

export default App;
