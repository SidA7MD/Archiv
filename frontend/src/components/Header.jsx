import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, HelpCircle, Mail, Github, Linkedin } from 'lucide-react';
import styles from './Header.module.css';
import logo from '../images/logo-supnum2.png';

const Header = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const burgerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                menuOpen &&
                menuRef.current &&
                !menuRef.current.contains(e.target) &&
                burgerRef.current &&
                !burgerRef.current.contains(e.target)
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen]);

    const handleClose = () => {
        setMenuOpen(false);
    };

    return (
        <header className={styles.header}>
            {/* Logo */}
            <div
                className={styles.logoContainer}
                onClick={() => navigate('/')}
                style={{ cursor: 'pointer' }}
            >
                <img src={logo} alt="SupNum Logo" className={styles.logoImg} />
                <div className={styles.logoText}>
                    <span className={styles.projectNameTop}>SupNum</span>
                    <span className={styles.projectNameBottom}>Archiv</span>
                </div>
            </div>

            {/* Help button */}
            <button
                ref={burgerRef}
                className={styles.helpBtn}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close help" : "Show help"}
            >
                {menuOpen ? (
                    <X size={24} className={styles.icon} />
                ) : (
                    <HelpCircle size={24} className={styles.icon} />
                )}
            </button>

            {/* Help panel */}
            <div
                ref={menuRef}
                className={`${styles.helpPanel} ${menuOpen ? styles.open : ''}`}
            >
                <div className={styles.panelContent}>
                    <h3 className={styles.panelTitle}>À propos</h3>
                    <p className={styles.panelText}>
                        Salut ! Je suis développeur passionné par la création d'interfaces modernes,
                        la performance web et les expériences utilisateurs fluides. Contacte-moi si tu veux collaborer !
                    </p>

                    <div className={styles.contactLinks}>
                        <a
                            href="mailto:contact@example.com"
                            className={styles.contactLink}
                            aria-label="Email"
                        >
                            <Mail size={28} />
                            <span className={styles.linkText}>Email</span>
                        </a>
                        <a
                            href="https://github.com/yourprofile"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.contactLink}
                            aria-label="GitHub"
                        >
                            <Github size={28} />
                            <span className={styles.linkText}>GitHub</span>
                        </a>
                        <a
                            href="https://linkedin.com/in/yourprofile"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.contactLink}
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={28} />
                            <span className={styles.linkText}>LinkedIn</span>
                        </a>
                    </div>
                </div>

                <button
                    className={styles.closeBtn}
                    onClick={handleClose}
                    aria-label="Fermer le panneau d'aide"
                >
                    <X size={20} />
                    <span>Fermer</span>
                </button>
            </div>
        </header>
    );
};

export default Header;