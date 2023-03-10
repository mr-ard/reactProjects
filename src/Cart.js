import React from 'react';
import CartItem from './CartItem';

class Cart extends React.Component{
    constructor(){
        super();
        this.state = {
            products: [
                {
                    price: 700,
                    title: 'Mobile',
                    qty: 1,
                    img: '',
                    id: 1
                },
                {
                    price: 200,
                    title: 'Watch',
                    qty: 4,
                    img: '',
                    id: 2
                },
                {
                    price: 1000,
                    title: 'Laptop',
                    qty: 3,
                    img: '',
                    id: 3
                }
            ]
        }
    }
    increaseQuantity = (product) => {
        // console.log("Increase qty of: "+ product.title)
        const {products} = this.state;
        const index = products.indexOf(product);

        products[index].qty += 1;

        this.setState({
            products: products
        })
    }

    decreaseQuantity = (product) => {
        const {products} = this.state;
        const index = products.indexOf(product);
        // products[index].qty -= 1;
        products[index].qty = products[index].qty==0 ? 0 : 
                                products[index].qty - 1;

        this.setState({
            products: products
        })
    }
    render(){
        const {products} = this.state;
        return(
            <div className="cart">
                {products.map((product) => {
                    return (
                    <CartItem 
                        product={product} 
                        key={product.id} 
                        increaseQuantity={this.increaseQuantity}
                        decreaseQuantity={this.decreaseQuantity}
                    />
                    )
                })}
            </div>
        )
    }
       
}

export default Cart; 