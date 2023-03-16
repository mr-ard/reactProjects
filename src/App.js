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

  addProduct = () => {
    firebase
    .firestore()
    .collection('products')
    .add({
      img:'https://cdn.thewirecutter.com/wp-content/media/2021/09/ipad2021-2048px-9886-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=1024',
      price: 600,
      qty: 2,
      title: 'Tab'
    })
    .then((docRef) => {
      console.log('Product added ', docRef)
    })
    .catch((error) =>{
      console.log('Error: ', error);
    })
  }

  increaseQuantity = (product) => {
    const {products} = this.state;
    const index = products.indexOf(product);
// to increase the quantity only in the web page and not the firebase...
  /*
    products[index].qty += 1;

    this.setState({
        products: products
    })
  */

// to increase qty in firebase => call onShanpshot() => call setState => reRender...

    const docRef = firebase.firestore().collection('products').doc(products[index].id);
    docRef.update({
      qty: products[index].qty + 1
    })
    .then(() => {
      console.log('Updated Successfully')
    })
    .catch((error) => {
      console.log('Error: ', error);
    })


  }

  decreaseQuantity = (product) => {
    const {products} = this.state;
    const index = products.indexOf(product);
// to decrease the quantity only in the web page and not the firebase...  
    /*
    products[index].qty = products[index].qty==0 ? 0 : 
                            products[index].qty - 1;

    this.setState({
        products: products
    })
    */
// to decrease qty in firebase => call onShanpshot() => call setState => reRender...

    const docRef = firebase.firestore().collection('products').doc(products[index].id);
    docRef.update({
      qty: products[index].qty == 0 ? 0 : products[index].qty - 1
    })
    .then(() => {
      console.log('Decreased Successfully')
    })
    .catch((error) => {
      console.log('Error: ', error)
    })

  }

  handleDelete = (product) => {
    const {products} = this.state;
    const index = products.indexOf(product);
    // console.log("Deleted "+index);
    // products.splice(index, 1);

    // this.setState({
    //     products
    // })

    const docRef = firebase.firestore().collection('products').doc(products[index].id);
    docRef.delete()
    .then(() => {
      console.log('Deleted Successfully: ', docRef)
    })
    .catch((error) => {
      console.log('Error: ', error)
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
        <button onClick={this.addProduct} stylr={{padding: 20, fontSize:20}}>Add a product</button>
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
