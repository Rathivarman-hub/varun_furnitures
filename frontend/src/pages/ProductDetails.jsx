import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaStar, FaWhatsapp, FaCheckCircle, FaRulerCombined, FaPalette, FaCouch } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import { fetchProductById } from '../api/api';
import { toast } from 'react-toastify';
import { handleInquiry } from '../utils/whatsapp';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        const getProduct = async () => {
            try {
                const { data } = await fetchProductById(id);
                setProduct(data);
                setActiveImage(data.images[0]);
            } catch (error) {
                toast.error('Product not found!');
            } finally {
                setLoading(false);
            }
        };
        getProduct();
    }, [id]);

    const onInquiry = () => {
        handleInquiry(product.name);
    };

    if (loading) {
        return (
            <div className="container pt-5 mt-5">
                <div className="row g-5 py-5">
                    <div className="col-lg-6"><Skeleton height={500} className="skeleton" borderRadius={24} /></div>
                    <div className="col-lg-6">
                        <Skeleton height={30} width="30%" className="skeleton mb-3" />
                        <Skeleton height={50} className="skeleton mb-4" />
                        <Skeleton height={40} width="40%" className="skeleton mb-4" />
                        <Skeleton count={4} className="skeleton mb-2" />
                    </div>
                </div>
            </div>
        );
    }

    if (!product) return <div className="text-center py-5 mt-5"><h2>Product not found</h2></div>;

    return (
        <div className="pt-5 mt-5">
            <section className="py-5">
                <div className="container">
                    <Link to="/products" className="btn-back">
                        <i className="fa-solid fa-arrow-left"></i> Back to Shop
                    </Link>
                    <div className="row g-5">
                        {/* Image Gallery */}
                        <div className="col-lg-6" data-aos="fade-right">
                            <div className="position-relative" style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
                                <img src={activeImage} alt={product.name} style={{ width: '100%', height: 500, objectFit: 'cover' }} />
                                {product.featured && (
                                    <span className="badge-custom position-absolute" style={{ top: 20, left: 20, background: 'var(--glass)', backdropFilter: 'blur(8px)', fontSize: '0.85rem', padding: '8px 16px' }}>
                                        Featured 💎
                                    </span>
                                )}
                            </div>
                            {product.images.length > 1 && (
                                <div className="d-flex gap-3 mt-4 overflow-auto pb-2">
                                    {product.images.map((img, idx) => (
                                        <img
                                            key={idx} src={img} alt={`${product.name} ${idx}`}
                                            className="rounded"
                                            style={{ width: 100, height: 100, objectFit: 'cover', cursor: 'pointer', border: activeImage === img ? '2px solid var(--primary)' : '2px solid transparent', transition: 'var(--transition)' }}
                                            onClick={() => setActiveImage(img)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Details */}
                        <div className="col-lg-6" data-aos="fade-left">
                            <div className="product-card-category mb-2" style={{ fontSize: '0.9rem' }}>{product.category}</div>
                            <h1 className="mb-3" style={{ fontFamily: 'Playfair Display', fontWeight: 800 }}>{product.name}</h1>

                            <div className="d-flex align-items-center gap-3 mb-4">
                                <div className="d-flex align-items-center gap-1" style={{ color: '#f0b429' }}>
                                    <FaStar /> <span style={{ color: 'var(--text-dark)', fontWeight: 600 }}>{product.rating}</span>
                                </div>
                                <span style={{ color: 'var(--border)' }}>|</span>
                                <span style={{ color: 'var(--text-muted)' }}>{product.numReviews} Reviews</span>
                                <span style={{ color: 'var(--border)' }}>|</span>
                                <span style={{ color: product.inStock ? '#25d366' : '#e94560', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <FaCheckCircle /> {product.inStock ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>

                            {/* Pricing */}
                            <div className="glass-card p-4 mb-4">
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 4 }}>Price</div>
                                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-dark)', lineHeight: 1 }}>
                                    ₹{product.price.toLocaleString()}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="d-flex flex-column gap-3 mb-5">
                                <button
                                    className="btn-primary-custom justify-content-center"
                                    style={{ padding: '16px' }}
                                    onClick={onInquiry}
                                >
                                    <FaWhatsapp className="me-2" /> Inquire on WhatsApp
                                </button>
                            </div>

                            {/* Specs */}
                            <h5 className="mb-3" style={{ fontWeight: 700 }}>Product Description</h5>
                            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>{product.description}</p>

                            <div className="row g-4">
                                {product.material && (
                                    <div className="col-6">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="contact-icon" style={{ width: 40, height: 40, fontSize: '1rem' }}><FaCouch /></div>
                                            <div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Material</div>
                                                <div style={{ fontWeight: 600 }}>{product.material}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {product.dimensions && (
                                    <div className="col-6">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="contact-icon" style={{ width: 40, height: 40, fontSize: '1rem' }}><FaRulerCombined /></div>
                                            <div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Dimensions</div>
                                                <div style={{ fontWeight: 600 }}>{product.dimensions}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {product.color && (
                                    <div className="col-6">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="contact-icon" style={{ width: 40, height: 40, fontSize: '1rem' }}><FaPalette /></div>
                                            <div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Color</div>
                                                <div style={{ fontWeight: 600 }}>{product.color}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductDetails;
