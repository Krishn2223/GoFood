import "./App.css";
import Home from "./Screens/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Signup from "./Screens/Signup.js";
import Login from "./Screens/Login.js";
import { CartProvider } from "./components/ContextReducer.js";
import MyOrders from "./Screens/MyOrders.js";





function App() {
  return (
    <CartProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/createuser" element={<Signup/>} />
          <Route exact path="/myOrder" element={<MyOrders/>} />
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
