import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

function TeamCard(props) {
  const { teamDetails } = props;
  const { id, name, teamImageUrl } = teamDetails;
  // console.log(id);
  return (
    <Link
      to={`/iplDashboard/team-matches/${id}`}
      className="team-card-container"
    >
      <img src={teamImageUrl} alt={id} className="ipl-team-logo-image" />
      <h1 className="ipl-team-logo-name">{name}</h1>
    </Link>
  );
}

export default TeamCard;
