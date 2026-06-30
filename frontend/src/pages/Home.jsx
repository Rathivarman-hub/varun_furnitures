import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCouch, FaTruck, FaMedal, FaHeadset, FaArrowRight } from 'react-icons/fa';
import { fetchProducts } from '../api/api';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        const getFeatured = async () => {
            try {
                const { data } = await fetchProducts({ featured: true, limit: 4 });
                setFeaturedProducts(data.products);
            } catch (error) {
                console.error('Failed to fetch featured products', error);
            }
        };
        getFeatured();
    }, []);

    return (
        <>
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6" data-aos="fade-up" data-aos-duration="1000">
                            <div className="hero-badge">
                                <FaMedal /> Premium Furniture Store
                            </div>
                            <h1 className="hero-title">
                                Affordable & Stylish <span className="gradient-text">Furniture</span> for Your Home
                            </h1>
                            <p className="hero-description">
                                Discover our exclusive collection of modern furniture. Buy premium pieces for your dream home. Quality guaranteed.
                            </p>
                            <div className="hero-buttons">
                                <Link to="/products" className="btn-primary-custom">
                                    View Products <FaArrowRight />
                                </Link>
                            </div>

                            <div className="row mt-5 pt-4 border-top border-secondary">
                                <div className="col-4">
                                    <div className="hero-stat">
                                        <span className="stat-number">5k+</span>
                                        <span className="stat-label">Clients</span>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="hero-stat">
                                        <span className="stat-number">5.0</span>
                                        <span className="stat-label">Rating </span>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="hero-stat">
                                        <span className="stat-number">1k+</span>
                                        <span className="stat-label">Products</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 position-relative" data-aos="fade-left" data-aos-duration="1200" data-aos-delay="200">
                            <div className="hero-img-wrapper">
                                <img
                                    src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                    alt="Modern Living Room"
                                    className="hero-img-main"
                                />
                                <motion.div
                                    className="hero-img-badge d-flex align-items-center gap-3"
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 1, duration: 0.8 }}
                                >
                                    <div className="social-icon" style={{ background: 'var(--gradient)', color: 'white' }}>
                                        <FaCouch />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 800, color: 'var(--text-dark)' }}>Modern Design</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>For every home</div>
                                    </div>
                                </motion.div>
                                <div className="particle" style={{ width: 60, height: 60, top: '10%', right: '10%' }}></div>
                                <div className="particle" style={{ width: 80, height: 80, bottom: '20%', left: '-5%', animationDelay: '-3s' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="section-padding bg-card" style={{ background: 'var(--bg-card)' }}>
                <div className="container">
                    <div className="row g-4 justify-content-center">
                        {[
                            { icon: <FaMedal />, title: 'Premium Quality', desc: 'Crafted with the finest materials for durability.' },
                            { icon: <FaTruck />, title: 'Fast Delivery', desc: 'Safe and timely delivery to your doorstep.' },
                            { icon: <FaHeadset />, title: '24/7 Support', desc: 'Dedicated customer support team.' }
                        ].map((feature, idx) => (
                            <div key={idx} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={idx * 100}>
                                <div className="glass-card text-center p-4 h-100">
                                    <div className="social-icon mx-auto mb-3" style={{ background: 'var(--gradient)', color: 'white', width: 60, height: 60, fontSize: '1.5rem' }}>
                                        {feature.icon}
                                    </div>
                                    <h5 className="mb-2" style={{ color: 'var(--text-dark)' }}>{feature.title}</h5>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 0 }}>{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="section-padding">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <h2 className="section-title">Featured <span className="gradient-text">Products</span></h2>
                        <div className="divider"></div>
                        <p className="section-subtitle">Handpicked premium furniture for your home</p>
                    </div>

                    <div className="row g-4">
                        {featuredProducts.map((product, idx) => (
                            <div key={product._id} className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={idx * 100}>
                                <div className="product-card">
                                    <Link to={`/products/${product._id}`} style={{ textDecoration: 'none' }}>
                                        <div style={{ overflow: 'hidden' }}>
                                            <img src={product.images[0]} alt={product.name} className="product-card-img" />
                                        </div>
                                        <div className="product-card-body">
                                            <div className="product-card-category">{product.category}</div>
                                            <h5 className="product-card-name text-truncate">{product.name}</h5>
                                            <div className="d-flex justify-content-between align-items-center mt-3">
                                                <div className="product-card-price">₹{product.price.toLocaleString()}</div>
                                                <div className="btn-outline-custom py-1 px-3" style={{ fontSize: '0.75rem' }}>View Details</div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-5" data-aos="fade-up">
                        <Link to="/products" className="btn-outline-custom">View All Products</Link>
                    </div>
                </div>
            </section>


        </>
    );
};

export default Home;
