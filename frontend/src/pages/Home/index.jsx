import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import chatImage from "../../assets/2796777_cropped.jpg";
import Header from "../../components/Header";
import classes from "./index.module.css";
import { BUTTON_VARIANT, TYPOGRAPHY_VARIANT } from "../../constants/variants";

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
            <Button variant={BUTTON_VARIANT.TEXT} className={classes.btn}>
              <Link to="/chat">{`Let's go`}</Link>
            </Button>
          </div>
        </section>
      </main>
      <footer className={classes.footer}>
        <Typography variant={TYPOGRAPHY_VARIANT.SMALL}>
          created and maintained by{" "}
          <span className={classes.nameLink}>@VinitKumbhare</span>
        </Typography>
      </footer>
    </div>
  );
};

export default HomePage;
