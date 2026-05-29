import { useState, useEffect } from "react";
import axios from "axios";
import AboutNavbar from "../components/layout/AboutNavbar";
import Footer from "../components/layout/Footer";
import { FaUser, FaComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./news1.css";

const NEWS_SLUG = "news-2";
const NEWS_TITLE = "Why Advanced Rice Milling Technology";
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

function News2() {
  const [comments, setComments] = useState([]);
  const [commentForm, setCommentForm] = useState({ name: '', email: '', comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState('');
  const { t } = useTranslation();

  useEffect(() => { fetchComments(); }, []);

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/comments/news/${NEWS_SLUG}`);
      setComments(data);
    } catch (err) { console.error("Error fetching comments:", err); }
  };

  const handleChange = (e) => setCommentForm({ ...commentForm, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); setSubmitMsg('');
    try {
      await axios.post(`${API_URL}/comments`, {
        newsSlug: NEWS_SLUG, newsTitle: NEWS_TITLE,
        name: commentForm.name, email: commentForm.email, comment: commentForm.comment,
      });
      setSubmitMsg('success');
      setCommentForm({ name: '', email: '', comment: '' });
    } catch (err) {
      setSubmitMsg('error');
      console.error(err);
    } finally { setSubmitting(false); }
  };

  return (
    <>
      <AboutNavbar />

      <section className="news-detail-section">
        <div className="news-detail-wrapper">
          <div className="news-detail-main">
            <div className="news-detail-img-wrapper">
              <img src="/blog2.jpg" alt="Rice Milling" className="news-detail-img" />
              <span className="news-detail-date">{t('news_articles.date')}</span>
            </div>

            <div className="news-detail-meta">
              <span><FaUser /> {t('news_articles.by')} {t('news_articles.author_mudassar')}</span>
              <span><FaComment /> {comments.length} {comments.length !== 1 ? t('news_page.comments_count') : t('news_page.comment_single')}</span>
            </div>

            <h1 className="news-detail-title">{t('news_section.n2_title')}</h1>

            <div className="news-detail-content">
              <p>{t('news_articles.news2.p1')}</p>
              <p>{t('news_articles.news2.p2')}</p>
              <p>{t('news_articles.news2.p3')}</p>
            </div>

            <div className="news-related-box">
              <Link to="/news/news-1">{t('news_section.n1_title')}</Link>
            </div>
            <div className="news-related-box">
              <Link to="/news/news-3">{t('news_section.n3_title')}</Link>
            </div>

            {/* Approved Comments */}
            {comments.length > 0 && (
              <div style={{ marginTop: '30px', marginBottom: '10px' }}>
                <h3 style={{ marginBottom: '15px' }}>{comments.length} {comments.length !== 1 ? t('news_page.comments_count') : t('news_page.comment_single')}</h3>
                {comments.map((c) => (
                  <div key={c._id} style={{ borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px' }}>
                    <strong style={{ color: '#2c5f2e' }}>{c.name}</strong>
                    <span style={{ color: '#999', fontSize: '0.85rem', marginLeft: '12px' }}>{new Date(c.createdAt).toLocaleDateString()}</span>
                    <p style={{ marginTop: '6px', color: '#555' }}>{c.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Comment Form */}
            <div className="news-comment-section">
              <h2>{t('news_page.leave_comment')}</h2>

              {submitMsg === 'success' && (
                <div style={{ padding: '12px', background: '#e8f5e9', borderRadius: '6px', color: '#2e7d32', marginBottom: '15px' }}>
                  {t('news_page.comment_success')}
                </div>
              )}
              {submitMsg === 'error' && (
                <div style={{ padding: '12px', background: '#ffebee', borderRadius: '6px', color: '#c62828', marginBottom: '15px' }}>
                  {t('news_page.comment_error')}
                </div>
              )}

              <label className="news-save-label">
                <input type="checkbox" style={{ width: "auto", margin: "0" }} />
                {t('news_page.save_info')}
              </label>
              <form onSubmit={handleSubmit}>
                <div className="news-comment-row">
                  <input type="text" name="name" placeholder={t('news_page.full_name')} required value={commentForm.name} onChange={handleChange} />
                  <input type="email" name="email" placeholder={t('news_page.email_address')} required value={commentForm.email} onChange={handleChange} />
                </div>
                <textarea name="comment" placeholder={t('news_page.write_comment')} rows={6} required value={commentForm.comment} onChange={handleChange}></textarea>
                <button type="submit" className="news-post-btn" disabled={submitting}>{submitting ? t('news_page.posting') : t('news_page.post_comment')}</button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="news-detail-sidebar">
            <div className="sidebar-search">
              <input type="text" placeholder={t('news_page.search_here')} />
              <button>🔍</button>
            </div>
            <div className="sidebar-box">
              <h3>{t('news_page.recent_posts')}</h3>
              <ul>
                <li><Link to="/news/news-1">{t('news_section.n1_title')}</Link></li>
                <li><Link to="/news/news-2">{t('news_section.n2_title')}</Link></li>
                <li><Link to="/news/news-3">{t('news_section.n3_title')}</Link></li>
              </ul>
            </div>
            <div className="sidebar-box">
              <h3>{t('news_page.recent_comments')}</h3>
              {comments.length === 0
                ? <p className="sidebar-empty">{t('news_page.no_comments')}</p>
                : comments.slice(0, 3).map(c => (
                  <p key={c._id} style={{ fontSize: '0.9rem', color: '#555', marginBottom: '8px' }}>
                    <strong>{c.name}</strong>: {c.comment.substring(0, 50)}...
                  </p>
                ))
              }
            </div>
            <div className="sidebar-box">
              <h3>{t('news_page.latest_posts')}</h3>
              <div className="sidebar-latest-post">
                <img src="/blog1.jpg" alt="" />
                <div><span><FaUser /> {t('news_page.by')} {t('news_articles.author_aliha')}</span><Link to="/news/news-1">{t('news_section.n1_title').substring(0, 25)}...</Link></div>
              </div>
              <div className="sidebar-latest-post">
                <img src="/blog2.jpg" alt="" />
                <div><span><FaUser /> {t('news_page.by')} {t('news_articles.author_aliha')}</span><Link to="/news/news-2">{t('news_section.n2_title').substring(0, 25)}...</Link></div>
              </div>
              <div className="sidebar-latest-post">
                <img src="/mill.jpg" alt="" />
                <div><span><FaUser /> {t('news_page.by')} {t('news_articles.author_aliha')}</span><Link to="/news/news-3">{t('news_section.n3_title').substring(0, 25)}...</Link></div>
              </div>
            </div>
            <div className="sidebar-box"><h3>{t('news_page.categories')}</h3><p className="sidebar-empty">{t('news_page.uncategorized')}</p></div>
            <div className="sidebar-box"><h3>{t('news_page.tags')}</h3><p className="sidebar-empty">—</p></div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default News2;