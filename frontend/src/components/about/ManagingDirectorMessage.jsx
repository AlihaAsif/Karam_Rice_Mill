import "./ManagingDirectorMessage.css";
import { MdLocationOn } from "react-icons/md";
import { useTranslation } from "react-i18next";

export default function ManagingDirectorMessage() {
  const { t } = useTranslation();
  return (
    <div className="md-wrapper">
      <section className="md-section">

       
        <div className="md-image-side">
          <div className="md-img-frame">
            <img src="/ManagingDirector.jpeg" alt="Managing Director" />
          </div>

          <div className="md-exp-box">
            <h3>25+</h3>
            <p>{t('md_msg.years_exp')}</p>
          </div>
        </div>

      
        <div className="md-content">
          <p className="md-tagline">karamricemills.com</p>

          <h1 className="md-title">{t('md_msg.title')}</h1>

          <p className="md-desc">
            <p>{t('md_msg.desc')}</p>
          </p>

          <p className="md-name">{t('md_msg.name')}</p>

          <div className="md-contact-box">
            <div className="md-phone-icon">
              <MdLocationOn />
            </div>
            <div className="md-contact-text">
              <span>{t('md_msg.call_anytime')}</span>
              <strong>+92-321-543219</strong>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
