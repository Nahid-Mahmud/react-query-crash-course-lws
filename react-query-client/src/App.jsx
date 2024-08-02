import { useState } from "react";
import "./App.css";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";

function App() {
  // useState for selecting id from the product list
  const [selectedId, setSelectedId] = useState(1);

  return (
    <div className="flex">
      <ProductList setSelectedId={setSelectedId} selectedId={selectedId} />
      <ProductDetails id={selectedId} />
    </div>
  );
}

export default App;
