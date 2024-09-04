var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://localhost/swag-shop");
var Product = require("./models/product");
var WishList = require("./models/Whislist");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/product", function (req, res) {
  var product = new Product();

  product.title = req.body.title;
  product.price = req.body.price;

  product
    .save()
    .then((savedProduct) => {
      res.status(200).send(savedProduct);
    })
    .catch((err) => {
      res.status(500).send({ error: "Could not save product" });
    });
});

app.get("/product", (req, res) => {
  Product.find({})
    .then((products) => res.status(200).send(products))
    .catch((err) =>
      res.status(500).send({ error: "Could not fetch products" })
    );
});

app.get("/wishlist", (req, res) => {
  WishList.find({})
    .populate({ path: "products", model: "Product" })
    .then((wishlists) => res.status(200).send(wishlists))
    .catch((err) =>
      res.status(500).send({ error: "Could not fetch wishlists" })
    );
});

app.get("/wishlist/:id", (req, res) => {
  WishList.find({ _id: req.params.id })
    .populate({ path: "products", model: "Product" })
    .then((wishList) => res.status(200).send(wishList))
    .catch((err) =>
      res.status(500).send({ error: "Could not fetch wish list" })
    );
});

app.post("/wishlist", (req, res) => {
  var wishList = new WishList();
  wishList.title = req.body.title;

  wishList
    .save()
    .then((newWishList) => res.status(200).send(newWishList))
    .catch((err) =>
      res.status(500).send({ error: "Could not create wish list" })
    );
});

app.put("/wishlist/product/add", async (req, res) => {
  try {
    // Find the product using async/await
    const product = await Product.findOne({ _id: req.body.productId });

    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    // Update the wishlist with the product ID
    const wishList = await WishList.updateOne(
      { _id: req.body.wishListId },
      { $addToSet: { products: product._id } }
    );
    if (!wishList) {
      return res.status(404).send({ error: "Wish list not found" });
    }
    res.status(200).send(wishList);
  } catch (err) {
    res.status(500).send({ error: "Could not add item to wish list" });
  }
});

app.get("/product", function (req, res) {
  res.send("get request");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
