import React, { useState, useEffect } from 'react'
import ReactCardFlip from 'react-card-flip'
import styled from 'styled-components'
import backFace from '../../assets/images/cover.png'
import devices from '../../utils/devices'

interface ICard {
  name: string
  number: number
  frontFace: string
  unFlipCard: number[]
  disabledCards: number[]
  flipCard: (number: number, name: string) => 0 | 1
}

const Image = styled.img`
  box-shadow: 0px 0px 15px 0px #1a1611;
  background: #1a1611;
  cursor: pointer;
  margin: 1em 0;
  width: 8em;
`

export const CardContainer = styled.div`
  display: inline-block;
  height: calc(200px - 10px);
  width: 50%;
  text-align: center;
  
  @media screen and ${devices.desktop} {
    width: calc(250px - 10px);
  }
`

const Card: React.FC<ICard> = ({ name, number, frontFace, flipCard, unFlipCard, disabledCards }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false)

  useEffect(() => {
    if (unFlipCard.includes(number)) {
      setTimeout(() => {
        setIsFlipped(false)
      }, 700)
    }
  }, [unFlipCard])

  const handleClickCard = () => {
    const value = flipCard(number, name)
    if (value !== 0) {
      setIsFlipped(!isFlipped)
    }
  }

  return (
    <CardContainer>

    <ReactCardFlip {...{isFlipped}}>
      <Image src={backFace} alt={`${name}-back-face`} onClick={handleClickCard} />
      <Image src={frontFace} alt={`${name}-front-face`} onClick={handleClickCard} />
    </ReactCardFlip>
    </CardContainer>
  )
}

export default Card
