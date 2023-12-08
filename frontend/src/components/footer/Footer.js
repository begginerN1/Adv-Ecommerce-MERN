import React from 'react';
import styles from "./Footer.module.scss";

const Footer = () => {
    const date = new Date().getFullYear();

  return (
      <div className={styles.footer}>
          &copy; {date} All rights reserved
    </div>
  )
}

export default Footer