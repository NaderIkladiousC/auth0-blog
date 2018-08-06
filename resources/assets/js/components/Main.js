import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Product from './Product.js';
import UpdateProduct from './UpdateProduct.js';
import AddProduct from './AddProduct.js';
 
/* Main Component */
class Main extends Component {
 
  constructor() {
   
    super();
    //Initialize the state in the constructor
    this.state = {
        products: [],
        currentProduct: null
    }

    this.handleAddProduct = this.handleAddProduct.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  /*componentDidMount() is a lifecycle method
   * that gets called after the component is rendered
   */
  componentDidMount() {
    /* fetch API in action */
    fetch('/api/products')
        .then(response => {
            return response.json();
        })
        .then(products => {
            //Fetched product is stored in the state
            this.setState({ products });
        });
  }
 
 renderProducts() {
    return this.state.products.map(product => {
        return (
            /* When using list you need to specify a key
             * attribute that is unique for each list item
            */
            <li onClick={() => this.handleClick(product)}
                key={product.id} >
                { product.title } 
            </li>      
        );
    })
  }

  handleClick(product) {
    this.setState({currentProduct: product});
  }

  handleAddProduct(product) {
    product.price = Number(product.price);
    product.availability = Number(product.availability);
    fetch( 'api/products', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => {
        return response.json();
    })
    .then( data => {
        this.setState((prevState) => ({
            products: prevState.products.concat(data),
            currentProduct: data
        }))
    })
  }

  handleDelete() {
    const currentProduct = this.state.currentProduct;
    fetch('api/products/' + this.state.currentProduct.id,
        { method: 'delete' })
        .then(response => {
            var array = this.state.products.filter(function(item) {
            return item !== currentProduct
            });

            this.setState({ products: array, currentProduct: null});
        });
  }

  handleUpdate(product) {
    const currentProduct = this.state.currentProduct;
    product.price = Number(product.price);
    product.availability = Number(product.availability);
    fetch( 'api/products/' + currentProduct.id, {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        var array = this.state.products.filter(function(item) {
            return item !== currentProduct
        })
        this.setState({
            products: array.concat(data),
            currentProduct: data
        })
    })
  }
   
  render() {
    return (
        <div style={{display: 'flex'}}>
            <div style={{width: '25%', backgroundColor: '#eee', margin: '10px'}}>
                <h3> All products </h3>
                <ul style={{listStyleType: 'none'}}>
                    { this.renderProducts() }
                </ul>
            </div>
            <div style={{width: '75%', margin: '10px'}}>
                <Product product={this.state.currentProduct} handleDelete={this.handleDelete}/>
                <UpdateProduct onUpdate={this.handleUpdate} onUpdate={this.handleUpdate}/>
                <AddProduct onAdd={this.handleAddProduct} />
            </div>
        </div> 
       
    );
  }
}

export default Main;
 
if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}