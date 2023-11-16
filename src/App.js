import React, { useReducer } from 'react'
import './App.css'
import Card from './Componets/Card'
import ShoppingBucket from './Componets/ShoppingBucket'
import StyledGrid from './styled-components/StyledGrid'

const initialTasks = [
	{ name: 'Banan', id: 1, count: 1, price: 10 },
	{ name: 'Jabłko', id: 2, count: 1, price: 7 },
	{ name: 'Pomarańcza', id: 3, count: 1, price: 50 },
	{ name: 'Kiwi', id: 4, count: 1, price: 5 },
	{ name: 'Winogrono', id: 5, count: 1, price: 20 },
]

const initialState = { count: 0, cart: [] }

const reducer = (state, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return { count: state.count + action.price, cart: state.cart }
		case 'ADD_TO_CART':
			return addToCart(state, action.item)
		case 'REMOVE_FROM_CART':
			return removeFromCart(state, action.id)
		case 'REMOVE_ALL_FROM_CART':
			return removeAllFromCart(state, action.id)
		default:
			return state
	}
}

const addToCart = (state, newItem) => {
	const cart = state.cart || []

	const existingItemIndex = cart.findIndex(item => item.id === newItem.id)

	if (existingItemIndex !== -1) {
		const updatedCart = cart.map(item => (item.id === newItem.id ? { ...item, count: item.count + 1 } : item))
		return {
			...state,
			cart: updatedCart,
		}
	}

	const newCart = [...cart, { ...newItem, count: 1 }]
	return {
		...state,
		cart: newCart,
	}
}

const removeFromCart = (state, itemId) => {
	console.log('Before removal:', state.cart)
	if (!state.cart) {
		return state
	}
	const updatedCart = state.cart
		.map(item => (item.id === itemId ? { ...item, count: item.count - 1 } : item))
		.filter(item => item.count > 0)
	console.log('After removal:', updatedCart)

	return {
		...state,
		cart: updatedCart,
	}
}

const removeAllFromCart = (state, itemId) => {
	console.log('Before removal:', state.cart, state.cart.name)

	const updatedCart = state.cart ? state.cart.filter(item => item.id !== itemId) : []
	console.log('After removal:', updatedCart)
	return {
		...state,
		cart: updatedCart,
	}
}

function App() {
	const initialState = { count: 0, cart: [] }
	const [state, dispatch] = useReducer(reducer, initialState)

	const incrementClick = ({ name, id, price }) => {
		dispatch({ type: 'INCREMENT', price: state.count + price })
		dispatch({ type: 'ADD_TO_CART', item: { name, id, price } })
	}

	const removeAllFromCart = id => {
		dispatch({ type: 'REMOVE_ALL_FROM_CART', id })
	}

	const removeFromCart = id => {
		dispatch({ type: 'REMOVE_FROM_CART', id })
	}

	return (
		<>
			<StyledGrid>
				{initialTasks.map(item => (
					<div key={item.id}>
						<Card item={item} onAddToCart={incrementClick} />
					</div>
				))}
			</StyledGrid>
			<ShoppingBucket
				cart={state.cart}
				count={state.count}
				removeFromCart={removeFromCart}
				removeAllFromCart={removeAllFromCart}
			/>
		</>
	)
}

export default App
