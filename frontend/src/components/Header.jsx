import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, HelpCircle, Mail, Github } from 'lucide-react';
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

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [menuOpen]);

    const handleClose = () => {
        setMenuOpen(false);
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 clamp(20px, 4vw, 40px)',
        background: '#E6F4EA',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        height: 'clamp(70px, 10vw, 80px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    };

    const logoContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(12px, 2vw, 16px)',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
    };

    const logoImgStyle = {
        height: 'clamp(32px, 6vw, 42px)',
        width: 'auto',
        objectFit: 'contain',
        transition: 'transform 0.3s ease',
    };

    const logoTextStyle = {
        display: 'flex',
        flexDirection: 'column',
        lineHeight: 1.1,
    };

    const projectNameTopStyle = {
        fontSize: 'clamp(1.2rem, 3.5vw, 1.5rem)',
        fontWeight: '700',
        color: '#1e293b',
        letterSpacing: '-0.5px',
        background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textShadow: '0 2px 4px rgba(16, 185, 129, 0.1)',
    };

    const projectNameBottomStyle = {
        fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)',
        fontWeight: '500',
        color: '#6b7280',
        letterSpacing: '0.8px',
        textTransform: 'uppercase',
    };

    const helpBtnStyle = {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        width: 'clamp(40px, 8vw, 48px)',
        height: 'clamp(40px, 8vw, 48px)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        position: 'relative',
    };

    const iconStyle = {
        color: '#64748b',
        transition: 'all 0.3s ease',
        width: 'clamp(20px, 4vw, 24px)',
        height: 'clamp(20px, 4vw, 24px)',
    };

    const helpPanelStyle = {
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100vh',
        width: '100%',
        maxWidth: 'clamp(100%, 90vw, 480px)',
        background: '#E6F4EA',
        zIndex: 1100,
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
    };

    const panelContentStyle = {
        flex: 1,
        padding: 'clamp(24px, 6vw, 32px) clamp(20px, 4vw, 24px) 0',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        position: 'relative',
    };

    const panelTitleStyle = {
        fontSize: 'clamp(1.8rem, 6vw, 2.25rem)',
        fontWeight: '700',
        background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: 'clamp(24px, 6vw, 32px)',
        position: 'relative',
        paddingBottom: '16px',
        letterSpacing: '-0.5px',
        lineHeight: 1.2,
    };

    const panelTextStyle = {
        fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
        lineHeight: 1.7,
        color: '#374151',
        marginBottom: 'clamp(32px, 8vw, 48px)',
        position: 'relative',
        padding: 'clamp(20px, 4vw, 24px)',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        fontWeight: '400',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease',
    };

    const contactLinksStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 'clamp(16px, 4vw, 20px)',
        marginBottom: 'clamp(24px, 6vw, 32px)',
        flexWrap: 'wrap',
        padding: '0 clamp(16px, 4vw, 24px)',
    };

    const contactLinkStyle = {
        padding: 'clamp(12px, 3vw, 16px)',
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '50%',
        width: 'clamp(48px, 10vw, 60px)',
        height: 'clamp(48px, 10vw, 60px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
        color: '#64748b',
    };

    const closeBtnStyle = {
        width: '100%',
        maxWidth: 'clamp(200px, 60vw, 300px)',
        margin: '0 auto clamp(24px, 6vw, 32px)',
        padding: 'clamp(12px, 3vw, 16px)',
        background: 'rgba(255, 255, 255, 0.9)',
        color: '#64748b',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        borderRadius: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textAlign: 'center',
        fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
    };

    const backdropStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.3)',
        zIndex: 1050,
        opacity: menuOpen ? 1 : 0,
        visibility: menuOpen ? 'visible' : 'hidden',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
    };

    const handleLogoHover = (e, isHovering) => {
        if (isHovering) {
            e.currentTarget.style.transform = 'translateX(-2px)';
        } else {
            e.currentTarget.style.transform = 'translateX(0)';
        }
    };

    const handleHelpBtnHover = (e, isHovering) => {
        if (isHovering) {
            e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)';
            e.currentTarget.querySelector('.icon').style.color = '#10b981';
            e.currentTarget.querySelector('.icon').style.transform = 'scale(1.1)';
        } else {
            e.currentTarget.style.background = 'none';
            e.currentTarget.querySelector('.icon').style.color = '#64748b';
            e.currentTarget.querySelector('.icon').style.transform = 'scale(1)';
        }
    };

    const handleContactLinkHover = (e, isHovering) => {
        if (isHovering) {
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.background = 'linear-gradient(135deg, #10b981 0%, #34d399 100%)';
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.3)';
        } else {
            e.currentTarget.style.color = '#64748b';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
        }
    };

    const handleCloseBtnHover = (e, isHovering) => {
        if (isHovering) {
            e.currentTarget.style.background = 'linear-gradient(135deg, #10b981 0%, #34d399 100%)';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.3)';
        } else {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.style.color = '#64748b';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
        }
    };

    return (
        <>
            <header style={headerStyle}>
                {/* Logo */}
                <div
                    style={logoContainerStyle}
                    onClick={() => navigate('/')}
                    onMouseEnter={(e) => handleLogoHover(e, true)}
                    onMouseLeave={(e) => handleLogoHover(e, false)}
                >
                    <img 
                        src={logo} 
                        alt="Archiv Logo" 
                        style={logoImgStyle}
                    />
                    <div style={logoTextStyle}>
                        <span style={projectNameTopStyle}>Archiv</span>
                    </div>
                </div>

                {/* Help button */}
                <button
                    ref={burgerRef}
                    style={helpBtnStyle}
                    onClick={() => setMenuOpen(!menuOpen)}
                    onMouseEnter={(e) => handleHelpBtnHover(e, true)}
                    onMouseLeave={(e) => handleHelpBtnHover(e, false)}
                    aria-label={menuOpen ? "Close help" : "Show help"}
                >
                    {menuOpen ? (
                        <X style={iconStyle} className="icon" />
                    ) : (
                        <HelpCircle style={iconStyle} className="icon" />
                    )}
                </button>
            </header>

            {/* Backdrop */}
            <div style={backdropStyle} onClick={handleClose} />

            {/* Help panel */}
            <div ref={menuRef} style={helpPanelStyle}>
                <div style={panelContentStyle}>
                    <h3 style={panelTitleStyle}>À propos</h3>
                    <p style={panelTextStyle}>
                        Cette application est une solution web moderne dédiée à l'organisation et à la consultation des documents universitaires. Elle permet aux étudiants d'accéder facilement aux cours, devoirs, examens et archives des années précédentes, le tout dans un environnement clair, structuré et accessible depuis n'importe quel appareil.
                        <br /><br />
                        Pensée pour la simplicité et l'efficacité, cette application centralise l'essentiel pour vous faire gagner du temps et rester concentré sur vos études.
                    </p>

                    <div style={contactLinksStyle}>
                        <a
                            href="mailto:24110@supnum.mr"
                            style={contactLinkStyle}
                            onMouseEnter={(e) => handleContactLinkHover(e, true)}
                            onMouseLeave={(e) => handleContactLinkHover(e, false)}
                            aria-label="Email"
                        >
                            <Mail size={20} />
                        </a>
                        <a
                            href="https://github.com/SidA7MD"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={contactLinkStyle}
                            onMouseEnter={(e) => handleContactLinkHover(e, true)}
                            onMouseLeave={(e) => handleContactLinkHover(e, false)}
                            aria-label="GitHub"
                        >
                            <Github size={20} />
                        </a>
                    </div>

                    <button
                        style={closeBtnStyle}
                        onClick={handleClose}
                        onMouseEnter={(e) => handleCloseBtnHover(e, true)}
                        onMouseLeave={(e) => handleCloseBtnHover(e, false)}
                        aria-label="Fermer le panneau d'aide"
                    >
                        <X size={16} />
                        <span>Fermer</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Header;