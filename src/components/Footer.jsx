import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2024 Translation App. All rights reserved.</p>
      <nav style={styles.nav}>
        <a href="#privacy" style={styles.navLink}>Privacy Policy</a>
        <a href="#terms" style={styles.navLink}>Terms of Service</a>
      </nav>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 20px',
    textAlign: 'center',
    marginTop: '150px',
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
  },
};

export default Footer;
