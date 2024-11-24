import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Footer } from './components/Footer';
// import { createContext} from 'react';
// import { CartContext } from './CartContext';
import { CartProvider } from './context/CartProvider';
import { UserContextProvider } from './context/userContext';

function App() {
  // const Cart = createContext(CartContext);
  // let cartItems = [];

  return (
    <div className="App">
      <UserContextProvider>
        <CartProvider>
          <Navbar />
          <Outlet />
          <Footer />
        </CartProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
