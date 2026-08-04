import { useState } from "react";
import { products, categories } from "./assets/data";
import {
  Cable,
  Headphones,
  Laptop,
  Mouse,
  Settings,
  TabletSmartphone,
} from "lucide-react";

function CategoryIcon(category) {
  switch (category.icon) {
    case "mouse":
      return <Mouse className="h-5 w-5 text-blue-600" />;
    case "laptop":
      return <Laptop className="h-5 w-5 text-blue-600" />;
    case "tablet-smartphone":
      return <TabletSmartphone className="h-5 w-5 text-blue-600" />;
    case "headphones":
      return <Headphones className="h-5 w-5 text-blue-600" />;
    case "cable":
      return <Cable className="h-5 w-5 text-blue-600" />;
    default:
      return <Settings className="h-5 w-5 text-blue-600" />;
  }
}

export default function Home() {
  /**
   * Your code goes here.
   * Tailwind CSS has been installed and configured but it is not strictly required.
   */
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id ?? "");
  const [amount, setAmount] = useState(1);
  const [cart, setCart] = useState([]);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === Number(selectedCategory)
        );

  const selectedProduct = products.find(
    (product) => product.id === Number(selectedProductId)
  );

  const onAddItem = () => {
    const amountValue = Number(amount);

    if (!selectedProduct) {
      alert("Please select a product.");
      return;
    }
    if (isNaN(amountValue) || amountValue <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    if (amountValue > selectedProduct.inventory) {
      alert("Not enough inventory available.");
      return;
    }

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.productId === selectedProduct.id
      );

      if (existingItemIndex === -1) {
        return [...prevCart, { productId: selectedProduct.id, amount: amountValue }];
      }

      const nextCart = [...prevCart];
      nextCart[existingItemIndex] = {
        ...nextCart[existingItemIndex],
        amount: nextCart[existingItemIndex].amount + amountValue,
      };
      return nextCart;
    });
  };

  const cartAmount = cart.reduce((sum, item) => sum + item.amount, 0);
  const cartTotalPrice = cart.reduce((sum, item) => {
    const product = products.find((product) => product.id === item.productId);
    return sum + (product?.sellPrice ?? 0) * item.amount;
  }, 0);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
        <label htmlFor="selectCategory" style={{ width: "140px", textAlign: "left" }}>
          Select Category:
        </label>
        <select
          id="selectCategory"
          name="selectCategory"
          style={{ width: "200px" }}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
        <label htmlFor="selectProduct" style={{ width: "140px", textAlign: "left" }}>
          Select Product:
        </label>
        <select
          id="selectProduct"
          name="selectProduct"
          style={{ width: "200px" }}
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
        >
          <option value="">-- Select a product --</option>
          {filteredProducts.map((product) => (
            <option key={product.id} value={product.id}>
              {product.title}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
        <label htmlFor="amount" style={{ width: "140px", textAlign: "left" }}>
          Amount:
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          min="1"
          value={amount}
          onChange={(e) => setAmount(Math.max(1, Number(e.target.value) || 1))}
          style={{ width: "80px" }}
        />
      </div>
      <div style={{ marginTop: "24px" }}>
        <button
          onClick={onAddItem}
          style={{
            padding: "8px 16px",
            backgroundColor: "#3b82f6",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Item
        </button>
      </div>
      <div style={{ marginTop: "24px" }}>
        <div>Amount: {cartAmount}</div>
        <div>Total price: {cartTotalPrice}</div>
        {cart.length > 0 && (
          <ul style={{ marginTop: "12px" }}>
            {cart.map((item) => {
              const product = products.find(
                (product) => product.id === item.productId
              );
              return (
                <li key={item.productId}>
                  {product?.title ?? "Unknown product"} x {item.amount} = {(product?.sellPrice ?? 0) * item.amount}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
