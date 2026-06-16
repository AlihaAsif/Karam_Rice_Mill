import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Admin.css";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("products");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [viewItem, setViewItem] = useState(null); // For viewing message detail
  const [productForm, setProductForm] = useState({ name: '', description: '', category: '', image: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const adminInfo = localStorage.getItem("adminInfo");
    if (!adminInfo) {
      navigate("/admin/login");
    } else {
      fetchData(activeTab);
    }
  }, [activeTab, navigate]);

  if (!localStorage.getItem("adminInfo")) {
    return null;
  }

  const getHeaders = () => {
    const adminInfo = localStorage.getItem("adminInfo");
    if (adminInfo) {
      try {
        const { token } = JSON.parse(adminInfo);
        return {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
      } catch (err) {
        console.error("Failed to parse adminInfo token:", err);
      }
    }
    return {};
  };

  const getEndpoint = (tab) => {
    if (tab === 'messages') return '/contact';
    return `/${tab}`;
  };

  const handleLogout = () => {
    localStorage.removeItem("adminInfo");
    navigate("/admin/login");
  };

  const handleTabChange = (tab) => {
    setViewItem(null);
    setData([]);
    setActiveTab(tab);
  };

  const fetchData = async (tab) => {
    setLoading(true);
    try {
      const { data: responseData } = await axios.get(`${API_URL}${getEndpoint(tab)}`, getHeaders());
      setData(responseData);
    } catch (error) {
      console.error(`Error fetching ${tab}:`, error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const endpoint = activeTab === 'messages' ? 'contact' : activeTab;
      await axios.delete(`${API_URL}/${endpoint}/${id}`, getHeaders());
      fetchData(activeTab);
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Delete failed. Please try again.");
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleLogout();
      }
    }
  };

  // Update status (for reviews, comments, messages)
  const updateStatus = async (id, status) => {
    try {
      const endpoint = activeTab === 'messages' ? 'contact' : activeTab;
      await axios.put(`${API_URL}/${endpoint}/${id}`, { status }, getHeaders());
      fetchData(activeTab);
    } catch (error) {
      console.error("Error updating status:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleLogout();
      }
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/products`, productForm, getHeaders());
      setShowProductModal(false);
      setProductForm({ name: '', description: '', category: '', image: '' });
      fetchData(activeTab);
    } catch (error) {
      alert("Failed to save product.");
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleLogout();
      }
    }
  };

  // Star rating renderer
  const renderStars = (rating) =>
    [1,2,3,4,5].map(s => (
      <span key={s} style={{ color: s <= rating ? '#f5a623' : '#ddd', fontSize: '16px' }}>★</span>
    ));

  // Status badge color
  const statusColor = (status) => {
    if (status === 'Approved') return { background: '#e8f5e9', color: '#2e7d32' };
    if (status === 'Rejected') return { background: '#ffebee', color: '#c62828' };
    if (status === 'Read') return { background: '#e3f2fd', color: '#1565c0' };
    if (status === 'Responded') return { background: '#e8f5e9', color: '#2e7d32' };
    return { background: '#fff8e1', color: '#f57f17' }; // Pending / Unread
  };

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <h3>⚙️ Admin Panel</h3>
        <ul>
          <li className={activeTab === "products" ? "active" : ""} onClick={() => handleTabChange("products")}>
            📦 Products
          </li>

          <li className={activeTab === "messages" ? "active" : ""} onClick={() => handleTabChange("messages")}>
            📩 Contact Messages
          </li>
          <li className={activeTab === "reviews" ? "active" : ""} onClick={() => handleTabChange("reviews")}>
            ⭐ Product Reviews
          </li>
          <li className={activeTab === "comments" ? "active" : ""} onClick={() => handleTabChange("comments")}>
            💬 News Comments
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        <div className="admin-header">
          <h2>
            {activeTab === 'products' && '📦 Manage Products'}
            {activeTab === 'news' && '📰 Manage News'}
            {activeTab === 'messages' && '📩 Contact Messages'}
            {activeTab === 'reviews' && '⭐ Product Reviews'}
            {activeTab === 'comments' && '💬 News Comments'}
          </h2>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>

        {loading ? (
          <div className="admin-loader-container">
            <div className="admin-spinner"></div>
            <p style={{ marginTop: '10px', color: '#64748b', fontWeight: '500' }}>Fetching details...</p>
          </div>
        ) : (
          <>
            {/* ===== PRODUCTS TAB ===== */}
            {activeTab === "products" && (
          <div>
            <button className="admin-btn add-new-btn" onClick={() => setShowProductModal(true)}>
              + Add New Product
            </button>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th><th>Name</th><th>Category</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 && <tr><td colSpan="4" style={{ textAlign: 'center', color: '#888' }}>No products found.</td></tr>}
                {data.map((item) => (
                  <tr key={item._id}>
                    <td><img src={item.image || "/product-placeholder.png"} alt={item.name} width="50" style={{ borderRadius: '6px' }} /></td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>
                      <button className="action-btn delete-btn" onClick={() => deleteItem(item._id)}>🗑 Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ===== NEWS TAB ===== */}
        {activeTab === "news" && (
          <div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th><th>Date</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 && <tr><td colSpan="3" style={{ textAlign: 'center', color: '#888' }}>No news found.</td></tr>}
                {data.map((item) => (
                  <tr key={item._id}>
                    <td>{item.title}</td>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button className="action-btn delete-btn" onClick={() => deleteItem(item._id)}>🗑 Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ===== MESSAGES TAB ===== */}
        {activeTab === "messages" && (
          <div>
            {viewItem ? (
              <div style={{ background: '#f9f9f9', padding: '25px', borderRadius: '10px', maxWidth: '600px' }}>
                <button className="action-btn" onClick={() => setViewItem(null)} style={{ marginBottom: '15px' }}>← Back</button>
                <h3 style={{ marginBottom: '10px' }}>Message from {viewItem.name}</h3>
                <p><strong>Email:</strong> {viewItem.email}</p>
                <p><strong>Telephone:</strong> {viewItem.telephone || '—'}</p>
                <p><strong>City:</strong> {viewItem.city || '—'}</p>
                <p><strong>Subject:</strong> {viewItem.subject}</p>
                <p style={{ marginTop: '15px', whiteSpace: 'pre-wrap', background: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #eee' }}>
                  {viewItem.message}
                </p>
                <p><strong>Received:</strong> {new Date(viewItem.createdAt).toLocaleString()}</p>
                <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                  <button className="action-btn edit-btn" onClick={() => { updateStatus(viewItem._id, 'Read'); setViewItem(null); }}>✅ Mark as Read</button>
                  <button className="action-btn" style={{ background: '#6c757d', color: '#fff' }} onClick={() => { updateStatus(viewItem._id, 'Responded'); setViewItem(null); }}>📧 Mark Responded</button>
                </div>
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr><th>Name</th><th>Email</th><th>City</th><th>Subject</th><th>Status</th><th>Date</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {data.length === 0 && <tr><td colSpan="7" style={{ textAlign: 'center', color: '#888' }}>No messages yet.</td></tr>}
                  {data.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.city || '—'}</td>
                      <td>{item.subject || '—'}</td>
                      <td>
                        <span style={{ ...statusColor(item.status), padding: '3px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>
                          {item.status}
                        </span>
                      </td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button className="action-btn edit-btn" onClick={() => setViewItem(item)}>👁 View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ===== REVIEWS TAB ===== */}
        {activeTab === "reviews" && (
          <div>
            <table className="admin-table">
              <thead>
                <tr><th>Product</th><th>Name</th><th>Rating</th><th>Review</th><th>Status</th><th>Date</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {data.length === 0 && <tr><td colSpan="7" style={{ textAlign: 'center', color: '#888' }}>No reviews submitted yet.</td></tr>}
                {data.map((item) => (
                  <tr key={item._id}>
                    <td style={{ fontSize: '0.85rem' }}>{item.productName || '—'}</td>
                    <td>
                      <div>{item.name}</div>
                      <div style={{ fontSize: '0.78rem', color: '#888' }}>{item.email}</div>
                    </td>
                    <td>{renderStars(item.rating)}</td>
                    <td style={{ maxWidth: '200px', fontSize: '0.85rem', color: '#555' }}>
                      {item.review && item.review.length > 80 ? item.review.substring(0, 80) + '...' : (item.review || '')}
                    </td>
                    <td>
                      <span style={{ ...statusColor(item.status), padding: '3px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8rem' }}>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td>
                      {item.status !== 'Approved' && (
                        <button className="action-btn edit-btn" style={{ marginBottom: '4px', display: 'block' }}
                          onClick={() => updateStatus(item._id, 'Approved')}>✅ Approve</button>
                      )}
                      {item.status !== 'Rejected' && (
                        <button className="action-btn" style={{ background: '#e53935', color: '#fff', marginBottom: '4px', display: 'block' }}
                          onClick={() => updateStatus(item._id, 'Rejected')}>❌ Reject</button>
                      )}
                      <button className="action-btn delete-btn" style={{ display: 'block' }}
                        onClick={() => deleteItem(item._id)}>🗑 Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ===== COMMENTS TAB ===== */}
        {activeTab === "comments" && (
          <div>
            <table className="admin-table">
              <thead>
                <tr><th>News Article</th><th>Name</th><th>Comment</th><th>Status</th><th>Date</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {data.length === 0 && <tr><td colSpan="6" style={{ textAlign: 'center', color: '#888' }}>No comments submitted yet.</td></tr>}
                {data.map((item) => (
                  <tr key={item._id}>
                    <td style={{ fontSize: '0.82rem', color: '#555' }}>{item.newsTitle || item.newsSlug}</td>
                    <td>
                      <div>{item.name}</div>
                      <div style={{ fontSize: '0.78rem', color: '#888' }}>{item.email}</div>
                    </td>
                    <td style={{ maxWidth: '220px', fontSize: '0.85rem', color: '#555' }}>
                      {item.comment && item.comment.length > 90 ? item.comment.substring(0, 90) + '...' : (item.comment || '')}
                    </td>
                    <td>
                      <span style={{ ...statusColor(item.status), padding: '3px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8rem' }}>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td>
                      {item.status !== 'Approved' && (
                        <button className="action-btn edit-btn" style={{ marginBottom: '4px', display: 'block' }}
                          onClick={() => updateStatus(item._id, 'Approved')}>✅ Approve</button>
                      )}
                      {item.status !== 'Rejected' && (
                        <button className="action-btn" style={{ background: '#e53935', color: '#fff', marginBottom: '4px', display: 'block' }}
                          onClick={() => updateStatus(item._id, 'Rejected')}>❌ Reject</button>
                      )}
                      <button className="action-btn delete-btn" style={{ display: 'block' }}
                        onClick={() => deleteItem(item._id)}>🗑 Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </>
    )}
  </div>

      {/* ===== ADD PRODUCT MODAL ===== */}
      {showProductModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Product</h3>
            <form onSubmit={handleProductSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" value={productForm.name} required
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={productForm.description} required
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input type="text" name="category" value={productForm.category} required
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input type="text" name="image" value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })} />
              </div>
              <div className="modal-actions">
                <button type="button" className="action-btn" onClick={() => setShowProductModal(false)}>Cancel</button>
                <button type="submit" className="action-btn edit-btn">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
