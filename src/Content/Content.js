import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const PROJECTS = [
  { to: "/appointmentsApp", label: "Appointments App" },
  { to: "/appStore", label: "App Store " },
  { to: "/authenticationLogin", label: "Authentication Intro Example" },
  { to: "/blogList", label: "Blog List" },
  { to: "/boxes", label: "Boxes" },
  { to: "/browserHistory", label: "Browser History" },
  { to: "/capitalsApp", label: "Capitals App" },
  { to: "/cashWithdrawal", label: "Cash Withdrawal" },
  { to: "/ccbp-timeline", label: "CCBP Timeline" },
  { to: "/coinTossGame", label: "Coin Toss Game" },
  { to: "/commentsApp", label: "Comments App " },
  { to: "/coWINDashboard", label: "CoWIN Dashboard" },
  { to: "/congratsCard", label: "Congrats Card" },
  { to: "/contactsApp", label: "Contacts App" },
  { to: "/cryptoCurrencyTracker", label: "CryptoCurrency Tracker " },
  { to: "/destinationSearch", label: "Destination Search" },
  { to: "/digitalTimerApp", label: "Digital Timer App " },
  { to: "/editableText", label: "Editable Text" },
  { to: "/emojiGame", label: "Emoji Game" },
  { to: "/evenOddApp", label: "Even Odd App" },
  { to: "/events", label: "Events" },
  { to: "/faqsApp", label: "Faqs App " },
  { to: "/feedbackApp", label: "FeedBack App" },
  // { to: "/mobility-login", label: "Finance Mobility" },
  { to: "/fruitsCounter", label: "Fruits Counter" },
  { to: "/galleryApp", label: "Gallery App" },
  { to: "/googleSearchSuggestion", label: "Google Search Suggestion" },
  { to: "/Generator", label: "Gradient Generator" },
  { to: "/habitsApp", label: "Habits Tracker with Redux" },
  { to: "/hamburger-menu", label: "Hamburger Menu" },
  { to: "/iplDashboard", label: "IPL Dashboard" },
  { to: "/jobbyApp-login", label: "Jobby App" },
  { to: "/LayoutBuilder", label: "Layout Builder" },
  { to: "/lettersCalculator", label: "Letters Calculator" },
  { to: "/lightDarkMode", label: "Light Dark Mode" },
  { to: "/matchGame", label: "Match Game " },
  { to: "/moneyManager", label: "Money Manager " },
  { to: "/multilingualGreeting", label: "Multilingual Greetings" },
  { to: "/musicPlaylist", label: "Music Playlist" },
  { to: "/myTasks", label: "My Tasks" },
  { to: "/notifications", label: "Notifications" },
  { to: "/OAuth-example", label: "OAuth Example" },
  { to: "/passwordManager", label: "Password Manager" },
  { to: "/planets-app", label: "Planets App" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/popularGithubRepos", label: "Popular Github Repos" },
  { to: "/prime-video", label: "Prime Video" },
  { to: "/rock-paper-scissors", label: "Rock Paper Scissors" },
  { to: "/react-chrono", label: "React Chrono" },
  { to: "/react-popup", label: "React Popup" },
  { to: "/react-slick", label: "React Slick" },
  { to: "/recharts", label: "Recharts" },
  { to: "/redux-practice", label: "Redux Practice" },
  { to: "/reviewsApp", label: "Reviews App " },
  { to: "/reusableBanners", label: "Reusable Banners" },
  { to: "/routingExample", label: "Routing Example " },
  { to: "/showHideApp", label: "Show Hide App" },
  { to: "/showHideClock", label: "Show Hide Clock Example" },
  { to: "/hideShowApp", label: "Show or Hide App" },
  { to: "/simpleTodos", label: "Simple Todos" },
  { to: "/socialButtons", label: "Social Buttons" },
  { to: "/speedometer", label: "Speedometer" },
  { to: "/stopwatch", label: "Stopwatch" },
  { to: "/superOver", label: "Super Over League" },
  { to: "/tabExample", label: "Tab Example" },
  { to: "/tech-era", label: "Tech Era" },
  { to: "/technologyCards", label: "Technology Cards" },
  { to: "/videoPlayer", label: "Video Player" },
  { to: "/visitCountries", label: "Visit Countries" },
  { to: "/weatherApp", label: "Weather App" },
  { to: "/welcomeApp", label: "Welcome App" },
  { to: "/wordCounter", label: "Word Counter" },
];

function Content() {
  const [column1, column2, column3] = useMemo(() => {
    const sorted = [...PROJECTS].sort((a, b) =>
      a.label.trim().localeCompare(b.label.trim(), undefined, {
        sensitivity: "base",
      })
    );
    const n = sorted.length;
    const base = Math.floor(n / 3);
    const remainder = n % 3;
    const c1 = base + (remainder > 0 ? 1 : 0);
    const c2 = base + (remainder > 1 ? 1 : 0);
    const i1 = c1;
    const i2 = c1 + c2;
    return [
      sorted.slice(0, i1),
      sorted.slice(i1, i2),
      sorted.slice(i2),
    ];
  }, []);

  const renderColumn = (items, colIndex) => (
    <ul className="content-column-list" key={colIndex} aria-label={`Column ${colIndex + 1}`}>
      {items.map(({ to, label }) => (
        <li key={to} className="content-column-item">
          <Link to={to} className="project-link">
            {label.trim()}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="content-container">
      <header className="content-header">
        <h1 className="content-heading">Welcome to React Coding Practices</h1>
        <p className="content-para">
          Click a project name to open its route — {PROJECTS.length} demos,
          A–Z.
        </p>
      </header>

      <div className="content-grid">
        <div className="content-column content-column--1">
          {renderColumn(column1, 0)}
        </div>
        <div className="content-column content-column--2">
          {renderColumn(column2, 1)}
        </div>
        <div className="content-column content-column--3">
          {renderColumn(column3, 2)}
        </div>
      </div>
    </div>
  );
}

export default Content;
