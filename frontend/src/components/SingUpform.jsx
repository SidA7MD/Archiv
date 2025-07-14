import React from 'react';
import styles from './SignUpForm.module.css';
import { FcGoogle } from 'react-icons/fc';
import { FaMicrosoft, FaTwitter, FaGithub } from 'react-icons/fa';

const SignUpForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Create your account</h2>
        <p className={styles.subtitle}>Start your free trial today</p>

        <form className={styles.form}>
          <input type="text" placeholder="Full Name" className={styles.input} />
          <input type="email" placeholder="Email" className={styles.input} />
          <input type="password" placeholder="Password" className={styles.input} />

          <button className={styles.submitBtn}>Sign Up</button>
        </form>

        <p className={styles.orText}>or sign up with</p>

        <div className={styles.socialButtons}>
          <button className={styles.socialBtn}><FcGoogle className={styles.icon} /> Sign up with Google</button>
          <button className={styles.socialBtn}><FaMicrosoft color="#5E5E5E" className={styles.icon} /> Sign up with Microsoft</button>
          <button className={styles.socialBtn}><FaTwitter color="#1DA1F2" className={styles.icon} /> Sign up with Twitter</button>
          <button className={styles.socialBtn}><FaGithub color="#333" className={styles.icon} /> Sign up with GitHub</button>
        </div>

        <p className={styles.footer}>
          Already have an account? <a href="#">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
