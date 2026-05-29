import "./Footer.css";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaTiktok,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <>
      <section className="cta">
        <div className="cta-container">
          <div className="cta-text">
            <span className="cta-label">Rice Market Leaders</span>

            <h2>
              Trusted rice exporters delivering purity, aroma, and excellence
              from Pakistan to the world.
            </h2>

            <p>Pakistan Best Rice Exporter</p>
          </div>

          <Link to="/about" className="cta-btn">Discover More</Link>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">

         
          <div className="footer-col">
            <img src="/logo.png" className="footer-logo" />

            <p>
              {t('footer.description')}
            </p>

            <div className="socials">
              <FaLinkedin />
              <FaInstagram />
              <FaFacebook />
              <FaTiktok />
            </div>
          </div>

        
          <div className="footer-col">
            <h4>{t('footer.quick_links')}</h4>

            <ul>
              <li><Link to="/about">{t('nav.about')}</Link></li>
              <li><Link to="/store">{t('nav.online_store')}</Link></li>
              <li><Link to="/our-process">{t('nav.our_process')}</Link></li>
              <li><Link to="/about">{t('nav.managing_director')}</Link></li>
              <li><Link to="/news">{t('nav.news')}</Link></li>
              <li><Link to="/contact">{t('nav.contact')}</Link></li>
            </ul>
          </div>

         
          <div className="footer-col">
            <h4>News</h4>

            <div className="footer-news">
              <Link to="/news/news-1" className="news-item">
                <img src="/blog1.jpg" />
                <div>
                  <p>The Journey of Rice – From Farm to Global Markets</p>
                  <span>December 23, 2025</span>
                </div>
              </Link>

              <Link to="/news/news-2" className="news-item">
                <img src="/blog2.jpg" />
                <div>
                  <p>Why Advanced Rice Milling Technology</p>
                  <span>December 23, 2025</span>
                </div>
              </Link>
            </div>
          </div>

       
          <div className="footer-col">
            <h4>{t('nav.contact')}</h4>

            <div className="contact">
              <p>
                <FaPhone /> +92-321-5551111
              </p>
              <p>
                <FaEnvelope /> karamricemill@gmail.com
              </p>
              <p>
                <FaMapMarkerAlt /> 6Km Hujra Depalpur Road Okara, Punjab,
                Pakistan
              </p>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <p>
            © All Copyright 2025 Reserved Developed by
            <span className="developer"> Webms.pk</span>
          </p>

          <div className="footer-links">
            <a href="#">Terms of Use</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </>
  );
}