import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

function Content() {
  return (
    <div className="content-container">
      <h1 className="content-heading">Welcome to React Coding Practices</h1>
      <p className="content-para">
        Click the project name to go to that project link
      </p>
      {/* <Link to="/" className="home-content">
        <p>Home</p>
      </Link> */}
      <div className="ul-div-container">
        <ul className="content-list-container">
          <Link to="/superOver" className="project-name">
            <p>Super Over League</p>
          </Link>
          <Link to="/socialButtons" className="project-name">
            <p>Social Buttons</p>
          </Link>
          <Link to="/boxes" className="project-name">
            <p>Boxes</p>
          </Link>
          <Link to="/technologyCards" className="project-name">
            <p>Technology Cards</p>
          </Link>
          <Link to="/fruitsCounter" className="project-name">
            <p>Fruits Counter</p>
          </Link>
          <Link to="/lightDarkMode" className="project-name">
            <p>Light Dark Mode</p>
          </Link>
          <Link to="/evenOddApp" className="project-name">
            <p>Even Odd App</p>
          </Link>
          <Link to="/simpleTodos" className="project-name">
            <p>Simple Todos</p>
          </Link>
          <Link to="/googleSearchSuggestion" className="project-name">
            <p>Google Search Suggestion</p>
          </Link>
          <Link to="/browserHistory" className="project-name">
            <p>Browser History</p>
          </Link>
          <Link to="/tabExample" className="project-name">
            <p>Tab Example</p>
          </Link>
          <Link to="/capitalsApp" className="project-name">
            <p>Capitals App</p>
          </Link>
          <Link to="/coinTossGame" className="project-name">
            <p>Coin Toss Game</p>
          </Link>
          <Link to="/contactsApp" className="project-name">
            <p>Contacts App</p>
          </Link>
          <Link to="/appointmentsApp" className="project-name">
            <p>Appointments App</p>
          </Link>
          <Link to="/showHideClock" className="project-name">
            <p>Show Hide Clock Example</p>
          </Link>
          <Link to="/stopwatch" className="project-name">
            <p>Stopwatch</p>
          </Link>
          <Link to="/passwordManager" className="project-name">
            <p>Password Manager</p>
          </Link>
          <Link to="/emojiGame" className="project-name">
            <p>{">  "}Emoji Game</p>
          </Link>
          <Link to="/blogList" className="project-name">
            <p>Blog List</p>
          </Link>
          <Link to="/iplDashboard" className="project-name">
            <p>IPL Dashboard</p>
          </Link>
          <Link to="/events" className="project-name">
            <p>Events</p>
          </Link>
          <Link to="/videoPlayer" className="project-name">
            <p>Video Player</p>
          </Link>
          <Link to="/coWINDashboard" className="project-name">
            <p>CoWIN Dashboard</p>
          </Link>
          <Link to="/ccbp-timeline" className="project-name">
            <p>CCBP Timeline</p>
          </Link>
          <Link to="/planets-app" className="project-name">
            <p>Planets App</p>
          </Link>
          <Link to="/hamburger-menu" className="project-name">
            <p>Hamburger Menu</p>
          </Link>
          <Link to="/jobbyApp-login" className="project-name">
            <p>Jobby App</p>
          </Link>
        </ul>
        <ul className="content-list-container">
          <Link to="/congratsCard" className="project-name">
            <p>Congrats Card</p>
          </Link>
          <Link to="/notifications" className="project-name">
            <p>Notifications</p>
          </Link>
          <Link to="/reusableBanners" className="project-name">
            <p>Reusable Banners</p>
          </Link>
          <Link to="/speedometer" className="project-name">
            <p>Speedometer</p>
          </Link>
          <Link to="/welcomeApp" className="project-name">
            <p>Welcome App</p>
          </Link>
          <Link to="/hideShowApp" className="project-name">
            <p>Show or Hide App</p>
          </Link>
          <Link to="/destinationSearch" className="project-name">
            <p>Destination Search</p>
          </Link>
          <Link to="/cashWithdrawal" className="project-name">
            <p>Cash Withdrawal</p>
          </Link>
          <Link to="/lettersCalculator" className="project-name">
            <p>Letters Calculator</p>
          </Link>
          <Link to="/feedbackApp" className="project-name">
            <p>FeedBack App</p>
          </Link>
          <Link to="/galleryApp" className="project-name">
            <p>Gallery App</p>
          </Link>
          <Link to="/appStore" className="project-name">
            <p>App Store </p>
          </Link>
          <Link to="/reviewsApp" className="project-name">
            <p>Reviews App </p>
          </Link>
          <Link to="/commentsApp" className="project-name">
            <p>Comments App </p>
          </Link>
          <Link to="/moneyManager" className="project-name">
            <p>Money Manager </p>
          </Link>
          <Link to="/digitalTimerApp" className="project-name">
            <p>Digital Timer App </p>
          </Link>
          <Link to="/faqsApp" className="project-name">
            <p>Faqs App </p>
          </Link>
          <Link to="/matchGame" className="project-name">
            <p>Match Game </p>
          </Link>
          <Link to="/routingExample" className="project-name">
            <p>Routing Example </p>
          </Link>
          <Link to="/cryptoCurrencyTracker" className="project-name">
            <p>CryptoCurrency Tracker </p>
          </Link>
          <Link to="/authenticationLogin" className="project-name">
            <p>Authentication Intro Example</p>
          </Link>
          <Link to="/popularGithubRepos" className="project-name">
            <p>Popular Github Repos</p>
          </Link>
          <Link to="/recharts" className="project-name">
            <p>Recharts</p>
          </Link>
          <Link to="/react-chrono" className="project-name">
            <p>React Chrono</p>
          </Link>
          <Link to="/react-slick" className="project-name">
            <p>React Slick</p>
          </Link>
          <Link to="/react-popup" className="project-name">
            <p>React Popup</p>
          </Link>
          <Link to="/prime-video" className="project-name">
            <p>Prime Video</p>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Content;
