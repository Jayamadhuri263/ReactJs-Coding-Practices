import React from "react";
import "../index.css";

function LatestMatchCard(props) {
  const { latestMatchDetails = {} } = props;
  const {
    umpires,
    competingTeam,
    competingTeamLogo,
    date,
    firstInnings,
    manOfTheMatch,
    result,
    secondInnings,
    venue,
  } = latestMatchDetails;

  return (
    <div className="latest-matches-mini-container">
      <div className="latest-matches-top-container">
        <div className="competing-team-details">
          <h1 className="competing-team-name">{competingTeam}</h1>
          <p className="competing-team-date">{date}</p>
          <p className="competing-team-venue">{venue}</p>
          <p className="competing-team-venue">{result}</p>
        </div>
        <img
          src={competingTeamLogo}
          alt={competingTeam}
          className="competing-team-image"
        />
      </div>
      <hr className="competing-team-line" />
      <div className="competing-team-details">
        <div className="latest-matches-top-container more-innings-details">
          <p className="first-innings-heading">First Innings</p>
          <p className="first-innings">{firstInnings}</p>
        </div>
        <div className="latest-matches-top-container more-innings-details">
          <p className="first-innings-heading">Second Innings</p>
          <p className="first-innings">{secondInnings}</p>
        </div>
        <div className="latest-matches-top-container more-innings-details">
          <p className="first-innings-heading">Man of the match</p>
          <p className="first-innings">{manOfTheMatch}</p>
        </div>
        <div className="latest-matches-top-container more-innings-details">
          <p className="first-innings-heading">Umpires</p>
          <p className="first-innings">{umpires}</p>
        </div>
      </div>
    </div>
  );
}

export default LatestMatchCard;
