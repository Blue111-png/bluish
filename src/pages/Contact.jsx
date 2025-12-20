import React, { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can integrate with an API or email service here
    console.log('Message sent:', formData);
    alert('Your an ASSHOLE');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="contact">
      <div className="contact-container">
        <h3 style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>
  <strong>(WARNING): Do not attempt to contact us for now.</strong>
</h3>
        <h1>Contact Us</h1>
        <p className="contact-intro">
          Whether you're on a mission or just browsing, we're here to help. Reach out anytime.
        </p>

        <div className="contact-grid">
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Message
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </label>

            <button type="submit">Send Message</button>
          </form>

          <div className="contact-info">
            <h2>📍 Headquarters</h2>
            <p>Bluish HQ<br />Buea, Cameroon</p>

            <h2>📞 Call Us</h2>
            <p>+237 6XX XXX XXX</p>

            <h2>✉️ Email</h2>
            <p>support@Bluish.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}