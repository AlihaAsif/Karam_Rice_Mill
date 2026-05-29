import "./TeamSection.css";
import { FaShareAlt, FaTwitter, FaFacebookF, FaGoogle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function TeamSection() {
  const { t } = useTranslation();

  const team = [
    { name: "M. Ikram", role: t('team.ceo'), image: "/CEO.jpeg" },
    { name: "M. Asif", role: t('team.director_sales'), image: "/DirectorSales.jpeg" },
    { name: "M. Kashif", role: t('team.managing_director'), image: "ManagingDirector.jpeg" },
  ];

  return (
    <div className="team-wrapper">
      <section className="team-section">
       
        <div className="team-header">
          <p className="team-tagline">{t('team.tagline')}</p>
          <h2 className="team-title">{t('team.title')}</h2>
        </div>

       
        <div className="team-cards">
          {team.map((member, index) => (
            <div className="team-card" key={index}>
              <img src={member.image} alt={member.name} className="team-img" />
              <div className="team-info">
                <div className="share-wrapper">
                  <button className="share-btn">
                    <FaShareAlt />
                  </button>
                  <div className="share-popup">
                    <a href="#"><FaTwitter /></a>
                    <a href="#"><FaFacebookF /></a>
                    <a href="#"><FaGoogle /></a>
                  </div>
                </div>
                <div className="team-text">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}