import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Portfolio.css";

const projectDetails = [
  {
    time: "May-Jun 2023",
    name: "Finance Mobility",
    sideImage: "/assets/images/web dev/Untitled.png",
    height: "",
    description:
      "The app is designed to help users manage their finances effectively. With this app, User can initiate transactions by using maker credentials and authorize/reject them using checker credentials.",
    link: "/",
    technologies: [
      "Angular",
      "Node JS",
      "Express JS",
      "MySQL",
      "Multer",
      "Fast-csv",
      "QR Code",
      "Sequelize",
      "JWT Token",
      "bcryptjs",
    ],
  },
  {
    time: "Apr 2023",
    name: "Weather Application",
    sideImage: "/assets/images/web dev/weather-png-9839.png",
    height: "",
    description:
      "A simple weather application that displays the current weather, overview of atmosphere and air concentrations through visualized charts in overall places of India.",
    link: "/weatherApp",
    technologies: ["Angular", "REST API", "Chart"],
  },
  {
    time: "Oct-Nov 2021",
    name: "ECommerce Application",
    sideImage: "/assets/images/web dev/ecommerce-shopping.webp",
    height: "270px",
    description:
      "Built an ECommerce web application, to purchase the things we may need in our daily life like cloths, mobiles, accessories, electronics etc. Every user has their own account to login and purchase the personalized things.",
    link: "/appStore",
    technologies: [
      "React JS",
      "REST API",
      "JWT Token",
      "React Context",
      "Child Routing",
      "Component",
    ],
  },
  {
    time: "Aug-Sept 2021",
    name: "IPL Dashboard",
    sideImage: "/assets/images/web dev/ipl-dashboard-home-lg-output.png",
    height: "350px",
    marginLeftDiv: "-63em",
    marginLeft: "6em",
    description:
      "Here we can see the most famous cricket league, called Indian Premier League (IPL), which conducts in all over major cities of India. Viewers can see the list of teams, and their previous performances in one go.",
    link: "/iplDashboard",
    technologies: ["React JS", "REST API", "Child Routing", "Component"],
  },
  {
    time: "Aug 2021",
    name: "Emoji Game",
    sideImage: "/assets/images/web dev/emoji-game-lg-output-v2.png",
    height: "350px",
    marginLeft: "-39em",
    description:
      "Developed a simple game, which contains different Emojis, and player should click on the emoji only once in a session to Win the game. Highest score will be recorded to defeat the score. Designed for children to increase memorization.",
    link: "/emojiGame",
    technologies: ["React JS", "Component"],
  },
];

