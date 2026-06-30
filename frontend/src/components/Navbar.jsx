import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaSun, FaMoon, FaShoppingCart, FaBars, FaTimes, FaCouch } from 'react-icons/fa';
import { useTheme, useAuth } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => { setMenuOpen(false); }, [location]);

    const navLinks = [
        { label: 'Home', to: '/' },
        { label: 'About', to: '/about' },
        { label: 'Products', to: '/products' },
        { label: 'Reviews', to: '/reviews' },
        { label: 'Contact', to: '/contact' },
    ];

    return (
        <nav className={`navbar-custom ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-container">
                {/* Brand */}
                <Link to="/" className="navbar-brand-custom">
                    <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="brand-icon-container"
                    >
                        <FaCouch />
                    </motion.div>
                    <div className="brand-text-wrapper">
                        <h1 className="brand-text">Varun</h1>
                        <span className="brand-text-accent">Furnitures</span>
                    </div>
                </Link>

                {/* Right side Actions (Mobile Toggle, Theme, Profile) */}
                <div className="d-flex align-items-center gap-2">
                    {/* Desktop Nav */}
                    <div className="d-none d-lg-flex align-items-center gap-2 me-3">
                        {navLinks.map((link) => (
                            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Theme Toggle */}
                    <div className="theme-toggle-wrapper">
                        <motion.button
                            layout
                            className={`theme-toggle-new ${theme}`}
                            onClick={toggleTheme}
                            whileTap={{ scale: 0.9 }}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={theme}
                                    initial={{ y: -20, opacity: 0, rotate: -90 }}
                                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                                    exit={{ y: 20, opacity: 0, rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                    className="theme-icon"
                                >
                                    {theme === 'dark' ? <FaMoon /> : <FaSun />}
                                </motion.div>
                            </AnimatePresence>
                            <motion.div layout className="toggle-handle" />
                        </motion.button>
                    </div>



                    {/* Mobile Toggle */}
                    <button className="mobile-toggle-btn d-lg-none" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="mobile-menu-container"
                        style={{ overflowX: 'hidden' }}
                    >
                        <div className="p-4 d-flex flex-column h-100">
                            <div className="mobile-nav-links flex-grow-1">
                                {navLinks.map((link) => (
                                    <NavLink 
                                        key={link.to} 
                                        to={link.to} 
                                        end={link.to === '/'} 
                                        className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {link.label}
                                    </NavLink>
                                ))}
                            </div>
                            

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
