import React from 'react';
import CartItem from './CartItem';
import Cart from './Cart';
import Navbar from './Navbar';
class App extends React.Component {

  constructor(){
    super();
    this.state = {
      products: [
        {
          price: 700,
          title: 'Mobile',
          qty: 1,
          img: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80',
          id: 1
        },
        {
          price: 200,
          title: 'Watch',
          qty: 4,
          img: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
          id: 2
        },
        {
          price: 1000,
          title: 'Laptop',
          qty: 3,
          img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
          id: 3
        }
      ]
    }
  }

  increaseQuantity = (product) => {
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
    products[index].qty = products[index].qty==0 ? 0 : 
                            products[index].qty - 1;

    this.setState({
        products: products
    })
  }

  handleDelete = (product) => {
    const {products} = this.state;
    const index = products.indexOf(product);
    console.log("Deleted "+index);
    products.splice(index, 1);

    this.setState({
        products
    })
  }
  onHandleDelete = (id) => {
    const {products} = this.state;

    const items = products.filter((item) => item.id !==id);
    console.log("Deleted "+id);
    this.setState({
        products: items
    })
  }

  getCartCount = () =>{
    const {products} = this.state;
    let count=0;
    products.forEach((product) => { count += product.qty});

    return count;
  }

  getTotalPrice = () => {
    const {products} = this.state;
    let totalPrice = 0;
    products.forEach((product) => totalPrice += product.qty*product.price);
    return totalPrice;
    
  }

  render() {
    const {products} = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()}/>
        <Cart
          products={this.state.products}
          increaseQuantity={this.increaseQuantity}
          decreaseQuantity={this.decreaseQuantity}
          handleDelete={this.handleDelete}
          onHandleDelete={this.onHandleDelete}
        /> 
        <div style={{padding:10, fontSize: 20}}>TOTAL: {this.getTotalPrice()}</div> 
      </div>
    );
  }
}

export default App;
