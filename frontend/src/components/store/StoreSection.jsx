import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "./StoreSection.css";

export default function StoreSection() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const location = useLocation();

  useEffect(() => {
    // Read search param from URL
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("search");
    if (searchQuery) {
      setSearch(searchQuery);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
        const { data } = await axios.get(`${API_URL}/products`);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ["All", ...new Set(products.map(p => p.category))];

  const filtered = products
    .filter((p) =>
      activeCategory === "All" ? true : p.category === activeCategory
    )
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "az") return a.name.localeCompare(b.name);
      if (sort === "za") return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <section className="store-section">
    
      <aside className="store-sidebar">
        <div className="store-categories">
          <h4>{t('store.categories')}</h4>
          <ul>
            <li 
              className={activeCategory === "All" ? "active-cat" : ""}
              onClick={() => setActiveCategory("All")}
            >
              {t('store.all')} <span>›</span>
            </li>
            {categories.filter(cat => cat !== "All").map((cat) => (
              <li
                key={cat}
                className={activeCategory === cat ? "active-cat" : ""}
                onClick={() => setActiveCategory(cat)}
              >
                {t('categories.' + cat, {defaultValue: cat})} <span>›</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

    
      <div className="store-content">
       
        <div className="store-topbar">
          <p className="store-result-count">
            {t('store.showing_results')} {filtered.length}
          </p>
          <select
            className="store-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">{t('store.default_sorting')}</option>
            <option value="az">{t('store.sort_az')}</option>
            <option value="za">{t('store.sort_za')}</option>
          </select>
        </div>

      
        <div className="store-grid">
          {loading ? (
            <p>Loading products...</p>
          ) : filtered.length > 0 ? (
            filtered.map((product) => (
              <div className="store-card" key={product._id}>
                <div className="store-card-img">
                  <img src={product.image} alt={product.name} />
                  <div className="store-card-overlay">
                    <Link to={`/store/${product._id}`} className="read-more-btn">
                      {t('store.read_more')}
                    </Link>
                  </div>
                </div>
                <h3 className="store-card-name">{product.name}</h3>
              </div>
            ))
          ) : (
            <p className="no-results">{t('store.no_products')}</p>
          )}
        </div>
      </div>
    </section>
  );
}