import React, { Component } from "react";
import  "./product.css";
import Dataservice from "../services/dataservice";
import NotificationService, { NOTIF_WISHLIST_CHANGED } from "../services/notification";

let ds = new Dataservice();
let ns = new NotificationService();


class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { onWishlist: ds.itemOnWishlist() };
    this.onButtonclicked = this.onButtonclicked.bind(this);
    this.onWishlistChanged = this.onWishlistChanged.bind(this);
  }

  componentDidMount() {
    ns.addObserver("NOTIF_WISHLIST_CHANGED", this, this.onWishlistChanged);
  }
  componentWillUnmount() {
    ns.removeObserver(this, "NOTIF_WISHLIST_CHANGED");
  }

  onWishlistChanged = (newWishlist) => {
    this.setState({ onWishlist: ds.itemOnWishlist(this.props.Product) });
  };


  onButtonclicked = () => {
    if (this.state.onWishlist) {
      ds.removeWishlistItem(this.props.Product);
    } else {
      ds.addWishlistItem(this.props.Product);
    }
    }

    



  render() {

    var btnClass;
    if (this.state.onWishlist) {
      btnClass = "btn btn-danger bttn-cart";
    } else {
      btnClass = "btn btn-primary bttn-cart";
    }


    return (
      <div className="card product">
        <img className="card-img-top" src={this.props.Product.imgUrl} alt="Product" ></img>
        <div className="card-block">
          <h4 className="card-title title" >TITLE :{this.props.Title}</h4>
          <p className="card-text price">PRICE :{this.props.Price}$</p>
          <a href="" onClick={()=> this.onButtonclicked()} className={btnClass}>{this.state.onWishlist?"Remove from Wishlist": "Add to Cart"}</a>
        </div>
      </div>
    );
  }
} 

export default Product;