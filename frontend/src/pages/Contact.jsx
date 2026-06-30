import { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { submitContact } from '../api/api';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await submitContact(formData);
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            setSuccessMessage('Message sent successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) { console.error('Error submitting contact form'); }
    };



    return (
        <div className="pt-5 mt-5">
            <section className="py-5 bg-card" style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}>
                <div className="container text-center px-4">
                    <h1 className="section-title mb-3" data-aos="fade-up">Get in <span className="gradient-text">Touch</span></h1>
                    <p className="section-subtitle mb-0 mx-auto" data-aos="fade-up" data-aos-delay="100" style={{ maxWidth: 600 }}>
                        Have questions? We'd love to hear from you.
                    </p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div className="row g-5">
                        {/* Contact Info */}
                        <div className="col-lg-5" data-aos="fade-right">
                            <h3 className="mb-4" style={{ fontFamily: 'Playfair Display', fontWeight: 700 }}>Contact Information</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: 32, lineHeight: 1.8 }}>
                                Whether you want to buy, rent, or just explore options, our team at Varun Furniture is ready to assist you anytime.
                            </p>

                            <div className="contact-info-item">
                                <div className="contact-icon"><FaMapMarkerAlt /></div>
                                <div>
                                    <h6 style={{ fontWeight: 700, marginBottom: 4 }}>Our Showroom</h6>
                                    <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.95rem' }}>Burma Colony, 1st St, Emaneswaram,<br />Paramakudi, Tamil Nadu – 623701</p>
                                </div>
                            </div>

                            <div className="contact-info-item">
                                <div className="contact-icon"><FaPhone /></div>
                                <div>
                                    <h6 style={{ fontWeight: 700, marginBottom: 4 }}>Phone Number</h6>
                                    <a href="tel:+91 93427 12365" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>+91 93427 12365</a>
                                </div>
                            </div>

                            <div className="contact-info-item">
                                <div className="contact-icon"><FaEnvelope /></div>
                                <div>
                                    <h6 style={{ fontWeight: 700, marginBottom: 4 }}>Email Address</h6>
                                    <a href="mailto:info@varunfurniture.com" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>varunfurnitures2026@gmail.com</a>
                                </div>
                            </div>

                            <div className="mt-4 p-4 rounded-3" style={{ background: 'var(--bg-light)', border: '1px solid var(--border)' }}>
                                <h6 style={{ fontWeight: 700, marginBottom: 12 }}>Business Hours</h6>
                                <div className="d-flex justify-content-between mb-2 pb-2 border-bottom border-secondary">
                                    <span style={{ color: 'var(--text-muted)' }}>Monday - Saturday</span>
                                    <span style={{ fontWeight: 600 }}>9:00 AM - 8:00 PM</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span style={{ color: 'var(--text-muted)' }}>Sunday</span>
                                    <span style={{ fontWeight: 600, color: 'var(--primary)' }}>9:00 AM - 8:00 PM</span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="col-lg-7" data-aos="fade-left">
                            <div className="glass-card" style={{ padding: 'clamp(20px, 5vw, 48px)' }}>
                                <h3 className="mb-4" style={{ fontFamily: 'Playfair Display', fontWeight: 700 }}>Send us a Message</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label" style={{ fontWeight: 600 }}>Full Name</label>
                                            <input type="text" className="contact-form-input" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Varun" />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label" style={{ fontWeight: 600 }}>Email Address</label>
                                            <input type="email" className="contact-form-input" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="varunfurnitures2026@ gmail.com" />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label" style={{ fontWeight: 600 }}>Phone Number</label>
                                            <input type="tel" className="contact-form-input" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 98765 43210" />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label" style={{ fontWeight: 600 }}>Subject</label>
                                            <select className="contact-form-input" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}>
                                                <option value="">Select subject</option>
                                                <option value="buy">Buying Furniture</option>
                                                <option value="rent">Renting Furniture</option>
                                                <option value="support">Customer Support</option>
                                                <option value="other">Other Inquiry</option>
                                            </select>
                                        </div>
                                        <div className="col-12 mb-4">
                                            <label className="form-label" style={{ fontWeight: 600 }}>Your Message</label>
                                            <textarea className="contact-form-input" rows="5" required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="How can we help you today?"></textarea>
                                        </div>

                                        <div className="col-12">
                                            {successMessage && (
                                                <div className="alert alert-success border-0 bg-success-subtle text-success py-2 mb-3 text-center" style={{ borderRadius: 12, fontWeight: 600 }}>
                                                    {successMessage}
                                                </div>
                                            )}
                                            <button type="submit" className="btn-primary-custom w-100 justify-content-center py-3" style={{ fontSize: '1.1rem' }}>
                                                <FaPaperPlane className="me-2" /> Send Message
                                            </button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Full Width */}
            <div style={{ height: 400, width: '100%', filter: 'grayscale(100%) invert(90%)' }}>
                <iframe
                    title="Varun Furniture Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3936.565863261763!2d78.5857!3d9.3705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMjInMTMuOCJOIDc4wrAzNScwOC41IkU!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy">
                </iframe>
            </div>
        </div>
    );
};

export default Contact;
