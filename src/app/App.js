import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import HttpService from "../services/http-service";
import Product from "../product/product";

import Wishlist from "../Wishlist/wishlist";
import ProductC from "../product_condensed/product-c";

const http = new HttpService();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
    this.loadData = this.loadData.bind(this);
    this.ProductList = this.ProductList.bind(this);
    this.loadData();
  }

  loadData = () => {
    var self = this;
    http.getProducts().then(
      (DATA) => {
        self.setState({ products: DATA });
      },
      (err) => {}
    );
  };

  ProductList = () => {
    const list = this.state.products.map((product) => (
      <div className="col-sm-4" key={product._id}>
        <Product product={product} key={product._id} />
      </div>
    ));
    return list;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="logo">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <h2 className="App-title">Welcome to Manthan's Data</h2>
        </header>

        <div className="App-Main container-fluid">
          <div className="row">
            <div className="col-sm-8">{this.ProductList()}</div>
          </div>
          <div className="col-sm-4">
            <Wishlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
