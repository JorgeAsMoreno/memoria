import React, { useState } from 'react'
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
      <img src={backFace} alt={`${name}-back-face`} />
      <img src={frontFace} alt={`${name}-front-face`} />
    </div>
  )
}

export default Card
