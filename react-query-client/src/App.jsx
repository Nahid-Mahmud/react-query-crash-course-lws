import { useState } from "react";
import "./App.css";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";

function App() {
  // useState for selecting id from the product list

  return (
    <div className="flex m-2">
      <AddProduct />
      <ProductList />
      <ProductDetails />
    </div>
  );
}

export default App;
