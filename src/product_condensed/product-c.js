import React, { Component } from "react";
import "./product-c.css";
import Dataservice from "../services/dataservice";

let ds = new Dataservice();

class ProductC extends Component {
  constructor(props) {
    super(props);
    this.removeProduct = this.removeProduct.bind(this);
  }

  removeProduct = () => {
    ds.removeWishlistItem(this.props.product);
  };
  render() {
    return (
      <li className="list-group-item pc-c">
        <a
          className="btn btn-outline-danger x"
          onClick={() => this.removeProduct()}
        >
          X
        </a>
        <p>
          {this.props.product.title} | <b>${this.props.product.price}</b>
        </p>
      </li>
    );
  }
}

export default ProductC;
