import "./AboutNavbar.css";
import { FaFacebookF, FaInstagram, FaYoutube, FaShoppingCart, FaGlobe, FaBars, FaTimes } from "react-icons/fa";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useTranslation } from "react-i18next";

export default function AboutNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ur' : 'en';
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <div className={`about-navbar-wrapper ${scrolled ? "about-navbar-sticky" : ""}`}>
      {/* Top Row */}
      <div className="about-topbar">
        <div className="about-logo">
          <img src="/logo.png" alt="KRM Logo" />
        </div>

        <div className="about-top-info">
          <div className="about-socials">
            <FaFacebookF />
            <FaInstagram />
            <FaYoutube />
          </div>

          <div className="about-divider" />

          <div className="about-contact-item">
            <MdPhone className="about-icon" />
            <div>
              <span>Call anytime</span>
              <strong>+92 301 551111</strong>
            </div>
          </div>

          <div className="about-divider" />

          <div className="about-contact-item">
            <MdEmail className="about-icon" />
            <div>
              <span>Send email</span>
              <strong>karamricemill@gmail.com</strong>
            </div>
          </div>

          <div className="about-divider" />

          <div className="about-contact-item">
            <MdLocationOn className="about-icon" />
            <div>
              <span>6Km Hujra Depalpur</span>
              <strong>Okara, Pakistan</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="about-navlinks">
        {/* Hamburger Toggle */}
        <div className="about-hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Overlay */}
        {mobileMenuOpen && <div className="about-nav-overlay" onClick={() => setMobileMenuOpen(false)} />}

        <ul className={`about-menu ${mobileMenuOpen ? "about-menu-open" : ""}`}>
          <li><Link to="/">{t('nav.home')}</Link></li>
          <li className="about-dropdown">
            <Link to="/about">{t('nav.about')}</Link>
            <ul className="about-dropdown-menu">
              <li><Link to="/managing-director">{t('nav.managing_director')}</Link></li>
              <li><Link to="/ceo">{t('nav.ceo')}</Link></li>
              <li><Link to="/director-sales">{t('nav.director_sales')}</Link></li>
            </ul>
          </li>
          <li><Link to="/store">{t('nav.online_store')}</Link></li>
          <li><Link to="/our-process">{t('nav.our_process')}</Link></li>
          <li><Link to="/e-catalog">{t('nav.e_catalog')}</Link></li>
          <li><Link to="/news">{t('nav.news')}</Link></li>
          <li><Link to="/contact">{t('nav.contact')}</Link></li>
        </ul>

        <div className="about-nav-icons" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div className="language-switcher" onClick={toggleLanguage} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' }}>
            <FaGlobe />
            <span>{i18n.language === 'en' ? 'UR' : 'EN'}</span>
          </div>
          
          <Link to="/cart" style={{ position: 'relative', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <FaShoppingCart style={{ cursor: 'pointer' }} />
            {cartItemCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-10px',
                background: 'red',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '10px',
                fontWeight: 'bold'
              }}>
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}