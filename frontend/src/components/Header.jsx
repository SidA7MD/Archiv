import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, HelpCircle, Mail, Github, Linkedin } from 'lucide-react';
import styles from './Header.module.css'; // Make sure this path is correct
import logo from '../images/logo-supnum2.png'; // Make sure this path is correct

const Header = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const burgerRef = useRef(null);

    // Effect for handling click outside the panel or burger button
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

    // Effect for managing body scroll when the panel is open
    useEffect(() => {
        if (menuOpen) {
            // Add the generated CSS Module class to the body
            document.body.classList.add(styles.helpPanelOpen);
        } else {
            // Remove the class
            document.body.classList.remove(styles.helpPanelOpen);
        }

        // Cleanup function: important to ensure the class is removed
        // when the component unmounts or before the effect re-runs
        return () => {
            document.body.classList.remove(styles.helpPanelOpen);
        };
    }, [menuOpen]); // This effect runs whenever menuOpen state changes

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
                      Cette application est une solution web moderne dédiée à l’organisation et à la consultation des documents universitaires. Elle permet aux étudiants d’accéder facilement aux cours, devoirs, examens et archives des années précédentes, le tout dans un environnement clair, structuré et accessible depuis n’importe quel appareil.

Pensée pour la simplicité et l’efficacité, cette application centralise l’essentiel pour vous faire gagner du temps et rester concentré sur vos études.
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