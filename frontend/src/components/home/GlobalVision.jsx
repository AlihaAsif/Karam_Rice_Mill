import "./GlobalVision.css";
import { useTranslation } from "react-i18next";

function GlobalVision() {
  const { t } = useTranslation();
  return (
    <>
     

      <section className="vision-section">

        <div className="vision-container">

      

          <div className="vision-image">
            <img src="/rice_machine.jpg" alt="Rice Machine" />
          </div>


      

          <div className="vision-content">

            <p className="vision-small">{t('vision.small_title')}</p>

            <h2 className="vision-title">{t('vision.title')}</h2>

            <p className="vision-text">
              {t('vision.desc_1')}
              <br/><br/>
              {t('vision.desc_2')}
            </p>



            <div className="vision-cards">

              <div className="vision-card green">
                <div className="icon">🌾</div>
                <h4>{t('vision.fields')}</h4>
              </div>

              <div className="vision-card yellow">
                <div className="icon">👥</div>
                <h4>{t('vision.customers')}</h4>
              </div>

              <div className="vision-card orange">
                <div className="icon">🚜</div>
                <h4>{t('vision.farmers')}</h4>
              </div>

            </div>

          </div>

        </div>

      </section>



      <section className="video-section">

        <div className="video-overlay">

          <a
            href="https://youtu.be/WOFjXLvp3nw?si=KPoeDli-wh64Gyyk"
            target="_blank"
            rel="noreferrer"
            className="play-button"
          >
            ▶
          </a>

          <h2 className="video-title" dangerouslySetInnerHTML={{ __html: t('vision.video_title') }}>
          </h2>

        </div>

      </section>
    </>
  );
}

export default GlobalVision;