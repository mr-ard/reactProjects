import React from 'react';
import CartItem from './CartItem';
import Cart from './Cart';
import Navbar from './Navbar';
// import * as firebase from 'firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// import 'firebase/compat/auth';


class App extends React.Component {

  constructor(){
    super();
    this.state = {
      products: [],
      loading : true
    }
  }

  componentDidMount () {
    firebase
    .firestore()
    .collection('products')
    .onSnapshot((snapshot) => {
      console.log(snapshot)

      snapshot.docs.map((doc) => {
        console.log(doc.data())
      });

      const products = snapshot.docs.map((doc) => {
        const data = doc.data();
        data['id'] = doc.id;
        return data;
      })

      this.setState({
        products,
        loading: false
      })

    })
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
    const {products, loading} = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()}/>
        <Cart
          products={products}
          increaseQuantity={this.increaseQuantity}
          decreaseQuantity={this.decreaseQuantity}
          handleDelete={this.handleDelete}
          onHandleDelete={this.onHandleDelete}
        /> 
        {loading&& <h1>Loading Products...</h1>}
        <div style={{padding:10, fontSize: 20}}>TOTAL: {this.getTotalPrice()}</div> 
      </div>
    );
  }
}

export default App;