const Portfolio = () => {
  const [isLightTheme, setIsLightTheme] = useState(true);
  const [tab, setTab] = useState(0);
  const homeRef = useRef(null);
  const workExperienceRef = useRef(null);
  const projectsRef = useRef(null);
  const contactMeRef = useRef(null);
  const timelineScriptRef = useRef(null);

  const scrollTo = (target) => {
    const el = target?.current !== undefined ? target.current : target;
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleDarkTheme = () => {
    document.body.classList.toggle("dark-theme");
    setIsLightTheme((prev) => !prev);
  };

  useEffect(() => {
    AOS.init({
      once: true,
      offset: 80,
    });
  }, []);

  useLayoutEffect(() => {
    const prev = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    return () => {
      window.history.scrollRestoration = prev;
    };
  }, []);

  useEffect(() => {
    const scrollTopNow = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    const t0 = window.setTimeout(scrollTopNow, 0);
    const t1 = window.setTimeout(scrollTopNow, 100);
    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t1);
    };
  }, []);

  useEffect(() => {
    const rootEl = document.getElementById("root");
    const html = document.documentElement;
    const body = document.body;
    html.classList.add("portfolio-page");
    body.classList.add("portfolio-page");
    if (rootEl) rootEl.classList.add("portfolio-page");
    return () => {
      html.classList.remove("portfolio-page");
      body.classList.remove("portfolio-page");
      if (rootEl) rootEl.classList.remove("portfolio-page");
    };
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/assets/javascript/timeline.js";
    script.async = true;
    document.body.appendChild(script);
    timelineScriptRef.current = script;
    return () => {
      if (timelineScriptRef.current && timelineScriptRef.current.parentNode) {
        timelineScriptRef.current.parentNode.removeChild(
          timelineScriptRef.current
        );
      }
      document.body.classList.remove("dark-theme");
    };
  }, []);

  const mainThemeClass = isLightTheme
    ? "home-work-experience-main-container-light-theme"
    : "home-work-experience-main-container-dark-theme";

  const profileBioClass = isLightTheme
    ? "home-profile-bio-container-light-theme"
    : "home-profile-bio-container-dark-theme";

  const welcomeClass = isLightTheme
    ? "home-profile-welcome-message-light-theme"
    : "home-profile-welcome-message-dark-theme";

  const bioDescClass = isLightTheme
    ? "home-profile-bio-description-light-theme"
    : "home-profile-bio-description-dark-theme";

  const navColor = isLightTheme ? "light-color" : "dark-color";

  const infoTheme = isLightTheme ? "info-item-light-theme" : "info-item-dark-theme";

  return (
    <div
      className={`portfolio-root portpolio-main-container ${mainThemeClass}`}
      data-theme={isLightTheme ? "light" : "dark"}
    >
        <div
          className={`header-home-main-container ${mainThemeClass}`}
          id="portfolio-top"
        >
          <div className="header-home-main-mini-container">
            <div className={`button button-6 ${tab === 1 ? "active-tab" : ""}`}>
              <div className="spin" />
              <a
                href="#work"
                className={navColor}
                onClick={(e) => {
                  e.preventDefault();
                  setTab(1);
                  scrollTo(workExperienceRef.current);
                }}
              >
                Work
              </a>
            </div>
            <div className={`button button-6 ${tab === 2 ? "active-tab" : ""}`}>
              <div className="spin" />
              <Link to="/" className={navColor} onClick={() => setTab(2)}>
                Blog
              </Link>
            </div>
            <div className={`button button-6 ${tab === 3 ? "active-tab" : ""}`}>
              <div className="spin" />
              <a
                href="#projects"
                className={navColor}
                onClick={(e) => {
                  e.preventDefault();
                  setTab(3);
                  scrollTo(projectsRef.current);
                }}
              >
                Projects
              </a>
            </div>
            <div className={`button button-6 ${tab === 4 ? "active-tab" : ""}`}>
              <div className="spin" />
              <a
                href="#contact"
                className={navColor}
                onClick={(e) => {
                  e.preventDefault();
                  setTab(4);
                  scrollTo(contactMeRef.current);
                }}
              >
                Contact
              </a>
            </div>
          </div>

          <div className="toggleWrapper" style={{ zIndex: 5 }}>
            <input
              type="checkbox"
              className="dn"
              id="portfolio-theme-dn"
              checked={!isLightTheme}
              onChange={toggleDarkTheme}
            />
            <label htmlFor="portfolio-theme-dn" className="toggle">
              <span className="toggle__handler">
                <span className="crater crater--1" />
                <span className="crater crater--2" />
                <span className="crater crater--3" />
              </span>
              <span className="star star--1" />
              <span className="star star--2" />
              <span className="star star--3" />
              <span className="star star--4" />
              <span className="star star--5" />
              <span className="star star--6" />
            </label>
          </div>
        </div>
        <div className="portfolio-divider" aria-hidden />

        <div className="home-main-sub-container" ref={homeRef}>
          <div className={`home-bg-bio ${mainThemeClass}`}>
            <div className={`home-profile-bio-container ${profileBioClass}`}>
              <div className="home-profile-bio-description-container">
                <h1
                  className={`home-profile-welcome-message ${welcomeClass}`}
                >
                  Hey! I'm{" "}
                </h1>
                <svg viewBox="0 0 1550 230">
                  <symbol id="portfolio-s-text">
                    <text textAnchor="middle" x="50%" y="80%">
                      Jaya madhuri
                    </text>
                  </symbol>
                  <g className="g-ants">
                    <use href="#portfolio-s-text" className="text-copy" />
                    <use href="#portfolio-s-text" className="text-copy" />
                    <use href="#portfolio-s-text" className="text-copy" />
                    <use href="#portfolio-s-text" className="text-copy" />
                    <use href="#portfolio-s-text" className="text-copy" />
                  </g>
                </svg>
                <h3
                  className={`home-profile-bio-description ${bioDescClass}`}
                >
                  <br />
                  ✨Passionate Web Developer <br />
                  <br />
                  ✨🌟Exploring the colorful world of Angular/React JS with
                  Node.js as my trusty companion, creating dynamic websites that
                  leave a lasting impression. Embracing the power of MYSQL to
                  bring dreams to life! #WebDevEnthusiast #AngularLover
                  #NodeNinja #Don'tWorkForTheMoney-LetTheMoneyWorkForYou
                </h3>
              </div>
              <div className="home-profile-bio-image-container">
                <div className="menu">
                  <div
                    style={{
                      marginBottom: "2em",
                      textAlign: "center",
                      marginTop: "-2em",
                    }}
                  >
                    <h1 className="glow">
                      <span className="one">C</span>
                      <span className="two">l</span>
                      <span className="three">i</span>
                      <span className="four">c</span>
                      <span className="five">k</span>
                      <span className="six">&nbsp;</span>
                      <span className="seven">M</span>
                      <span className="eight">e</span>
                      <span className="nine">!</span>
                    </h1>
                  </div>
                  <input type="checkbox" id="toggle" />
                  <label id="show-menu" htmlFor="toggle">
                    <div className="btn profile-button-size">
                      <img
                        src="/assets/images/Jaya_profile.jpg"
                        className="bounce toggleBtn menuBtn home-profile-image"
                        alt="profile"
                      />
                      <img
                        src="/assets/images/Jaya_profile.jpg"
                        className="bounce toggleBtn closeBtn home-profile-image"
                        alt="profile"
                      />
                    </div>
                    <div className={`btn info-item ${infoTheme}`}>
                      <img
                        src="/assets/images/angular.png"
                        alt="angular"
                        className="info-item-image"
                      />
                      <p className="info-item-heading">Angular</p>
                    </div>
                    <div className={`btn info-item ${infoTheme}`}>
                      <img
                        src="/assets/images/react.png"
                        alt="react"
                        className="info-item-image"
                      />
                      <p className="info-item-heading">React JS</p>
                    </div>
                    <div className={`btn info-item ${infoTheme}`}>
                      <img
                        src="/assets/images/node-logo-png-8.png"
                        alt="nodejs"
                        className="info-item-image"
                      />
                      <p className="info-item-heading">Node JS</p>
                    </div>
                    <div className={`btn info-item ${infoTheme}`}>
                      <img
                        src="/assets/images/mysql.png"
                        alt="mysql"
                        className="info-item-image"
                      />
                      <p className="info-item-heading">MySQL</p>
                    </div>
                    <div className={`btn info-item ${infoTheme}`}>
                      <img
                        src="/assets/images/Python-logo-notext.svg.png"
                        alt="python"
                        className="info-item-image"
                      />
                      <p className="info-item-heading">Python</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div
              className={`loader-container ${
                isLightTheme
                  ? "home-main-break-line-light-mode"
                  : "home-main-break-line-dark-mode"
              }`}
            >
              <div className="loader loader-1" />
            </div>
          </div>

          <section
            className={`home-work-experience-main-container ${mainThemeClass}`}
            ref={workExperienceRef}
            id="work"
          >
            <div
              className={`home-profile-bio-container home-work-experience-container ${profileBioClass}`}
              data-aos-anchor-placement="top-center"
              data-aos="zoom-in-up"
              data-aos-duration="3000"
            >
              <h3 className={`home-work-experience-main-heading ${welcomeClass}`}>
                Work Experience
              </h3>
              <div className="home-work-experience-mini-container">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h2 className={`home-work-experience-heading ${welcomeClass}`}>
                    Intellect Design Arena Ltd
                  </h2>
                  <p
                    className={welcomeClass}
                    style={{ fontWeight: 600 }}
                  >
                    Product Engineer
                  </p>
                </div>
                <h3 className={`home-work-experience-date ${welcomeClass}`}>
                  Dec 2021 - Present
                </h3>
              </div>
              <p
                className={`home-work-experience-description-container ${bioDescClass}`}
              >
                I worked as a Mobility Developer, good in developing Android
                applications. During my time there, I gained good knowledge in
                working with the Cordova framework and the CBX framework which
                was internally built within the company. Within just 6 months, I
                achieved a significant milestone and received a{" "}
                <span style={{ fontWeight: 600 }}>SPOT award</span> for
                successfully implementing a biometric feature in the Cordova
                framework.
                <br />
                <br />
                <span style={{ fontWeight: 700 }}>Role and Responsibilities:</span>
                <br />
                <span style={{ marginTop: "1em", marginLeft: "2em" }}>
                  <ul>
                    <li>
                      As a Mobility Developer, I was responsible for developing
                      and maintaining the application using the Cordova
                      framework and the inbuilt CBX framework.
                    </li>
                    <li>
                      I collaborated with cross-functional teams, including
                      designers and backend developers, to ensure smooth
                      integration and functionality of the mobile applications.
                    </li>
                    <li>
                      I performed thorough testing and debugging to identify and
                      resolve any mobile application issues or bugs.
                    </li>
                    <li>
                      I continuously stayed updated with the latest advancements
                      and best practices in mobile development to incorporate new
                      features and optimize existing ones.
                    </li>
                  </ul>
                </span>
              </p>

              <div
                className={`loader-container ${
                  isLightTheme
                    ? "home-main-break-line-light-mode"
                    : "home-main-break-line-dark-mode"
                }`}
                style={{
                  marginTop: "40em",
                  position: "absolute",
                  width: "100%",
                  maxWidth: "100%",
                  left: 0,
                  right: 0,
                }}
              >
                <div className="loader loader-1" />
              </div>
            </div>

            <div
              className={`home-profile-bio-container home-work-experience-image-container ${profileBioClass}`}
              data-aos-anchor-placement="top-center"
              data-aos="zoom-in-down"
              data-aos-duration="2000"
              style={{
                width: "55%",
                maxWidth: "100%",
                padding: 0,
                marginTop: "14em",
                marginLeft: "0em",
                marginRight: "0",
              }}
            >
              <img
                src="/assets/images/web dev/mobile-dev.gif"
                alt="mobile dev"
                style={{
                  height: "54vh",
                  width: "100%",
                  borderRadius: "20px",
                }}
              />
            </div>
          </section>

          <section
            className={`home-work-experience-main-container projects-timeline-main-container ${mainThemeClass}`}
            ref={projectsRef}
            id="projects"
          >
            <h3
              className={`home-work-experience-main-heading projects-timeline-main-heading ${welcomeClass}`}
            >
              Projects
            </h3>
            <section className="timeline" style={{ marginTop: "6em" }}>
              <ul>
                {projectDetails.map((project) => (
                  <li
                    key={project.name}
                    className={!isLightTheme ? "is-true" : ""}
                  >
                    <img
                      src={project.sideImage}
                      style={
                        project.height
                          ? {
                              height: project.height,
                              marginTop: "2em",
                              marginLeft: project.marginLeft,
                              width: "500px",
                            }
                          : { height: "450px", width: "500px" }
                      }
                      alt="project"
                      data-aos-anchor-placement="top-center"
                      data-aos="fade-left"
                      data-aos-duration="2000"
                    />
                    <div
                      style={
                        project.marginLeft
                          ? { left: project.marginLeftDiv }
                          : {}
                      }
                      className={!isLightTheme ? "is-true" : ""}
                    >
                      <time className={!isLightTheme ? "is-true" : ""}>
                        {project.time}
                      </time>
                      <section
                        className="project portfolio-project-body"
                        data-aos="zoom-in"
                        data-aos-duration="3000"
                      >
                        <ul
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <h1>{project.name}</h1>
                          <p>- using {project.technologies[0]}</p>
                        </ul>
                        <p className="portfolio-project-description">
                          {project.description}
                        </p>
                        <Link
                          to={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="portfolio-project-link"
                        >
                          Check here
                        </Link>
                        <ul className="keywords">
                          {project.technologies.map((keyword, ki) => (
                            <p
                              key={`${project.name}-${ki}-${keyword}`}
                              className={!isLightTheme ? "is-true" : ""}
                            >
                              {" "}
                              {keyword}
                            </p>
                          ))}
                        </ul>
                      </section>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </section>

          <div
            className={`loader-container ${
              isLightTheme
                ? "home-main-break-line-light-mode"
                : "home-main-break-line-dark-mode"
            }`}
            style={{
              marginBottom: "10em",
              width: "min(1100px, 92%)",
              maxWidth: "100%",
              marginLeft: "auto",
              marginRight: "auto",
              paddingLeft: "clamp(1rem, 5vw, 3rem)",
              paddingRight: "clamp(1rem, 5vw, 3rem)",
              boxSizing: "border-box",
            }}
          >
            <div className="loader loader-1" />
          </div>

          <footer
            style={{ marginBottom: "-1em" }}
            ref={contactMeRef}
            id="contact"
          >
            <svg viewBox="0 0 120 28" className="footer-svg">
              <defs>
                <mask id="portfolio-xxx">
                  <circle cx="7" cy="12" r="40" fill="#fff" />
                </mask>

                <filter id="portfolio-goo">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="2"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="
                            1 0 0 0 0  
                            0 1 0 0 0  
                            0 0 1 0 0  
                            0 0 0 13 -9"
                    result="goo"
                  />
                  <feBlend in="SourceGraphic" in2="goo" />
                </filter>
                <path
                  id="portfolio-wave"
                  d="M 0,10 C 30,10 30,15 60,15 90,15 90,10 120,10 150,10 150,15 180,15 210,15 210,10 240,10 v 28 h -240 z"
                />
              </defs>

              <use
                id="wave3"
                className="wave"
                href="#portfolio-wave"
                x="0"
                y="-2"
              />
              <use
                id="wave2"
                className="wave"
                href="#portfolio-wave"
                x="0"
                y="0"
              />
              <use
                id="wave4"
                className="wave"
                href="#portfolio-wave"
                x="0"
                y="2"
              />

              <g
                className="topball"
                onClick={() => scrollTo(homeRef)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    scrollTo(homeRef);
                }}
                role="button"
                tabIndex={0}
              >
                <circle
                  className="ball"
                  cx="190"
                  cy="8"
                  r="4"
                  stroke="none"
                  strokeWidth="0"
                  fill="rgb(75, 113, 238)"
                />
                <g className="arrow">
                  <polyline className="" points="188,8 190,6 192,8" fill="none" />
                  <polyline className="" points="190,6 190,10.5" fill="none" />
                </g>
              </g>
              <g className="gooeff">
                <circle className="drop drop1" cx="20" cy="2" r="1.8" />
                <circle className="drop drop2" cx="25" cy="2.5" r="1.5" />
                <circle className="drop drop3" cx="16" cy="2.8" r="1.2" />
                <use
                  id="wave1"
                  className="wave"
                  href="#portfolio-wave"
                  x="0"
                  y="1"
                />
              </g>
            </svg>

            <div className="footer-description-container portfolio-footer-simple">
              <div className="portfolio-footer-simple__main">
                <p className="portfolio-footer-simple__name">Jaya Madhuri Ganjikunta</p>
                <div className="portfolio-footer-simple__links">
                  <a href="tel:+916300497655">+91 6300497655</a>
                  <span className="portfolio-footer-simple__dot" aria-hidden="true">
                    ·
                  </span>
                  <a href="mailto:jayamadhuri263@gmail.com">
                    jayamadhuri263@gmail.com
                  </a>
                </div>
                <div className="portfolio-footer-simple__social">
                  <a
                    href="https://github.com/Jayamadhuri263"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                  >
                    <img src="/assets/images/github.png" alt="" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jaya-madhuri-g-877b44151"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                  >
                    <img src="/assets/images/linkedin.webp" alt="" />
                  </a>
                </div>
              </div>
              <p className="portfolio-footer-simple__made">
                Made with{" "}
                <span
                  className="portfolio-footer-simple__love"
                  role="img"
                  aria-label="love"
                  style={{
                    animation:
                      "portfolio-footer-heartbeat 1.1s ease-in-out infinite",
                  }}
                >
                  &#x2665;
                </span>{" "}
                by Jaya madhuri
              </p>
            </div>
          </footer>
        </div>
      </div>
  );
};

export default Portfolio;
