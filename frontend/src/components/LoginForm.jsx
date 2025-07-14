import React from 'react';
import styles from './LoginForm.module.css';
import { FcGoogle } from 'react-icons/fc';
import { FaMicrosoft, FaTwitter, FaGithub } from 'react-icons/fa';

const LoginForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Log In</h2>
        <p className={styles.subtitle}>Welcome back! Please enter your credentials</p>

        <form className={styles.form}>
          <input type="email" placeholder="Email" className={styles.input} />
          <input type="password" placeholder="Password" className={styles.input} />

          <div className={styles.actions}>
            <a href="#" className={styles.forgot}>Forgot Password?</a>
          </div>

          <button type="submit" className={styles.loginBtn}>Login</button>
        </form>

        <p className={styles.orText}>or log in with</p>

        <div className={styles.socialButtons}>
          <button className={styles.socialBtn}><FcGoogle className={styles.icon} /> Sign in with Google</button>
          <button className={styles.socialBtn}><FaMicrosoft color="#5E5E5E" className={styles.icon} /> Sign in with Microsoft</button>
          <button className={styles.socialBtn}><FaTwitter color="#1DA1F2" className={styles.icon} /> Sign in with Twitter</button>
          <button className={styles.socialBtn}><FaGithub color="#333" className={styles.icon} /> Sign in with GitHub</button>
        </div>

        <p className={styles.footer}>
          Don’t have an account? <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
