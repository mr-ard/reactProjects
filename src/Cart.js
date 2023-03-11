import React from 'react';
import CartItem from './CartItem';

const Cart = (props) => {
    // const { products } = props;
    const products = props.products;
    return(
        <div className="cart">
            {products.map((product) => {
                return (
                <CartItem 
                    product={product} 
                    key={product.id} 
                    increaseQuantity={props.increaseQuantity}
                    decreaseQuantity={props.decreaseQuantity}
                    handleDelete={props.handleDelete}
                    onHandleDelete={props.onHandleDelete}
                />
                )
            })}
        </div>
    )
}

export default Cart; 