import { Typography } from "@material-tailwind/react";
import imgSrc from "../../assets/Group-Chat-Illustration-1-removebg-preview.png";
import Header from "../../components/Header";
import Logo from "../../components/Logo";
import { TYPOGRAPHY_VARIANT } from "../../constants/variants";
import classes from "./index.module.css";

const HomePage = () => {
  return (
    <div className={classes.container}>
      <Header className={classes.header} />
      <main className={classes.main}>
        <section className={classes.section}>
          <Logo size="xl" className="mb-4" />
          <Typography
            variant={TYPOGRAPHY_VARIANT.H4}
            className={classes.line1}
          >
            Welcome to
          </Typography>
          <Typography variant={TYPOGRAPHY_VARIANT.H2} className={classes.line2}>
            Realtime Chat Application
          </Typography>
          <Typography variant={TYPOGRAPHY_VARIANT.PARAGRAPH} className={classes.para}>
          A real-time chat application built using the MERN stack with a powerful JWT authentication system. It features real-time messaging, typing updates, and the ability for users to create both group and individual chats. The UI is built using Material-Tailwind. Additionally, the application has a sleek and engaging landing page to welcome users.
          </Typography>
        </section>
          <img
            src={imgSrc}
            className={classes.coverImg}
          />
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
