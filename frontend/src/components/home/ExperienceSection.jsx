import "./ExperienceSection.css";
import { useTranslation } from "react-i18next";

function ExperienceSection() {
  const { t } = useTranslation();
  return (
    <section className="experience">

      <div className="exp-header">

        <div className="exp-left">
          <span className="exp-small">{t('experience.small_title')}</span>
          <h2>{t('experience.title')}</h2>
        </div>

        <div className="exp-right">
          <p>
            {t('experience.desc')}
          </p>
        </div>

      </div>

      <div className="exp-cards">

        <div className="exp-card">
          <img src="/product1-2.png" alt="" />

          <div className="exp-overlay">
            <h3 dangerouslySetInnerHTML={{ __html: t('experience.packaging') }}></h3>

            <p className="exp-desc">
              {t('experience.packaging_desc')}
            </p>
          </div>
        </div>


        <div className="exp-card">
          <img src="/exp2.jpg" alt="" />

          <div className="exp-overlay">
            <h3 dangerouslySetInnerHTML={{ __html: t('experience.polishing') }}></h3>

            <p className="exp-desc">
              {t('experience.polishing_desc')}
            </p>
          </div>
        </div>


        <div className="exp-card">
          <img src="/exp3.jpg" alt="" />

          <div className="exp-overlay">
            <h3 dangerouslySetInnerHTML={{ __html: t('experience.milling') }}></h3>

            <p className="exp-desc">
              {t('experience.milling_desc')}
            </p>
          </div>
        </div>

      </div>

    </section>
  );
}

export default ExperienceSection;
