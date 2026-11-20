import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import type { ComponentType, CSSProperties } from "react";
import { useState } from "react";
import imgSrc from "../../assets/Group-Chat-Illustration-1-removebg-preview.png";
import Header from "../../components/Header";
import Logo from "../../components/Logo";
import { TYPOGRAPHY_VARIANT } from "../../constants/variants";
import classes from "./index.module.css";
import { PROFILE_LINKS } from "./profileLinks";

type AccentVariant = "sky" | "pink";

interface FeatureItem {
  tag: string;
  title: string;
  description: string;
  accent: AccentVariant;
}

interface WorkflowStep {
  step: string;
  title: string;
  detail: string;
}

interface ProfileLinkItem {
  link: string;
  icon?: ComponentType<{ className?: string }>;
  label: string;
}

const HERO_PILLS: readonly string[] = [
  "Instant Messaging",
  "Live Typing Status",
  "1:1 & Group Rooms",
  "JWT Secured",
];

const FEATURES: readonly FeatureItem[] = [
  {
    tag: "Real-Time Engine",
    title: "Zero-Lag Messaging",
    description:
      "Send and receive messages instantly across active sessions without manual refreshes or clunky reloads.",
    accent: "sky",
  },
  {
    tag: "Presence & UX",
    title: "Live Typing Indicators",
    description:
      "See when someone is actively typing in a conversation so back-and-forth chats feel natural and responsive.",
    accent: "pink",
  },
  {
    tag: "Conversations",
    title: "Individual & Group Chats",
    description:
      "Switch smoothly between focused one-on-one chats and multi-user group rooms for teams or communities.",
    accent: "sky",
  },
  {
    tag: "Security",
    title: "JWT Authentication",
    description:
      "Protected routes and token-based session handling keep user accounts and chat access secure.",
    accent: "pink",
  },
];

