import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../images/logo-supnum2.png';

const Header = () => {
  const navigate = useNavigate();
  const userInitial = 'A'; // Later replace with actual user initial (e.g. from auth)

  return (
    <header className={styles.header}>
      <img src={logo} alt="SupNum Logo" className={styles.logoImg} />

      <div className={styles.topRight}>
        <button className={styles.navButton} onClick={() => navigate('/login')}>
          Connexion
        </button>
        <button className={styles.navButton} onClick={() => navigate('/signup')}>
          Créer un compte
        </button>
        <div className={styles.avatar}>{userInitial}</div>
      </div>
    </header>
  );
};

export default Header;
