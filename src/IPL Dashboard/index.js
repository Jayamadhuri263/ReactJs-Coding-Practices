import React, { Component } from "react";
import { InfinitySpin } from "react-loader-spinner";
import "./index.css";
import TeamCard from "./Team Card";

// (possible exports: Audio, BallTriangle, Bars, Blocks, Circles, CirclesWithBar, ColorRing, Comment, Discuss, Dna, FallingLines, FidgetSpinner, Grid, Hearts, InfinitySpin, LineWave, MagnifyingGlass, MutatingDots,
export class IPLDashboard extends Component {
  state = { isLoading: true, teamsList: [] };

  componentDidMount() {
    this.getTeamListData();
  }

  getTeamListData = async () => {
    const response = await fetch("https://apis.ccbp.in/ipl");
    const teamsData = await response.json();
    const formattedTeamsData = teamsData.teams.map((eachTeamData) => ({
      id: eachTeamData.id,
      name: eachTeamData.name,
      teamImageUrl: eachTeamData.team_image_url,
    }));
    this.setState({ isLoading: false, teamsList: formattedTeamsData });
  };

  render() {
    const { isLoading, teamsList } = this.state;

    return (
      <div className="ipl-dashboard-container">
        <div className="ipl-logo-name-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo-image"
          />
          <h1 className="ipl-dashboard-heading">ipl dashboard</h1>
        </div>
        {isLoading ? (
          <InfinitySpin color="#fff" height={200} width={200} />
        ) : (
          <div className="teams-list-container-ipl">
            {teamsList.map((eachTeam) => (
              <TeamCard key={eachTeam.id} teamDetails={eachTeam} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default IPLDashboard;
