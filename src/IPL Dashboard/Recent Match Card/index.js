import React from "react";
import "../index.css";

function RecentMatchCard(props) {
  const { recentMatchDetails } = props;
  const { competingTeam, competingTeamLogo, result, matchStatus } =
    recentMatchDetails;

  const matchResultStatus =
    matchStatus === "Won" ? "won-status" : "loss-status";

  return (
    <div className="latest-matches-mini-container recent-match-container">
      <img
        src={competingTeamLogo}
        alt={competingTeam}
        className="competing-team-image recent-match-image"
      />
      <h1 className="competing-team-name recent-match-name">{competingTeam}</h1>
      <p className="competing-team-venue recent-match-name">{result}</p>
      <h1 className={`recent-match-status ${matchResultStatus}`}>
        {matchStatus}
      </h1>
    </div>
  );
}

export default RecentMatchCard;
