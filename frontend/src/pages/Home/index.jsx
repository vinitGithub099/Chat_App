import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import chatImage from "../../assets/2796777_cropped.jpg";
import Header from "../../components/Header";
import classes from "./index.module.css";

const HomePage = () => {
  return (
    <div className={classes.container}>
      <Header className={classes.header} />
      <main className={classes.main}>
        <section className={classes.section}>
          <img className={classes.image} src={chatImage}></img>
        </section>
        <section className={classes.section}>
          <div className={classes.content}>
            <h2 className={classes.line1}>Hey!</h2>
            <p className={classes.line2}>Ready to chat?</p>
            <Button variant="text" className={classes.btn}>
              <Link to="/chat">{`Let's go`}</Link>
            </Button>
          </div>
        </section>
      </main>
      <footer className={classes.footer}>
        <p className={classes.footerNote}>
          created and maintained by{" "}
          <span className={classes.nameLink}>@VinitKumbhare</span>
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
