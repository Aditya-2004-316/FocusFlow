import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
} from "@heroicons/react/24/outline";
import "./Footer.css"; // Import the new Footer.css file

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content-wrapper">
                <div className="footer-grid">
                    {/* Product Section */}
                    <div>
                        <h3 className="footer-section-heading">Product</h3>
                        <ul className="footer-list">
                            <li>
                                <a href="/features" className="footer-link">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="/pricing" className="footer-link">
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a href="/updates" className="footer-link">
                                    Updates
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* Resources Section */}
                    <div>
                        <h3 className="footer-section-heading">Resources</h3>
                        <ul className="footer-list">
                            <li>
                                <a href="/blog" className="footer-link">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="/guides" className="footer-link">
                                    Guides
                                </a>
                            </li>
                            <li>
                                <a href="/support" className="footer-link">
                                    Support
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* Company Section */}
                    <div>
                        <h3 className="footer-section-heading">Company</h3>
                        <ul className="footer-list">
                            <li>
                                <a href="/about" className="footer-link">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="/careers" className="footer-link">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="footer-link">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* Contact Section */}
                    <div>
                        <h3 className="footer-section-heading">Contact Us</h3>
                        <ul className="footer-list">
                            <li className="footer-contact-item">
                                <EnvelopeIcon />
                                <a
                                    href="mailto:support@focusflow.com"
                                    className="footer-link"
                                >
                                    support@focusflow.com
                                </a>
                            </li>
                            <li className="footer-contact-item">
                                <PhoneIcon />
                                <a
                                    href="tel:+1234567890"
                                    className="footer-link"
                                >
                                    +1 (234) 567-890
                                </a>
                            </li>
                            <li className="footer-contact-item">
                                <MapPinIcon />
                                <span className="footer-contact-text">
                                    123 Focus Street, Productivity City
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div>© 2024 FocusFlow. All rights reserved.</div>
                    <div className="footer-bottom-links">
                        <a href="/privacy" className="footer-link">
                            Privacy Policy
                        </a>
                        <a href="/terms" className="footer-link">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
