import "./WhoWeAre.css";
import { FaPhoneAlt, FaCogs } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function WhoWeAre() {
  const { t } = useTranslation();
  return (
    <section className="who">
      <div className="who-container">

        <div className="who-left">
          <span className="small-title">{t('who_we_are.small_title')}</span>
          <h2>{t('who_we_are.title')}</h2>

          <p>
            {t('who_we_are.desc')}
          </p>

          <div className="feature">
            <FaCogs className="feature-icon" />
            <span>{t('who_we_are.advanced_milling')}</span>
          </div>

          <div className="contact-box">
            <div className="phone-icon">
              <FaPhoneAlt />
            </div>
            <div>
              <p className="call-text">{t('who_we_are.call_anytime')}</p>
              <h4>+92-321-5551111</h4>
            </div>
          </div>
        </div>

        <div className="who-right">
          <img src="/factory.jpg" alt="Factory" />
          <div className="experience-box">
            <h3>25+</h3>
            <p>{t('who_we_are.years_experience')}</p>
          </div>
        </div>

      </div>
    </section>
  );
}