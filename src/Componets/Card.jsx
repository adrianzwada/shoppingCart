import React from 'react'
import StyledCard from '../styled-components/StyledCard'

const Card = ({ item, onAddToCart }) => {
	const { name, id, price } = item

	return (
		<StyledCard>
			<h2>{name}</h2>
			<div>Cena: {price}</div>
			<button
				onClick={() => {
					onAddToCart({ name, id, price })
				}}
			>
				Dodaj do koszyka
			</button>
		</StyledCard>
	)
}

export default Card
