import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import styles from './Header.module.css';
import logo from '../images/logo-supnum2.png';

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);
  
  // For demonstration - replace with your auth state
  const user = { name: "SidA7MD", initial: "S" };
  // Set to null when logged out: const user = null;

  // Handle click outside to close menu
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

  const handleLogout = () => {
    console.log('Logging out...');
    // Your logout logic here
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <img src={logo} alt="SupNum Logo" className={styles.logoImg} />
      </div>

      {/* User profile section (desktop) */}
      <div className={styles.profileSection}>
        {user ? (
          <div className={styles.userInfo}>
            <div className={styles.avatar}>{user.initial}</div>
            <span className={styles.username}>{user.name}</span>
          </div>
        ) : (
          <div className={styles.authButtons}>
            <button 
              className={styles.loginBtn}
              onClick={() => navigate('/login')}
            >
              Connexion
            </button>
            <button 
              className={styles.signupBtn}
              onClick={() => navigate('/signup')}
            >
              Créer un compte
            </button>
          </div>
        )}
      </div>

      {/* Mobile burger button */}
      <button
        ref={burgerRef}
        className={styles.burgerBtn}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile slide-in menu */}
      <div 
        ref={menuRef}
        className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}
      >
        <div className={styles.mobileHeader}>
          {user ? (
            <>
              <div className={styles.mobileUserSection}>
                <div className={styles.mobileAvatar}>{user.initial}</div>
                <span className={styles.mobileUsername}>{user.name}</span>
              </div>
              <button 
                className={styles.logoutBtn}
                onClick={handleLogout}
              >
                Déconnexion
              </button>
            </>
          ) : (
            <div className={styles.mobileAuthButtons}>
              <button 
                className={styles.mobileLoginBtn}
                onClick={() => navigate('/login')}
              >
                Connexion
              </button>
              <button 
                className={styles.mobileSignupBtn}
                onClick={() => navigate('/signup')}
              >
                Créer un compte
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;