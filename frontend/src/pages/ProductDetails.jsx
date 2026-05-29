import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import AboutNavbar from "../components/layout/AboutNavbar";
import Footer from "../components/layout/Footer";
import { useTranslation } from "react-i18next";
import "./ProductDetails.css"; 

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useContext(CartContext);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        setLoading(true);
        const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
        const { data: currentProduct } = await axios.get(`${API_URL}/products/${id}`);
        setProduct(currentProduct);
        setMainImage(currentProduct.image || "/product-placeholder.png");
        const { data: allProducts } = await axios.get(`${API_URL}/products`);
        const related = allProducts.filter(p => p._id !== id).slice(0, 2);
        setRelatedProducts(related);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(t('product_details.no_reviews') ? "Product not found or there was an error." : "Product not found");
        setLoading(false);
      }
    };
    fetchProductAndRelated();
  }, [id, t]);

  if (loading) {
    return (
      <>
        <AboutNavbar />
        <div style={{ textAlign: 'center', padding: '100px' }}>{t('product_details.loading')}</div>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <AboutNavbar />
        <div style={{ textAlign: 'center', padding: '100px' }}>
          <h2>{error || "Product not found."}</h2>
          <Link to="/store" className="btn-primary" style={{ display: 'inline-block', marginTop: '20px' }}>{t('product_details.back_to_store')}</Link>
        </div>
        <Footer />
      </>
    );
  }

  const defaultImageUrl = product.image || "/product-placeholder.png";
  const secondThumbnailUrl = "/product1-2.png";

  return (
    <>
      <AboutNavbar />
      <div className="product-details-page">

        {/* Top Section */}
        <div className="product-main-section">
          <div className="product-image-side">
            <img src={mainImage} alt={product.name} className="main-image" />
            <div className="thumbnail-gallery">
              <img src={defaultImageUrl} alt="thumbnail 1"
                className={`thumbnail ${mainImage === defaultImageUrl ? 'active-thumb' : ''}`}
                onClick={() => setMainImage(defaultImageUrl)} />
              <img src={secondThumbnailUrl} alt="thumbnail 2"
                className={`thumbnail ${mainImage === secondThumbnailUrl ? 'active-thumb' : ''}`}
                onClick={() => setMainImage(secondThumbnailUrl)} />
            </div>
          </div>

          <div className="product-info-side">
            <h1>{product.name}</h1>
            <p className="short-desc" dangerouslySetInnerHTML={{ __html: t('product_details.short_desc') }}></p>
            <h2 className="delivery-info">{t('product_details.free_delivery')}</h2>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '20px' }}>
              <button 
                onClick={() => {
                  addToCart(product);
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 3000);
                }} 
                className="btn-primary" 
                style={{ padding: '12px 24px', fontSize: '1.1rem', cursor: 'pointer', border: 'none', borderRadius: '6px', background: '#e74c3c', color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fa-solid fa-cart-shopping"></i> {t('product_details.add_to_cart')}
              </button>
              {showToast && <span style={{ color: '#27ae60', fontWeight: 'bold', fontSize: '1.1rem' }}>✓ {t('product_details.added_to_cart')}</span>}
            </div>
            <p className="category-info">
              <strong>{t('product_details.category')}:</strong> {t('categories.' + product.category, {defaultValue: product.category})}
            </p>
          </div>
        </div>

        {/* Tabs + Reviews */}
        <ReviewsTab product={product} productId={id} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h2>{t('product_details.related_products')}</h2>
            <div className="related-products-grid">
              {relatedProducts.map(rp => (
                <Link to={`/store/${rp._id}`} className="related-card" key={rp._id}>
                  <img src={rp.image || "/product-placeholder.png"} alt={rp.name} />
                  <h3>{rp.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

// ============================================================
// Sub-component: ReviewsTab (handles tab switching + reviews)
// ============================================================
function ReviewsTab({ product, productId }) {
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewForm, setReviewForm] = useState({ name: '', email: '', rating: 0, review: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState('');
  const { t } = useTranslation();

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

  useEffect(() => {
    if (activeTab === 'reviews') fetchReviews();
  }, [activeTab, productId]);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/reviews/product/${productId}`);
      setReviews(data);
    } catch (err) { console.error("Error fetching reviews:", err); }
  };

  const handleReviewChange = (e) => setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (reviewForm.rating === 0) { alert(t('product_details.please_rate')); return; }
    setSubmitting(true); setSubmitMsg('');
    try {
      await axios.post(`${API_URL}/reviews`, {
        productId, productName: product.name,
        name: reviewForm.name, email: reviewForm.email,
        rating: reviewForm.rating, review: reviewForm.review,
      });
      setSubmitMsg('success');
      setReviewForm({ name: '', email: '', rating: 0, review: '' });
    } catch (err) {
      setSubmitMsg('error');
      console.error(err);
    } finally { setSubmitting(false); }
  };

  const renderStars = (rating) =>
    [1,2,3,4,5].map(s => (
      <i key={s} className={s <= rating ? "fa-solid fa-star" : "fa-regular fa-star"}
        style={{ color: '#f5a623', marginRight: '2px' }}></i>
    ));

  return (
    <div className="product-tabs-section">
      <div className="tabs-header">
        <button className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
          onClick={() => setActiveTab('description')}>{t('product_details.tab_description')}</button>
        <button className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}>
          {t('product_details.tab_reviews')} ({reviews.length})
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'description' && (
          <div className="description-tab">
            <p style={{ whiteSpace: 'pre-wrap', marginBottom: '20px' }}>{product.description}</p>
            <p dangerouslySetInnerHTML={{ __html: t('product_details.market_standards') }}></p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="reviews-tab">
            {/* Approved Reviews List */}
            {reviews.length === 0 ? (
              <p className="no-reviews-text">{t('product_details.no_reviews')}</p>
            ) : (
              <div className="existing-reviews">
                {reviews.map((r) => (
                  <div key={r._id} className="single-review" style={{ borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <strong>{r.name}</strong>
                      <span>{renderStars(r.rating)}</span>
                      <span style={{ color: '#999', fontSize: '0.85rem' }}>{new Date(r.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p style={{ marginTop: '6px', color: '#555' }}>{r.review}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Review Form */}
            <div className="review-form-container">
              <h3>{t('product_details.leave_review')} &ldquo;{product.name}&rdquo;</h3>

              {submitMsg === 'success' && (
                <div style={{ padding: '12px', background: '#e8f5e9', borderRadius: '6px', color: '#2e7d32', marginBottom: '15px' }}>
                  {t('product_details.review_success')}
                </div>
              )}
              {submitMsg === 'error' && (
                <div style={{ padding: '12px', background: '#ffebee', borderRadius: '6px', color: '#c62828', marginBottom: '15px' }}>
                  {t('product_details.review_error')}
                </div>
              )}

              <div className="rating-input" style={{ marginBottom: '15px' }}>
                <span>{t('product_details.your_rating')} <span style={{ color: 'red' }}>*</span></span>
                <span style={{ marginLeft: '10px', cursor: 'pointer' }}>
                  {[1,2,3,4,5].map(star => (
                    <i key={star}
                      className={(hoverRating || reviewForm.rating) >= star ? "fa-solid fa-star" : "fa-regular fa-star"}
                      style={{ color: '#f5a623', fontSize: '20px', marginRight: '3px' }}
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    ></i>
                  ))}
                </span>
              </div>

              <form className="review-form" onSubmit={handleReviewSubmit}>
                <textarea name="review" placeholder={t('product_details.your_review_ph')} required
                  value={reviewForm.review} onChange={handleReviewChange}></textarea>
                <div className="form-row">
                  <input type="text" name="name" placeholder={t('product_details.your_name_ph')} required
                    value={reviewForm.name} onChange={handleReviewChange} />
                  <input type="email" name="email" placeholder={t('product_details.email_ph')} required
                    value={reviewForm.email} onChange={handleReviewChange} />
                </div>
                <button type="submit" className="submit-review-btn" disabled={submitting}>
                  {submitting ? t('product_details.submitting') : t('product_details.submit_review')}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;

