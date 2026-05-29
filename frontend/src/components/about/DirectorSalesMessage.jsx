import "./DirectorSalesMessage.css";
import { MdLocationOn } from "react-icons/md";
import { useTranslation } from "react-i18next";

export default function DirectorSalesMessage() {
  const { t } = useTranslation();
  return (
    <div className="director-wrapper">
      <section className="director-section">

       
        <div className="director-image-side">
          <div className="director-img-frame">
            <img src="/DirectorSales.jpeg" alt="Director Sales & Purchase" />
          </div>

          <div className="director-exp-box">
            <h3>25+</h3>
            <p>Years Experience</p>
          </div>
        </div>

       
        <div className="director-content">
          <p className="director-tagline">{t('ds_msg.tagline')}</p>

          <h1 className="director-title">{t('ds_msg.title')}</h1>

          <p className="director-desc">{t('ds_msg.desc')}</p>

          <p className="director-name">{t('ds_msg.name')}</p>

          <div className="director-contact-box">
            <div className="director-phone-icon">
              <MdLocationOn />
            </div>
            <div className="director-contact-text">
              <span>{t('ds_msg.call_anytime')}</span>
              <strong>+92-300-543218</strong>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}