import React from 'react'

const ShoppingBucket = ({ cart, count, removeFromCart, removeAllFromCart }) => {
	if (!cart) {
		console.error('Cart is undefined!')
		return null
	}

	return (
		<>
			<div>Do zapłaty: {cart.reduce((total, item) => total + item.price * item.count, 0)}</div>

			<section>
				<div>
					Zawartość koszyka:
					{cart.map(item => (
						<div key={item.id}>
							<p>Nazwa: {item.name}</p>
							<p>Cena: {item.price}</p>
							<p>Ilość: {item.count}</p>
							<button onClick={() => removeFromCart(item.id)}>Usuń 1 przedmiot</button>
							<button onClick={() => removeAllFromCart(item.id)}>Usuń przedmioty</button>
						</div>
					))}
				</div>
			</section>
		</>
	)
}

export default ShoppingBucket
