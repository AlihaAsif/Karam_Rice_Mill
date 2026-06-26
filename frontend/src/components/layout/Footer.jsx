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
            <span className="cta-label">{t('footer.cta_tagline')}</span>

            <h2>
              {t('footer.cta_title')}
            </h2>

            <p>{t('footer.cta_subtitle')}</p>
          </div>

          <Link to="/about" className="cta-btn">{t('home.explore_products')}</Link>
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
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
            </div>
          </div>

        
          <div className="footer-col">
            <h4>{t('footer.quick_links')}</h4>

            <ul>
              <li><Link to="/about">{t('nav.about')}</Link></li>
              <li><Link to="/store">{t('nav.online_store')}</Link></li>
              <li><Link to="/our-process">{t('nav.our_process')}</Link></li>
              <li><Link to="/managing-director">{t('nav.managing_director')}</Link></li>
              <li><Link to="/news">{t('nav.news')}</Link></li>
              <li><Link to="/contact">{t('nav.contact')}</Link></li>
            </ul>
          </div>

         
          <div className="footer-col">
            <h4>{t('footer.news')}</h4>

            <div className="footer-news">
              <Link to="/news/news-1" className="news-item">
                <img src="/blog1.jpg" />
                <div>
                  <p>{t('news_articles.news1.title')}</p>
                  <span>December 23, 2025</span>
                </div>
              </Link>

              <Link to="/news/news-2" className="news-item">
                <img src="/blog2.jpg" />
                <div>
                  <p>{t('news_articles.news2.title')}</p>
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
            {t('footer.developed_by')}
            <span className="developer"> Webms.pk</span>
          </p>

          <div className="footer-links">
            <a href="#">{t('footer.terms_of_use')}</a>
            <a href="#">{t('footer.privacy_policy')}</a>
          </div>
        </div>
      </footer>
    </>
  );
}
