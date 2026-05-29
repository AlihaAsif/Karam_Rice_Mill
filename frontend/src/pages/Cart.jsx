import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import AboutNavbar from "../components/layout/AboutNavbar";
import Footer from "../components/layout/Footer";
import { useTranslation } from "react-i18next";
import "./Cart.css";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const { t } = useTranslation();

  const generateWhatsAppMessage = () => {
    let message = "Hello! I am interested in getting the price for the following products:\n\n";
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - Quantity: ${item.quantity}\n`;
    });
    return encodeURIComponent(message);
  };

  return (
    <>
      <AboutNavbar />
      <div className="cart-page-container">
        <h1>{t('cart.your_cart')}</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart-message">
            <p>{t('cart.empty')}</p>
            <Link to="/store" className="back-to-store-btn">{t('cart.browse_products')}</Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item">
                  <img src={item.image || "/product-placeholder.png"} alt={item.name} className="cart-item-img" />
                  
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="cart-item-category">{t('cart.category')}: {item.category}</p>
                  </div>
                  
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                    </div>
                    
                    <button className="remove-item-btn" onClick={() => removeFromCart(item._id)}>
                      {t('cart.remove')}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>{t('cart.order_summary')}</h2>
              <p>{t('cart.total_items')}: {cartItems.reduce((acc, item) => acc + item.quantity, 0)}</p>
              
              <div className="whatsapp-checkout-container">
                <p className="checkout-note">
                  {t('cart.price_note')}
                </p>
                <a 
                  href={`https://wa.me/923000000000?text=${generateWhatsAppMessage()}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="whatsapp-checkout-btn"
                >
                  <i className="fa-brands fa-whatsapp"></i> {t('cart.whatsapp_for_price')}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
