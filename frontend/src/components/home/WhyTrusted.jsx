import "./WhyTrusted.css";
import { FaCheckCircle, FaTruck } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

function WhyTrusted() {
  const { t } = useTranslation();

  const sectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

  }, []);

  return (
    <section className="trusted" ref={sectionRef}>

      <div className="trusted-container">

      
        <div className="trusted-left">

          <span className="trusted-small">{t('why_trusted.small_title')}</span>

          <h2>{t('why_trusted.title')}</h2>

          <p>
            {t('why_trusted.desc')}
          </p>

          <div className="trusted-list">
            <div><FaCheckCircle /> {t('why_trusted.quality')}</div>
            <div><FaCheckCircle /> {t('why_trusted.satisfaction')}</div>
          </div>

          <div className="progress">

            <div className="progress-item">
              <div className="progress-label">
                <span>{t('why_trusted.integrity')}</span>
                <span>95%</span>
              </div>

              <div className="progress-bar">
                <div className={`progress-fill ${animate ? "fill1" : ""}`}></div>
              </div>

            </div>


            <div className="progress-item">

              <div className="progress-label">
                <span>{t('why_trusted.sustainability')}</span>
                <span>90%</span>
              </div>

              <div className="progress-bar">
                <div className={`progress-fill ${animate ? "fill2" : ""}`}></div>
              </div>

            </div>

          </div>

        </div>


      

        <div className="trusted-right">

          <div className="trusted-badge">
            <FaTruck />
            <span>{t('why_trusted.certified')}</span>
          </div>

          <img src="/mill.jpg" alt="rice mill" />

        </div>

      </div>

    </section>
  );
}

export default WhyTrusted;
