import { useState } from "react";
import { FaWhatsapp, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Sella1121.css";

const images = ["/product3.png", "/product1-2.png"];

const relatedProducts = [
  { id: 1, name: "1121 Sella", image: "/product1.png", path: "/store/sella-1121" },
  { id: 2, name: "Steam Rice", image: "/product2.png", path: "/store/steam-rice" },
];

export default function GoldenSella() {
  const [mainImage, setMainImage] = useState(images[0]);
  const [activeTab, setActiveTab] = useState("description");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewName, setReviewName] = useState("");
  const [reviewEmail, setReviewEmail] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [reviews, setReviews] = useState([]);

  const handleSubmitReview = () => {
    if (!reviewText || !reviewName || rating === 0) return;
    setReviews([...reviews, { name: reviewName, rating, text: reviewText }]);
    setReviewText("");
    setReviewName("");
    setReviewEmail("");
    setRating(0);
  };

  return (
    <div className="sella-wrapper">
      <section className="sella-section">

      
        <div className="sella-top">

     
          <div className="sella-image-side">
            <img src={mainImage} alt="Golden Sella" className="sella-main-img" />
            <div className="sella-thumbnails">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  className={`sella-thumb ${mainImage === img ? "active" : ""}`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          <div className="sella-content">
            <h1 className="sella-title">Golden Sella</h1>
            <p className="sella-desc">
              At <strong>Karam Rice Mills</strong>, our <strong>Golden Sella</strong> rice is
              carefully parboiled and processed to achieve a rich golden colour and firm texture.
              Sourced from the finest paddy, it is hygienically milled and expertly packaged to
              preserve its <strong>natural aroma, texture, and nutritional value</strong>.
            </p>
            <h2 className="sella-delivery">Free home delivery in Okara</h2>
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noreferrer"
              className="sella-whatsapp-btn"
            >
              <FaWhatsapp className="sella-whatsapp-icon" />
              Contact on WhatsApp
            </a>
            <p className="sella-category"><strong>Category:</strong> Rice</p>
          </div>
        </div>

      
        <div className="sella-tabs-wrapper">
          <div className="sella-tabs">
            <button
              className={`sella-tab-btn ${activeTab === "description" ? "active" : ""}`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={`sella-tab-btn ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews ({reviews.length})
            </button>
          </div>
          <div className="sella-tab-divider" />

          {activeTab === "description" && (
            <div className="sella-tab-content">
              <p>
                At <strong>Karam Rice Mills</strong>, our <strong>Golden Sella</strong> is a
                premium parboiled rice known for its distinct golden hue, long grain, and
                non-sticky texture after cooking. It is processed under strict quality control
                standards to preserve its <strong>natural aroma, texture, and nutritional value</strong>.
              </p>
              <p style={{ marginTop: "20px" }}>
                With a strong commitment to excellence, we deliver rice that meets both{" "}
                <strong>local and international market standards</strong>, making it ideal for
                households, wholesalers, exporters, and food businesses.
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="sella-tab-content">

              {reviews.length === 0 ? (
                <p className="no-reviews-text">There are no reviews yet.</p>
              ) : (
                <div className="reviews-list">
                  {reviews.map((r, i) => (
                    <div key={i} className="review-item">
                      <div className="review-stars">
                        {[1, 2, 3, 4, 5].map(s => (
                          <FaStar key={s} style={{ color: s <= r.rating ? "#e0a500" : "#ccc" }} />
                        ))}
                      </div>
                      <p className="review-name"><strong>{r.name}</strong></p>
                      <p className="review-text">{r.text}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="review-form">
                <h3>Be the first to review "Golden Sella"</h3>

                <label className="save-checkbox">
                  <input
                    type="checkbox"
                    checked={saveInfo}
                    onChange={e => setSaveInfo(e.target.checked)}
                  />
                  Save my name, email, and website in this browser for the next time I comment.
                </label>

                <div className="rating-row">
                  <span>Your rating</span>
                  <div className="star-picker">
                    {[1, 2, 3, 4, 5].map(s => (
                      <span
                        key={s}
                        className={`star-pick ${s <= (hoverRating || rating) ? "active" : ""}`}
                        onClick={() => setRating(s)}
                        onMouseEnter={() => setHoverRating(s)}
                        onMouseLeave={() => setHoverRating(0)}
                      >★</span>
                    ))}
                  </div>
                </div>

                <textarea
                  className="review-textarea"
                  placeholder="Your Review..."
                  value={reviewText}
                  onChange={e => setReviewText(e.target.value)}
                />

                <div className="review-inputs-row">
                  <input
                    type="text"
                    className="review-input"
                    placeholder="Your Name"
                    value={reviewName}
                    onChange={e => setReviewName(e.target.value)}
                  />
                  <input
                    type="email"
                    className="review-input"
                    placeholder="Email Address"
                    value={reviewEmail}
                    onChange={e => setReviewEmail(e.target.value)}
                  />
                </div>

                <button className="submit-review-btn" onClick={handleSubmitReview}>
                  Submit Review
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="related-products">
          <h3 className="related-title">Related products</h3>
          <div className="related-grid">
            {relatedProducts.map(product => (
              <div className="related-card" key={product.id}>
                <div className="related-card-img">
                  <img src={product.image} alt={product.name} />
                  <div className="related-card-overlay">
                    <Link to={product.path} className="related-read-more">
                      Read more
                    </Link>
                  </div>
                </div>
                <h4 className="related-card-name">{product.name}</h4>
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}