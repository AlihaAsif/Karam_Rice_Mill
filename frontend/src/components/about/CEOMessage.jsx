import "./CEOMessage.css";
import { MdLocationOn } from "react-icons/md";
import { useTranslation } from "react-i18next";

export default function CEOMessage() {
  const { t } = useTranslation();
  return (
    <div className="ceo-wrapper">
      <section className="ceo-section">

        <div className="ceo-image-side">
          <div className="ceo-img-frame">
            <img src="/CEO.jpeg" alt="Chief Executive Officer" />
          </div>

          <div className="ceo-exp-box">
            <h3>25+</h3>
            <p>{t('ceo_msg.years_exp')}</p>
          </div>
        </div>

        <div className="ceo-content">
          <p className="ceo-tagline">karamricemills.com</p>

          <h1 className="ceo-title">{t('ceo_msg.title')}</h1>

          <p className="ceo-desc">{t('ceo_msg.desc')}</p>

          <p className="ceo-name">{t('ceo_msg.name')}</p>

          <div className="ceo-contact-box">
            <div className="ceo-phone-icon">
              <MdLocationOn />
            </div>
            <div className="ceo-contact-text">
              <span>{t('ceo_msg.call_anytime')}</span>
              <strong>+92-300-54321781</strong>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
