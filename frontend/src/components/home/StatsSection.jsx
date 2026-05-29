import "./StatsSection.css";
import { FaSeedling, FaTractor, FaUserTie, FaUsers } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function StatsSection() {
  const { t } = useTranslation();
  const stats = [
    {
      icon: <FaSeedling />,
      number: "350",
      text: t('stats.franchises'),
    },
    {
      icon: <FaTractor />,
      number: "8,800",
      text: t('stats.production'),
    },
    {
      icon: <FaUserTie />,
      number: "9,280",
      text: t('stats.farmers'),
    },
    {
      icon: <FaUsers />,
      number: "250",
      text: t('stats.team'),
    },
  ];

  return (
    <section className="stats">
      <div className="stats-container">
        {stats.map((item, index) => (
          <div className="stat-card" key={index}>
            <div className="icon">{item.icon}</div>
            <div className="divider"></div>
            <h2>{item.number}</h2>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}