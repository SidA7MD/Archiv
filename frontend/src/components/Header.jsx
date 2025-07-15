import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../images/logo-supnum2.png';
import { Menu } from 'lucide-react'; // optional: install lucide-react

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const userInitial = null; // replace with actual auth logic

  const handleLogout = () => {
    console.log('Disconnecting...');
    // logout logic
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <img src={logo} alt="SupNum Logo" className={styles.logoImg} />

      <button className={styles.burger} onClick={() => setMenuOpen(!menuOpen)}>
        <Menu size={24} />
      </button>

      {menuOpen && (
        <div className={styles.menuDropdown}>
          {userInitial ? (
            <>
              <div className={styles.avatar}>{userInitial}</div>
              <button onClick={handleLogout} className={styles.menuButton}>
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className={styles.menuButton}>
                Connexion
              </button>
              <button onClick={() => navigate('/signup')} className={styles.menuButton}>
                Créer un compte
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
