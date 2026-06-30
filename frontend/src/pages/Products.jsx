import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FaSearch, FaFilter } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { fetchProducts, fetchCategories } from '../api/api';
const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialCategory = searchParams.get('category') || '';

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState(initialCategory);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    useEffect(() => {
        const getCats = async () => {
            try {
                const { data } = await fetchCategories();
                setCategories(data);
            } catch (error) { console.error('Error fetching categories'); }
        };
        getCats();
    }, []);

    useEffect(() => {
        const getProds = async () => {
            setLoading(true);
            try {
                const { data } = await fetchProducts({ category: activeCategory, search });
                setProducts(data.products);
            } catch (error) {
                console.error('Error fetching products');
            } finally {
                setLoading(false);
            }
        };
        const timer = setTimeout(() => { getProds(); }, 500); // Debounce search
        return () => clearTimeout(timer);
    }, [activeCategory, search]);

    const handleCategoryFilter = (cat) => {
        setActiveCategory(activeCategory === cat ? '' : cat);
        if (activeCategory === cat) setSearchParams({});
        else setSearchParams({ category: cat });
    };

    return (
        <div className="pt-5 mt-5">
            <section className="py-5 bg-card" style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}>
                <div className="container text-center">
                    <h1 className="section-title mb-3" data-aos="fade-up">Our <span className="gradient-text">Products</span></h1>
                    <p className="section-subtitle mb-0" data-aos="fade-up" data-aos-delay="100">
                        Browse our extensive collection of premium furniture
                    </p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    {/* Filters & Search */}
                    <div className="row g-4 mb-5 align-items-center" data-aos="fade-up">
                        <div className="col-lg-8">
                            <div className="d-flex flex-wrap gap-2">
                                <button
                                    className={`filter-btn ${activeCategory === '' ? 'active' : ''}`}
                                    onClick={() => handleCategoryFilter('')}
                                >
                                    All Products
                                </button>
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                                        onClick={() => handleCategoryFilter(cat)}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="search-container">
                                <FaSearch className="search-icon" />
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Search furniture..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="row g-4">
                        {loading ? (
                            [...Array(8)].map((_, i) => (
                                <div key={i} className="col-lg-3 col-md-4 col-sm-6">
                                    <div className="product-card">
                                        <Skeleton height={240} className="skeleton" borderRadius={0} />
                                        <div className="p-3">
                                            <Skeleton width="40%" height={15} className="skeleton mb-2" />
                                            <Skeleton width="80%" height={20} className="skeleton mb-3" />
                                            <Skeleton width="60%" height={25} className="skeleton" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : products.length > 0 ? (
                            products.map((product, idx) => (
                                <div key={product._id} className="col-lg-3 col-md-4 col-sm-6" data-aos="fade-up" data-aos-delay={(idx % 4) * 100}>
                                    <div className="product-card">
                                        <Link to={`/products/${product._id}`} style={{ textDecoration: 'none' }}>
                                            <div style={{ overflow: 'hidden', position: 'relative' }}>
                                                <img src={product.images[0]} alt={product.name} className="product-card-img" />
                                                {product.featured && (
                                                    <span className="badge-custom position-absolute" style={{ top: 10, left: 10, background: 'var(--bg-card)', border: 'none' }}>
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                            <div className="product-card-body">
                                                <div className="product-card-category">{product.category}</div>
                                                <h5 className="product-card-name text-truncate">{product.name}</h5>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="product-card-price">₹{product.price.toLocaleString()}</div>
                                                    <div className="btn-outline-custom py-1 px-3" style={{ fontSize: '0.75rem' }}>View Details</div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center py-5" data-aos="fade-up">
                                <FaFilter style={{ fontSize: '3rem', color: 'var(--border)', marginBottom: '1rem' }} />
                                <h4>No products found</h4>
                                <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search or filter criteria.</p>
                                <button className="btn-outline-custom mt-3" onClick={() => { setSearch(''); setActiveCategory(''); }}>
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Products;
