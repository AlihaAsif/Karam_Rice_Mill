import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/home";
import About from "./pages/about";
import Store from "./pages/store";
import OurProcess from "./pages/ourprocess";
import CEO from "./pages/ceo";
import ManagingDirector from "./pages/managingdirector";
import DirectorSales from "./pages/directorsales";
import ProductDetails from "./pages/ProductDetails";
// import Sella1121Page from "./pages/sella1121";
// import GoldenSellaPage from "./pages/goldensella";
// import SteamRicePage from "./pages/steamrice";

import ECatalogPage from "./pages/ecatalog";
import Contact from "./pages/contact";
import News from "./pages/news";
import News1 from "./pages/news1";
import News2 from "./pages/news2";
import News3 from "./pages/news3";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Cart from "./pages/Cart";

function App() {
  const location = useLocation();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);




  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/:id" element={<ProductDetails />} />
        <Route path="/our-process" element={<OurProcess />} />
        <Route path="/ceo" element={<CEO />} />
        <Route path="/managing-director" element={<ManagingDirector />} />
        <Route path="/director-sales" element={<DirectorSales />} />
        <Route path="/e-catalog" element={<ECatalogPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/news-1" element={<News1 />} />
        <Route path="/news/news-2" element={<News2 />} />
        <Route path="/news/news-3" element={<News3 />} />
        <Route path="/cart" element={<Cart />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
