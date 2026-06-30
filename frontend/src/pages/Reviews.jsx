import { useState, useEffect } from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import { fetchReviews, createReview } from '../api/api';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000');

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', rating: 5, comment: '', isGeneral: true });

    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        const getRevs = async () => {
            try {
                const { data } = await fetchReviews({ general: true });
                setReviews(data);
            } catch (error) { console.error('Error fetching reviews'); }
            setLoading(false);
        };
        getRevs();

        // Listen for live updates
        socket.on('new-review', (newReview) => {
            if (newReview.isGeneral) {
                setReviews(prev => [newReview, ...prev]);
            }
        });

        return () => {
            socket.off('new-review');
        };
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createReview(formData);
            setFormData({ name: '', email: '', rating: 5, comment: '', isGeneral: true });
            setSuccessMessage('Review submitted successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) { toast.error(error.response?.data?.message || 'Error submitting review'); }
    };




    return (
        <div className="pt-5 mt-5">
            <section className="py-5 bg-card" style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}>
                <div className="container text-center px-4">
                    <h1 className="section-title mb-3" data-aos="fade-up">Customer <span className="gradient-text">Reviews</span></h1>
                    <p className="section-subtitle mb-0 mx-auto" data-aos="fade-up" data-aos-delay="100" style={{ maxWidth: 600 }}>
                        See what our happy customers have to say about Varun Furniture
                    </p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div className="row g-5">
                        {/* Reviews List */}
                        <div className="col-lg-7">
                            <h3 className="mb-4" style={{ fontFamily: 'Playfair Display', fontWeight: 700 }}>Latest Feedback</h3>
                            <div className="row g-4">
                                {loading ? (
                                    [...Array(4)].map((_, i) => (
                                        <div key={i} className="col-12">
                                            <div className="review-card">
                                                <div className="d-flex gap-3"><Skeleton circle width={50} height={50} className="skeleton" /><div className="flex-grow-1"><Skeleton width="40%" height={20} className="skeleton" /><Skeleton width="20%" height={15} className="skeleton mt-1" /></div></div>
                                                <Skeleton count={2} className="skeleton mt-3" />
                                            </div>
                                        </div>
                                    ))
                                ) : reviews.length > 0 ? (
                                    reviews.map((review, idx) => (
                                        <div key={review._id} className="col-12" data-aos="fade-up" data-aos-delay={(idx % 3) * 100}>
                                            <div className="review-card position-relative overflow-hidden">
                                                <FaQuoteLeft className="position-absolute" style={{ right: 20, top: 20, fontSize: '3rem', color: 'var(--border)', opacity: 0.5 }} />
                                                <div className="d-flex align-items-center gap-2 gap-sm-3 mb-3">
                                                    <div className="reviewer-avatar">{review.name.charAt(0)}</div>
                                                    <div className="flex-grow-1">
                                                        <h6 className="mb-0" style={{ fontWeight: 700, fontSize: '0.95rem' }}>{review.name}</h6>
                                                        <div className="d-flex gap-1 mt-1" style={{ color: '#f0b429' }}>
                                                            {[...Array(5)].map((_, i) => <FaStar key={i} size={12} color={i < review.rating ? '#f0b429' : 'var(--border)'} />)}
                                                        </div>
                                                    </div>
                                                    <div className="text-end" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', minWidth: 80 }}>
                                                        {new Date(review.createdAt).toLocaleDateString()}
                                                    </div>
                                                </div>
                                                <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.6, margin: 0, fontSize: '0.92rem' }}>"{review.comment}"</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center bg-card p-5 rounded border border-secondary">No reviews found yet. Be the first to review!</div>
                                )}
                            </div>
                        </div>

                        {/* Submit Review Form */}
                        <div className="col-lg-5" data-aos="fade-left">
                            <div className="glass-card" style={{ padding: '32px' }}>
                                <h4 className="mb-2" style={{ fontFamily: 'Playfair Display', fontWeight: 700 }}>Leave a Review</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 24 }}>Share your experience with Varun Furniture.</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label" style={{ fontWeight: 600 }}>Name</label>
                                        <input type="text" className="contact-form-input" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" style={{ fontWeight: 600 }}>Email</label>
                                        <input type="email" className="contact-form-input" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label d-block" style={{ fontWeight: 600 }}>Rating</label>
                                        <div className="d-flex gap-2" style={{ cursor: 'pointer' }}>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <FaStar key={star} size={24} color={star <= formData.rating ? '#f0b429' : 'var(--border)'} onClick={() => setFormData({ ...formData, rating: star })} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label" style={{ fontWeight: 600 }}>Your Experience</label>
                                        <textarea className="contact-form-input" rows="4" required value={formData.comment} onChange={(e) => setFormData({ ...formData, comment: e.target.value })} placeholder="Tell us about the quality, delivery, and your overall experience..."></textarea>
                                    </div>
                                    {successMessage && (
                                        <div className="alert alert-success border-0 bg-success-subtle text-success py-2 mb-3 text-center" style={{ borderRadius: 12, fontWeight: 600 }}>
                                            {successMessage}
                                        </div>
                                    )}
                                    <button type="submit" className="btn-primary-custom w-100 justify-content-center py-3">Submit Review</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Reviews;
