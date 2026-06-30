import { useEffect } from 'react';
import { FaMapMarkerAlt, FaCheckCircle, FaStar } from 'react-icons/fa';

const About = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="pt-5 mt-5">
            {/* Page Header */}
            <section className="py-5" style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}>
                <div className="container text-center px-4">
                    <h1 className="section-title mb-3" data-aos="fade-up">About <span className="gradient-text">Varun Furniture</span></h1>
                    <p className="section-subtitle mb-0 mx-auto" data-aos="fade-up" data-aos-delay="100" style={{ maxWidth: 600 }}>
                        Your trusted partner for premium furniture sales and rentals in Paramakudi since 2010.
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section className="section-padding">
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6" data-aos="fade-right">
                            <div className="about-img-wrapper">
                                <img
                                    src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                    alt="Varun Furniture Showroom"
                                    className="about-img"
                                />
                                <div className="about-badge">
                                    <div style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1 }}>14+</div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginTop: 4 }}>Years of<br />Experience</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6" data-aos="fade-left">
                            <h2 className="mb-4" style={{ fontFamily: 'Playfair Display', fontWeight: 800 }}>Crafting Comfort For Your Home</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 24 }}>
                                Varun Furniture started with a simple vision: to construct quality, affordable, and elegantly designed furniture accessible to everyone in Paramakudi and surrounding areas.
                            </p>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 32 }}>
                                Whether you're looking to furnish your dream home with permanent pieces or need high-quality furniture on rent for short-term events, we offer a comprehensive catalog that blends modern aesthetics with functional durability.
                            </p>

                            <ul className="list-unstyled">
                                {['Premium Quality Materials', 'Affordable Rental Plans', 'Free Delivery & Installation', 'Dedicated Customer Support'].map((item, idx) => (
                                    <li key={idx} className="d-flex align-items-center gap-3 mb-3">
                                        <FaCheckCircle style={{ color: 'var(--primary)', fontSize: '1.2rem' }} />
                                        <span style={{ fontWeight: 500 }}>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Counters */}
            <section className="counter-section">
                <div className="container">
                    <div className="row g-4 border-top border-bottom" style={{ borderColor: 'rgba(255,255,255,0.1) !important', padding: '40px 0' }}>
                        <div className="col-md-3 col-6 counter-item" data-aos="zoom-in" data-aos-delay="0">
                            <span className="counter-number">5.0</span>
                            <div className="d-flex justify-content-center gap-1 my-2">
                                {[...Array(5)].map((_, i) => <FaStar key={i} className="stars" />)}
                            </div>
                            <span className="counter-label">Customer Rating</span>
                        </div>
                        <div className="col-md-3 col-6 counter-item" data-aos="zoom-in" data-aos-delay="100">
                            <span className="counter-number">5k+</span>
                            <span className="counter-label">Happy Customers</span>
                        </div>
                        <div className="col-md-3 col-6 counter-item" data-aos="zoom-in" data-aos-delay="200">
                            <span className="counter-number">1k+</span>
                            <span className="counter-label">Furniture Items</span>
                        </div>
                        <div className="col-md-3 col-6 counter-item" data-aos="zoom-in" data-aos-delay="300">
                            <span className="counter-number">100%</span>
                            <span className="counter-label">Quality Guarantee</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Location */}
            <section className="section-padding">
                <div className="container text-center">
                    <div className="section-header" data-aos="fade-up">
                        <h2 className="section-title">Visit Our <span className="gradient-text">Showroom</span></h2>
                        <div className="divider"></div>
                        <p className="section-subtitle">Come experience our furniture quality in person</p>
                    </div>

                    <div className="row justify-content-center" data-aos="fade-up">
                        <div className="col-lg-8">
                            <div className="glass-card p-4">
                                <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-start gap-3 gap-sm-4 mb-4 text-center text-sm-start">
                                    <div className="contact-icon" style={{ width: 60, height: 60, fontSize: '1.5rem' }}>
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div>
                                        <h5 className="mb-2" style={{ fontFamily: 'Playfair Display', fontWeight: 700 }}>Varun Furniture</h5>
                                        <p style={{ color: 'var(--text-muted)', marginBottom: 0 }}>
                                            Burma Colony, 1st St, Emaneswaram,<br />
                                            Paramakudi, Tamil Nadu – 623701
                                        </p>
                                    </div>
                                </div>
                                {/* Embed Map Here, simulating with a responsive div */}
                                <div className="map-container" style={{ height: 400, background: 'var(--border)' }}>
                                    <iframe
                                        title="Varun Furniture Location"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3936.565863261763!2d78.5857!3d9.3705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMjInMTMuOCJOIDc4wrAzNScwOC41IkU!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                                        width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy">
                                    </iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
