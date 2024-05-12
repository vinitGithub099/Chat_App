import { Link } from "react-router-dom";
import chatImage from "../../assets/7495.jpg";
import styles from "./index.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>chathub</div>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li className={styles.listItem}>Home</li>
            <li className={styles.listItem}>Demo</li>
            <li className={styles.listItem}>Features</li>
            <li className={styles.listItem}>Help</li>
            <li className={styles.loginBtn}>
              <Link to="/login">Login</Link>
            </li>
            <li className={styles.registerBtn}>
              <Link to="/register">Sign Up</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        <section className={styles.section}>
          <img className={styles.image} src={chatImage}></img>
        </section>
        <section className={styles.section}>
          <div className={styles.content}>
            <h2 className={styles.line1}>Hey!</h2>
            <p className={styles.line2}>Ready to chat?</p>
            <button className={styles.btn}>
              <Link to="/chat">{`Let's go`}</Link>
            </button>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <p className={styles.footerNote}>
          created and maintained by{" "}
          <span className={styles.nameLink}>@VinitKumbhare</span>
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
