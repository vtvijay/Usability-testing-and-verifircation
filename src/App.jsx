import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./components/Home/Home.jsx";
import About from "./components/About/about.jsx";
import Button from "./components/Button/Button.jsx"
import Products from "./components/Products/Products.jsx"
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx"
import Info from "./components/About/info/info.jsx"
import Offers from "./components/About/offers/Offers.jsx"
import { useState } from "react";

const App = () => {

  const [loggedIn, setLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = () => {
    setIsLoading(true)
    //call to handle Login
    setTimeout(() => {
      setLoggedIn(!loggedIn)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div data-testid="App" className="App">
      <nav data-testid="main_nav">
        <h1 data-testid="brandName">The Clothing Company</h1>
        <NavLink data-testid="Home_Link" to="/">
          Home
        </NavLink>
        <NavLink data-testid="About_Link" to="/about">
          About
        </NavLink>
        <NavLink data-testid="Product_Link" to="/products">
          Products
        </NavLink>
        <Button value={loggedIn}
          isLoading={isLoading}
          displayTrue={"Logout"}
          displayFalse={"Login"}
          handleLogin={handleLogin}
        />
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} >
          <Route path="info" element={<Info />} />
          <Route path="offers" element={<Offers />} >
            <Route path=":id/:type" element={<ProductDetails />} />
          </Route>
        </Route>
        <Route path="/products" element={<Products isUserLoggedIn={loggedIn} isLoading={isLoading} />} />
        {loggedIn && (
          <Route path="/products/:id/:type" element={<ProductDetails />} />
        )}
        <Route path="*" element={<h3 className="error">ROUTE NOT FOUND</h3>} />
      </Routes>
    </div>
  );
};

export default App;
 