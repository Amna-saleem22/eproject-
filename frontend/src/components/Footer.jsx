 import React from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  Stack,
  Avatar,
  Paper,
} from '@mui/material';
import { motion } from 'framer-motion';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import DiamondIcon from '@mui/icons-material/Diamond';
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';

// ===== Theme constants (from your design system) =====
const COLORS = {
  text: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textMuted: 'rgba(255, 255, 255, 0.5)',
  primaryLight: '#0D47A1',
  primaryDark: '#0A3D91',
  borderStrong: 'rgba(13, 71, 161, 0.4)',
  glassEffect: 'rgba(255, 255, 255, 0.05)',
};

const SPACING = {
  sectionY: 6,
  contentGap: 4,
};

const CONTAINER = {
  wide: 'lg',
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialIcons = [
    { icon: <FacebookIcon />, color: '#1877F2', name: 'Facebook', url: 'https://facebook.com' },
    { icon: <InstagramIcon />, color: '#E4405F', name: 'Instagram', url: 'https://instagram.com' },
    { icon: <TwitterIcon />, color: '#1DA1F2', name: 'Twitter', url: 'https://twitter.com' },
    { icon: <LinkedInIcon />, color: '#0A66C2', name: 'LinkedIn', url: 'https://linkedin.com' },
  ];

  const quickLinks = [
    { text: 'Home', path: '/' },
    { text: 'About', path: '/about' },
    { text: 'Rooms', path: '/rooms'  },

    { text: 'Reviews', path: '/reviews'},
    { text: 'Contact', path: '/contact' },
  ];

  const contactInfo = [
    { icon: <LocationOnIcon />, text: '123 Luxury Avenue, Beverly Hills, CA 90210' },
    { icon: <PhoneIcon />, text: '+1 (888) 123-4567' },
    { icon: <EmailIcon />, text: 'info@luxurystay.com' },
  ];

  return (
    <>
      <style>{`
        /* Unique footer class names to avoid conflicts */
        .luxury-footer {
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          color: ${COLORS.text};
          padding: 5rem 0 2rem 0;
          position: relative;
          overflow: hidden;
          border-top: 1px solid ${COLORS.borderStrong};
          font-family: 'Inter', 'Helvetica Neue', sans-serif;
        }

        .luxury-footer-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 2;
        }

        /* Background effects */
        .luxury-footer-bg-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.03;
          background: radial-gradient(circle at 0% 50%, #0d47a1 0%, transparent 50%);
          pointer-events: none;
        }

        /* Grid layout - clean 4 columns */
        .luxury-footer-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.9fr 1.1fr 1.2fr;
          gap: 2.5rem;
          margin-bottom: 3.5rem;
        }

        /* Brand column */
        .luxury-footer-brand {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .luxury-footer-logo {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .luxury-footer-logo-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: ${COLORS.primaryLight};
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px ${COLORS.borderStrong};
        }

        .luxury-footer-logo-text {
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1.2;
          background: linear-gradient(135deg, #fff 30%, ${COLORS.primaryLight} 90%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 1px;
        }

        .luxury-footer-description {
          color: ${COLORS.textSecondary};
          line-height: 1.8;
          font-size: 0.95rem;
          margin: 0;
          max-width: 280px;
        }

        /* Social icons */
        .luxury-footer-social {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .luxury-footer-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          color: ${COLORS.text};
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }

        .luxury-footer-social-link:hover {
          background: rgba(255,255,255,0.1);
          border-color: currentColor;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }

        /* Column titles */
        .luxury-footer-title {
          color: ${COLORS.primaryLight};
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0 0 1.8rem 0;
          position: relative;
          letter-spacing: 0.5px;
        }

        .luxury-footer-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 40px;
          height: 3px;
          background-color: ${COLORS.primaryLight};
          border-radius: 2px;
        }

        /* Links list */
        .luxury-footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .luxury-footer-links li {
          margin: 0;
          padding: 0;
        }

        .luxury-footer-link {
          color: ${COLORS.textSecondary};
          text-decoration: none;
          font-size: 1rem;
          transition: all 0.2s ease;
          display: inline-block;
          position: relative;
        }

        .luxury-footer-link:hover {
          color: ${COLORS.primaryLight};
          transform: translateX(5px);
        }

        /* Contact info items */
        .luxury-footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.2rem;
        }

        .luxury-footer-contact-icon {
          color: ${COLORS.primaryLight};
          min-width: 24px;
          display: flex;
          justify-content: center;
          margin-top: 3px;
        }

        .luxury-footer-contact-text {
          color: ${COLORS.textSecondary};
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0;
        }

        /* Newsletter */
        .luxury-footer-newsletter-text {
          color: ${COLORS.textSecondary};
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0 0 1.5rem 0;
        }

        .luxury-footer-newsletter-form {
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.05);
          border: 1px solid ${COLORS.borderStrong};
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 2rem;
        }

        .luxury-footer-newsletter-input {
          flex: 1;
          background: transparent;
          border: none;
          padding: 0.875rem 1rem;
          color: ${COLORS.text};
          font-size: 0.95rem;
          outline: none;
        }

        .luxury-footer-newsletter-input::placeholder {
          color: rgba(255,255,255,0.5);
        }

        .luxury-footer-newsletter-button {
          background: ${COLORS.primaryLight};
          border: none;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: white;
          transition: all 0.3s ease;
          border-radius: 0 12px 12px 0;
        }

        .luxury-footer-newsletter-button:hover {
          background: ${COLORS.primaryDark};
          box-shadow: 0 0 20px ${COLORS.primaryLight};
        }

        /* Trust badges */
        .luxury-footer-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .luxury-footer-badge {
          background: rgba(13, 71, 161, 0.15);
          border: 1px solid ${COLORS.borderStrong};
          border-radius: 20px;
          padding: 0.35rem 1rem;
          color: ${COLORS.primaryLight};
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        /* Bottom section */
        .luxury-footer-bottom {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid ${COLORS.borderStrong};
        }

        .luxury-footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .luxury-footer-copyright {
          color: ${COLORS.textMuted};
          font-size: 0.9rem;
          margin: 0;
        }

        .luxury-footer-legal {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .luxury-footer-legal-link {
          color: ${COLORS.textMuted};
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s ease;
          cursor: pointer;
        }

        .luxury-footer-legal-link:hover {
          color: ${COLORS.primaryLight};
        }

        .luxury-footer-divider-line {
          height: 2px;
          background: linear-gradient(90deg, transparent, ${COLORS.primaryLight}, transparent);
          margin-top: 2rem;
        }

        /* Responsive design */
        @media (max-width: 1024px) {
          .luxury-footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
        }

        @media (max-width: 640px) {
          .luxury-footer-container {
            padding: 0 1.5rem;
          }
          
          .luxury-footer-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          
          .luxury-footer-bottom-content {
            flex-direction: column;
            text-align: center;
          }
          
          .luxury-footer-legal {
            justify-content: center;
          }
          
          .luxury-footer-title::after {
            left: 0;
            width: 40px;
          }
          
          .luxury-footer-brand {
            align-items: center;
            text-align: center;
          }
          
          .luxury-footer-description {
            text-align: center;
          }
        }
      `}</style>

      <footer className="luxury-footer">
        <div className="luxury-footer-bg-glow"></div>

        {/* Floating particles - simplified for performance */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none' }}>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: '#0d47a1',
                animation: `float ${10 + i}s linear infinite`,
              }}
            />
          ))}
        </div>

        <style>{`
          @keyframes float {
            0% { transform: translateY(0) translateX(0); }
            33% { transform: translateY(-20px) translateX(10px); }
            66% { transform: translateY(10px) translateX(-10px); }
            100% { transform: translateY(0) translateX(0); }
          }
        `}</style>

        <div className="luxury-footer-container">
          {/* Main grid - 4 columns */}
          <div className="luxury-footer-grid">
            {/* Column 1: Brand */}
            <div className="luxury-footer-brand">
              <div className="luxury-footer-logo">
                <div className="luxury-footer-logo-icon">
                  <DiamondIcon sx={{ color: 'white' }} />
                </div>
                <span className="luxury-footer-logo-text">LUXURY STAY</span>
              </div>
              <p className="luxury-footer-description">
                Experience unparalleled luxury and comfort at our prestigious hotel.
                Where every moment is crafted to perfection and every stay becomes a cherished memory.
              </p>
              <div className="luxury-footer-social">
                {socialIcons.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="luxury-footer-social-link"
                    style={{ color: social.color }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="luxury-footer-title">Quick Links</h4>
              <ul className="luxury-footer-links">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path} className="luxury-footer-link">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div>
              <h4 className="luxury-footer-title">Contact Info</h4>
              {contactInfo.map((info, index) => (
                <div key={index} className="luxury-footer-contact-item">
                  <div className="luxury-footer-contact-icon">{info.icon}</div>
                  <p className="luxury-footer-contact-text">{info.text}</p>
                </div>
              ))}
            </div>

            {/* Column 4: Newsletter */}
            <div>
              <h4 className="luxury-footer-title">Newsletter</h4>
              <p className="luxury-footer-newsletter-text">
                Subscribe to receive exclusive offers and updates about our luxury services.
              </p>
              <div className="luxury-footer-newsletter-form">
                <input
                  type="email"
                  placeholder="Your email"
                  className="luxury-footer-newsletter-input"
                />
                <button className="luxury-footer-newsletter-button">
                  <SendIcon fontSize="small" />
                </button>
              </div>
              <div className="luxury-footer-badges">
                <span className="luxury-footer-badge">SSL Secure</span>
                <span className="luxury-footer-badge">Best Rate</span>
                <span className="luxury-footer-badge">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="luxury-footer-bottom">
            <div className="luxury-footer-bottom-content">
              <p className="luxury-footer-copyright">
                © {currentYear} Luxury Stay Hotel. All rights reserved. Crafted with precision for the discerning traveler.
              </p>
              <div className="luxury-footer-legal">
                <a href="/privacy" className="luxury-footer-legal-link">Privacy Policy</a>
                <a href="/terms" className="luxury-footer-legal-link">Terms of Use</a>
                <a href="/cookies" className="luxury-footer-legal-link">Cookie Policy</a>
              </div>
            </div>
          </div>

          {/* Decorative bottom line */}
          <div className="luxury-footer-divider-line"></div>
        </div>
      </footer>
    </>
  );
};

export default Footer;