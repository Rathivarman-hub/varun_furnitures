import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaWhatsapp } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { ThemeProvider, AuthProvider } from './context/AppContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop';
import { handleInquiry } from './utils/whatsapp';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';

const ScrollProgress = () => {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScroll((winScroll / height) * 100);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${scroll}%` }}></div>;
};

function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 50 });
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="app-container">
          <ScrollToTop />
          <ScrollProgress />
          <BackToTop />
          <Navbar />

          <main>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

          <Footer />

          <a href="https://wa.me/919342712365" onClick={() => handleInquiry()} className="whatsapp-float" target="_blank" rel="noopener noreferrer" title="Chat with us on WhatsApp">
            <FaWhatsapp />
          </a>

          <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
