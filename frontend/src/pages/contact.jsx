import AboutNavbar from "../components/layout/AboutNavbar";
import Footer from "../components/layout/Footer";
import "./contact.css";
import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt, FaCheck } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

function Contact() {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "",
    subject: "", telephone: "", city: "", message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const dataToSend = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        telephone: formData.telephone,
        city: formData.city,
        subject: formData.subject,
        message: formData.message
      };
      
      const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
      const response = await axios.post(`${API_URL}/contact`, dataToSend);
      if (response.data.success) {
        alert(t('contact_page.success_msg'));
        setFormData({
          firstName: "", lastName: "", email: "",
          subject: "", telephone: "", city: "", message: ""
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert(t('contact_page.error_msg'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AboutNavbar />

      <section className="contact-cards-section">
        <div className="contact-cards-wrapper">

          <div className="contact-card card-green">
            <h3 className="card-title">{t('contact_page.about_title')}</h3>
            <p className="card-text">
              {t('contact_page.about_text')}
            </p>
          </div>

          <div className="contact-card card-yellow-green">
            <h3 className="card-title">{t('contact_page.contact_title')}</h3>
            <p className="card-text"><FaPhone className="card-icon" /> +92 301 551111</p>
            <p className="card-text"><FaEnvelope className="card-icon" /> karamricemill@gmail.com</p>
            <p className="card-text"><FaClock className="card-icon" /> {t('contact_page.hours')}</p>
          </div>

          <div className="contact-card card-gold">
            <h3 className="card-title">{t('contact_page.address_title')}</h3>
            <p className="card-text">
              <FaMapMarkerAlt className="card-icon" />
              {t('contact_page.address')}
            </p>
          </div>

        </div>
      </section>

     
      <section className="contact-main-section">
        <div className="contact-main-wrapper">

        
          <div className="contact-map">
            <iframe
              title="Karam Rice Mill Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54931.07347021676!2d73.6500!3d30.8300!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922b3d6b1e6b8c5%3A0x6e1f1c2b3c4d5e6f!2sDepalpur%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1680000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        
          <div className="contact-form-wrapper">

          
            <div className="form-heading">
              <h2>{t('contact_page.get_in_touch')}</h2>
              <p>{t('contact_page.get_back')}</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>

              <div className="form-row">
                <div className="form-group">
                  <label>{t('contact_page.first_name')} <span className="required">*</span></label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder={t('contact_page.first_name_ph')}
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>{t('contact_page.last_name')} <span className="required">*</span></label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder={t('contact_page.last_name_ph')}
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>{t('contact_page.email')} <span className="required">*</span></label>
                  <input
                    type="email"
                    name="email"
                    placeholder={t('contact_page.email_ph')}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>{t('contact_page.subject')} <span className="required">*</span></label>
                  <input
                    type="text"
                    name="subject"
                    placeholder={t('contact_page.subject_ph')}
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>{t('contact_page.telephone')} <span className="required">*</span></label>
                  <input
                    type="tel"
                    name="telephone"
                    placeholder="+92 301 551111"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>{t('contact_page.city')} <span className="required">*</span></label>
                  <input
                    type="text"
                    name="city"
                    placeholder={t('contact_page.city_ph')}
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

            
              <div className="form-heading" style={{ marginTop: "30px" }}>
                <h2>{t('contact_page.how_can_we_help')}</h2>
                <p>{t('contact_page.feel_free')}</p>
              </div>

              <div className="form-group">
                <label>{t('contact_page.comments_label')} <span className="required">*</span></label>
                <textarea
                  name="message"
                  placeholder={t('contact_page.comment_ph')}
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="send-btn" disabled={isSubmitting}>
                <FaCheck /> {isSubmitting ? t('contact_page.sending') : t('contact_page.send_message')}
              </button>

            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Contact;