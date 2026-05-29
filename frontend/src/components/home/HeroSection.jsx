import { Link } from "react-router-dom";
import "./HeroSection.css";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const slides = [
  "/hero1.png",
  "/hero2.png",
  "/hero3.png",
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const { t } = useTranslation();

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero">
      <div
        className="slides-container"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="slide"
            style={{ backgroundImage: `url(${slide})` }}
          />
        ))}
      </div>

      <div className="hero-content" style={{ textAlign: 'center' }}>
        <p className="tagline">{t('home.hero_subtitle')}</p>

        <h1 dangerouslySetInnerHTML={{ __html: t('home.hero_title') }}></h1>

       <Link to="/about" className="hero-discover-btn">{t('home.explore_products')}</Link>
      </div>

      <div className="arrow left" onClick={prevSlide}>
        <FaChevronLeft />
      </div>

      <div className="arrow right" onClick={nextSlide}>
        <FaChevronRight />
      </div>
    </div>
  );
}