const WORKFLOW_STEPS: readonly WorkflowStep[] = [
  {
    step: "01",
    title: "Authenticate with JWT",
    detail: "Verify user identity securely and establish an authenticated session.",
  },
  {
    step: "02",
    title: "Pick a Direct or Group Room",
    detail: "Open an individual thread or collaborate inside a shared group space.",
  },
  {
    step: "03",
    title: "Chat with Live Feedback",
    detail: "Exchange messages and typing updates in real time on a crisp UI.",
  },
];

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const closeMenu = (): void => setIsMenuOpen(false);
  const profileItems: ProfileLinkItem[] = Object.values(
    (PROFILE_LINKS ?? {}) as Record<string, ProfileLinkItem>
  );

  return (
    <div className={classes.container}>
      <Header className={classes.header} />

      <main className={classes.main}>
        {/* Hero Section */}
        <section className={classes.hero}>
          <div className={`${classes.heroCopy} ${classes.revealUp}`}>
            <div className={classes.badge}>
              <span className={classes.pulseDot} aria-hidden="true" />
              <Typography
                variant={TYPOGRAPHY_VARIANT.SMALL}
                className={classes.badgeText}
              >
                MERN Stack • Material-Tailwind UI
              </Typography>
            </div>

            <div className={classes.logoWrap}>
              <Logo size="2xl" className={classes.logo} />
            </div>

            <Typography
              variant={TYPOGRAPHY_VARIANT.H4}
              className={classes.line1}
            >
              Welcome to
            </Typography>

            <Typography
              variant={TYPOGRAPHY_VARIANT.H2}
              className={classes.line2}
            >
              Realtime Chat Application
            </Typography>

            <Typography
              variant={TYPOGRAPHY_VARIANT.PARAGRAPH}
              className={classes.para}
            >
              A full-stack real-time chat application built with MongoDB,
              Express, React, and Node.js. Designed for instant messaging, live
              typing indicators, seamless individual and group rooms, and
              token-based JWT security.
            </Typography>

            <ul className={classes.pillList} aria-label="Core highlights">
              {HERO_PILLS.map((pill, idx) => {
                const pillStyle: CSSProperties = {
                  animationDelay: `${220 + idx * 70}ms`,
                };

                return (
                  <li key={pill} className={classes.pill} style={pillStyle}>
                    <span className={classes.pillDot} aria-hidden="true" />
                    <span>{pill}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={`${classes.heroVisual} ${classes.revealVisual}`}>
            <div className={classes.visualGlow} aria-hidden="true" />
            <div className={classes.showcaseCard}>
              <img
                src={imgSrc}
                alt="Group chat illustration"
                className={classes.coverImg}
              />

              <div className={classes.livePreviewStrip}>
                <div className={classes.previewAvatarGroup}>
                  <span className={classes.avatarOne}>VK</span>
                  <span className={classes.avatarTwo}>GR</span>
                </div>
                <div className={classes.previewText}>
                  <span className={classes.previewTitle}>
                    Team & Direct Threads Active
                  </span>
                  <span className={classes.previewSub}>
                    <span>Typing live</span>
                    <span className={classes.typingDots} aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </span>
                  </span>
                </div>
                <span className={classes.statusBadge}>JWT</span>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section
          className={classes.sectionBlock}
          aria-labelledby="features-heading"
        >
          <div className={classes.sectionHeader}>
            <span className={classes.eyebrow}>WHAT MAKES IT WORK</span>
            <Typography
              id="features-heading"
              variant={TYPOGRAPHY_VARIANT.H3}
              className={classes.sectionTitle}
            >
              Built for Fast, Focused Conversations
            </Typography>
            <Typography
              variant={TYPOGRAPHY_VARIANT.PARAGRAPH}
              className={classes.sectionSubtitle}
            >
              Every part of the experience is structured around speed, clarity,
              and reliable session handling.
            </Typography>
          </div>

          <div className={classes.featureGrid}>
            {FEATURES.map((item) => (
              <article
                key={item.title}
                className={`${classes.featureCard} ${
                  item.accent === "pink"
                    ? classes.featureCardPink
                    : classes.featureCardSky
                }`}
              >
                <span className={classes.cardTag}>{item.tag}</span>
                <h3 className={classes.cardTitle}>{item.title}</h3>
                <p className={classes.cardDesc}>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Workflow / Flow Section */}
        <section
          className={classes.sectionBlock}
          aria-labelledby="flow-heading"
        >
          <div className={classes.flowBanner}>
            <div className={classes.flowHeader}>
              <span className={classes.eyebrow}>EXPERIENCE FLOW</span>
              <Typography
                id="flow-heading"
                variant={TYPOGRAPHY_VARIANT.H4}
                className={classes.sectionTitle}
              >
                From Sign-In to Live Chat in Seconds
              </Typography>
            </div>

            <div className={classes.stepsGrid}>
              {WORKFLOW_STEPS.map((item) => (
                <div key={item.step} className={classes.stepCard}>
                  <span className={classes.stepNumber}>{item.step}</span>
                  <h4 className={classes.stepTitle}>{item.title}</h4>
                  <p className={classes.stepDetail}>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Creator Credit & Social Menu */}
      {/* Creator Credit & Social Menu */}
      <footer className={classes.footer}>
        <div className={classes.footerDivider} aria-hidden="true" />

        <div className={classes.creatorCard}>
          <div className={classes.creatorAvatar} aria-hidden="true">
            VK
          </div>

          <div className={classes.creatorMeta}>
            <Typography
              variant={TYPOGRAPHY_VARIANT.SMALL}
              className={classes.creditText}
            >
              Crafted &amp; maintained by
            </Typography>

            <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="top">
              <MenuHandler>
                <button
                  type="button"
                  className={classes.nameLink}
                  aria-expanded={isMenuOpen}
                >
                  <span>@VinitKumbhare</span>
                  <span
                    className={`${classes.chevron} ${
                      isMenuOpen ? classes.chevronOpen : ""
                    }`}
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </button>
              </MenuHandler>

              <MenuList className={classes.menuList}>
                <div className={classes.menuHeader}>Connect with creator</div>
                {profileItems.map(({ link, icon: Icon, label }) => (
                  <a
                    key={link}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className={classes.menuLink}
                  >
                    <MenuItem onClick={closeMenu} className={classes.menuItem}>
                      <span className={classes.menuLeft}>
                        {Icon && (
                          <span className={classes.iconBadge}>
                            <Icon className={classes.icon} />
                          </span>
                        )}
                        <Typography
                          variant={TYPOGRAPHY_VARIANT.SMALL}
                          className={classes.label}
                        >
                          {label}
                        </Typography>
                      </span>
                      <span className={classes.externalArrow} aria-hidden="true">
                        ↗
                      </span>
                    </MenuItem>
                  </a>
                ))}
              </MenuList>
            </Menu>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;