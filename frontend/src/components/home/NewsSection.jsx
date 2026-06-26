import "./NewsSection.css";
import { FaUser, FaComment } from "react-icons/fa";
import { Link } from "react-router-dom";  
import { useTranslation } from "react-i18next";

function NewsSection() {
  const { t } = useTranslation();
  return (
    <section className="news">
      <div className="news-container">
        <span className="news-small">{t('news_section.small_title')}</span>
        <h2>{t('news_section.title')}</h2>

        <div className="news-cards">

      
          <Link to="/news/news-1" className="news-card">
            <div className="news-image">
              <img src="/blog1.jpg" alt="" />
              <span className="news-date">23 December 2025</span>
            </div>
            <div className="news-info">
              <div className="news-meta">
                <span><FaUser /> Aliha</span>
                <span><FaComment /> {t('news_section.comments')}</span>
              </div>
              <h3>{t('news_section.n1_title')}</h3>
            </div>
          </Link>

      
          <Link to="/news/news-2" className="news-card">
            <div className="news-image">
              <img src="/blog2.jpg" alt="" />
              <span className="news-date">23 December 2025</span>
            </div>
            <div className="news-info">
              <div className="news-meta">
                <span><FaUser /> Aliha</span>
                <span><FaComment /> {t('news_section.comments')}</span>
              </div>
              <h3>{t('news_section.n2_title')}</h3>
            </div>
          </Link>

       
          <Link to="/news/news-3" className="news-card">
            <div className="news-image">
              <img src="/mill.jpg" alt="" />
              <span className="news-date">23 December 2025</span>
            </div>
            <div className="news-info">
              <div className="news-meta">
                <span><FaUser /> Aliha</span>
                <span><FaComment /> {t('news_section.comments')}</span>
              </div>
              <h3>{t('news_section.n3_title')}</h3>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}

export default NewsSection;
