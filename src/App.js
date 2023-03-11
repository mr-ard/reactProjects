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
      </div>
    );
  }
}

export default App;
