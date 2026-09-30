import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <div className="app">
        <header>
          <h1>Online Shopping Cart</h1>
          <p>React State Management with useReducer & Context API</p>
        </header>

        <main>
          <ProductList />
          <Cart />
        </main>

        <footer>
          <p>© 2026 Online Shopping Cart</p>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;