import React, { useState, useEffect } from 'react'
import ReactCardFlip from 'react-card-flip'
import backFace from '../../assets/images/cover.png'

interface ICard {
  frontFace: string
  name: string
  number: number
  flipCard: (number: number, name: string) => 0 | 1
  unFlipCard: number[]
  disabledCards: number[]
}

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
    <div>
      <ReactCardFlip {...{isFlipped}}>
        <img src={backFace} alt={`${name}-back-face`} onClick={handleClickCard} />
        <img src={frontFace} alt={`${name}-front-face`} onClick={handleClickCard} />
      </ReactCardFlip>
    </div>
  )
}

export default Card
