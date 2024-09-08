import React, { Component } from "react";
import "./wishlist.css";
import ProductC from "../product_condensed/product-c";
import Dataservice from "../services/dataservice";
import NotificationService, {
  NOTIF_WISHLIST_CHANGED,
} from "../services/notification";

let ns = new NotificationService();
class Whishlist extends Component {
  constructor(props) {
    super(props);
    this.state = { wishlist: [] };

    this.createWishlist = this.createWishlist.bind(this);
    this.onWishlistChanged = this.onWishlistChanged.bind(this);
  }
  componentDidMount() {
    ns.addObserver("NOTIF_WISHLIST_CHANGED", this, this.onWishlistChanged);
  }
  componentWillUnmount() {
    ns.removeObserver(this, "NOTIF_WISHLIST_CHANGED");
  }

  onWishlistChanged = (newWishlist) => {
    this.setState({ wishlist: newWishlist });
  };

  createWishlist = () => {
    const list = this.state.wishlist.map((product) => (
      <ProductC product={product} key={product._id} />
    ));
    return list;
  };
  render() {
    return (
      <div className="card product ">
        <div className="card-block">
          <h4 className="card-title title">Title :{this.props.Title}</h4>
          <ul className="list-group list-group-flush">
            {this.createWishlist()}
          </ul>
        </div>
      </div>
    );
  }
}

export default Whishlist;
