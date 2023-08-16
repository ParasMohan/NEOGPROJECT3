import React from "react";
import { useFooter } from "../context/FooterContext"; // Import the context hook
import "./Footer.css"; // Import your CSS file for styling

export default function Footer() {
  const { footerLinks } = useFooter(); // Use the context hook

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">© {new Date().getFullYear()} ShopeeKart</p>
        <div className="social-links">
          {footerLinks.map(link => (
            <a
              key={link.text}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              {link.text}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
