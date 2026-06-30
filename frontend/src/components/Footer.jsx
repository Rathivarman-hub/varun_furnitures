import { Link } from "react-router-dom";
import {
  FaCouch,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaInstagram,
  FaWhatsapp,
  FaHeart,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { handleInquiry } from "../utils/whatsapp";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="row g-5 mb-5">
          {/* Brand */}
          <div className="col-lg-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <FaCouch style={{ color: "#c8860a", fontSize: "1.8rem" }} />
              <span className="footer-brand">Varun Furniture</span>
            </div>
            <p style={{ fontSize: "0.92rem", lineHeight: "1.8" }}>
              Your trusted furniture partner in Paramakudi. We offer premium
              quality furniture for sale, making your home beautiful and
              comfortable.
            </p>
            <div className="d-flex gap-2 mt-4">
              <a
                href="https://www.instagram.com/varun_travels_and_furnitures?igsh=cDA3ZXh5enQ5dWZw"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://wa.me/919342712365"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
                onClick={() => handleInquiry()}
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-6">
            <h6
              className="text-white fw-700 mb-4"
              style={{ fontFamily: "Playfair Display" }}
            >
              Quick Links
            </h6>
            {[
              { label: "Home", to: "/" },
              { label: "About Us", to: "/about" },
              { label: "Products", to: "/products" },
              { label: "Contact", to: "/contact" },
            ].map((link) => (
              <Link key={link.to} to={link.to} className="footer-link">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Categories */}
          <div className="col-lg-2 col-6">
            <h6
              className="text-white fw-700 mb-4"
              style={{ fontFamily: "Playfair Display" }}
            >
              Categories
            </h6>
            {[
              "Sofa",
              "Beds",
              "Dining Tables",
              "Chairs",
              "Cupboards",
              "Office Furniture",
            ].map((cat) => (
              <Link
                key={cat}
                to={`/products?category=${cat}`}
                className="footer-link"
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="col-lg-4">
            <h6
              className="text-white fw-700 mb-4"
              style={{ fontFamily: "Playfair Display" }}
            >
              Contact Us
            </h6>
            <div className="d-flex gap-3 mb-3">
              <span className="footer-contact-icon">
                <FaMapMarkerAlt />
              </span>
              <span style={{ fontSize: "0.9rem" }}>
                Burma Colony, 1st St, Emaneswaram,
                <br />
                Paramakudi, Tamil Nadu – 623701
              </span>
            </div>
            <div className="d-flex gap-3 mb-3">
              <span className="footer-contact-icon">
                <FaPhone />
              </span>
              <a
                href="tel:+919342712365"
                className="footer-link"
                style={{ margin: 0 }}
              >
                +91 93427 12365
              </a>
              <br />
              <a
                href="tel:+918870834292"
                className="footer-link"
                style={{ margin: 0 }}
              >
                +91 88708 34292
              </a>{" "}
            </div>
            <div className="d-flex gap-3 mb-3">
              <span className="footer-contact-icon">
                <FaEnvelope />
              </span>
              <a
                href="mailto:info@varunfurniture.com"
                className="footer-link"
                style={{ margin: 0 }}
              >
                varunfurnitures2026@gmail.com
              </a>
            </div>
            <div
              className="mt-3 p-3 rounded-3"
              style={{
                background: "rgba(200,134,10,0.1)",
                border: "1px solid rgba(200,134,10,0.2)",
              }}
            >
              <div
                style={{
                  color: "#f0b429",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                }}
              >
                ⏰ Business Hours
              </div>
              <div style={{ fontSize: "0.85rem", marginTop: "4px" }}>
                Mon – Sun: 9:00 AM – 8:00 PM
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="pt-4"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "0.88rem", margin: 0 }}>
  © {currentYear} Varun Furniture. Quality furniture for every home.
</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
