import "./ProductsSection.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ProductsSection() {
  const { t } = useTranslation();

  const products = [
    {
      title: t('products_section.quality_assured'),
      image: "/product1.png",
      name: t('products_section.karam_sella'),
      desc: t('products_section.premium_long_grain'),
      path: "/store/sella-1121",
    },
    {
      title: t('products_section.global_reach'),
      image: "/product2.png",
      name: t('products_section.karam_steam'),
      desc: t('products_section.high_quality_export'),
      path: "/store/steam-rice",
    },
    {
      title: t('products_section.customer_trust'),
      image: "/product3.png",
      name: t('products_section.karam_golden_sella'),
      desc: t('products_section.trusted_worldwide'),
      path: "/store/golden-sella",
    },
  ];

  return (
    <div className="products-section">
      {products.map((item, index) => (
        <div className="product-card" key={index}>
          <h3>{item.title}</h3>

          <div className="image-container">
            <img src={item.image} alt={item.name} />

            <div className="overlay">
              <h4>{item.name}</h4>
              <p>{item.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
