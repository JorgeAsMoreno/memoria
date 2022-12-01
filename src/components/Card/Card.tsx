import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import backFace from '../../images/cover.png'

interface ICard {
  frontFace: string
  name: string
  number: number
}

const Card: React.FC<ICard> = ({ name, number, frontFace }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false)

  return (
    <div>
      <ReactCardFlip {...{isFlipped}}>
        <img src={backFace} alt={`${name}-back-face`} onClick={() => setIsFlipped(prev => !prev)} />
        <img src={frontFace} alt={`${name}-front-face`} onClick={() => setIsFlipped(prev => !prev)} />
      </ReactCardFlip>
    </div>
  )
}

export default Card
