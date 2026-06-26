import "./Testimonials.css";
import { FaStar, FaQuoteRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function Testimonials() {
  const { t } = useTranslation();
  return (
    <section className="testimonials">

      <div className="test-container">

        <span className="test-small">{t('testimonials.small_title')}</span>
        <h2>{t('testimonials.title')}</h2>

        <div className="test-cards">

        
          <div className="test-card">

            <div className="stars">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>

            <p>
              {t('testimonials.t1_desc')}
            </p>

            <div className="test-user">
              <img src="/logo.png" alt="" />
              <div>
                <h4>{t('testimonials.t1_author')}</h4>
                <span>{t('testimonials.customer')}</span>
              </div>

              <div className="quote">
                <FaQuoteRight />
              </div>
            </div>

          </div>


         
          <div className="test-card">

            <div className="stars">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>

            <p>
              {t('testimonials.t2_desc')}
            </p>

            <div className="test-user">
              <img src="/logo.png" alt="" />
              <div>
                <h4>{t('testimonials.t2_author')}</h4>
                <span>{t('testimonials.customer')}</span>
              </div>

              <div className="quote">
                <FaQuoteRight />
              </div>
            </div>

          </div>


          
          <div className="test-card">

            <div className="stars">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>

            <p>
              {t('testimonials.t3_desc')}
            </p>

            <div className="test-user">
              <img src="/logo.png" alt="" />
              <div>
                <h4>{t('testimonials.t3_author')}</h4>
                <span>{t('testimonials.customer')}</span>
              </div>

              <div className="quote">
                <FaQuoteRight />
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Testimonials;
