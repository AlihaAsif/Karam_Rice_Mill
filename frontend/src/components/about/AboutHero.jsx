import "./AboutHero.css";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AboutHero() {
  const { t } = useTranslation();
  return (
    <div className="about-hero-wrapper">
      <section className="about-hero">
     
        <div className="about-hero-left">
          <img src="/factory.jpg" alt="Rice Mill" className="mill-img" />
          <img src="/product1.png" alt="Rice Bag" className="bag-img" />
        </div>

       
        <div className="about-hero-right">
          <p className="about-tagline">{t('about_hero.tagline')}</p>
          <h1 className="about-title">{t('about_hero.title')}</h1>
          <p className="about-highlight">{t('about_hero.highlight')}</p>
          <p className="about-desc">{t('about_hero.desc')}</p>

          <ul className="about-features">
            <li><FaCheck className="check-icon" /> {t('about_hero.feat1')}</li>
            <li><FaCheck className="check-icon" /> {t('about_hero.feat2')}</li>
            <li><FaCheck className="check-icon" /> {t('about_hero.feat3')}</li>
          </ul>

        <Link to="/contact" className="about-contact-btn">{t('about_hero.contact_btn')}</Link>
        </div>
      </section>
    </div>
  );
}
