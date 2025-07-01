import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import "../index.css";
import LatestMatchCard from "../Latest Match Card";
import RecentMatchCard from "../Recent Match Card";

export default function TeamMatchDetails() {
  let { id } = useParams();
  console.log(id);
  console.log(`https://apis.ccbp.in/ipl/${id}`);
  const [isLoading, setIsLoading] = useState(true);
  const [teamsMatchList, setTeamsMatchList] = useState([]);

  useEffect(() => {
    const getTeamMatchListData = async () => {
      const response = await fetch(`https://apis.ccbp.in/ipl/${id}`);
      const teamsMatchData = await response.json();

      const getFormattedData = (data) => ({
        umpires: data.umpires,
        competingTeam: data.competing_team,
        competingTeamLogo: data.competing_team_logo,
        date: data.date,
        firstInnings: data.first_innings,
        id: data.id,
        manOfTheMatch: data.man_of_the_match,
        matchStatus: data.match_status,
        result: data.result,
        secondInnings: data.second_innings,
        venue: data.venue,
      });

      const formattedTeamsMatchData = () => ({
        teamsBannerUrl: teamsMatchData.team_banner_url,
        latestMatch: getFormattedData(teamsMatchData.latest_match_details),
        recentMatches: teamsMatchData.recent_matches.map((recentMatch) =>
          getFormattedData(recentMatch)
        ),
      });
      setTeamsMatchList(formattedTeamsMatchData);
    };

    getTeamMatchListData();
    setIsLoading(false);
  }, [teamsMatchList, id]);

  console.log(teamsMatchList);

  const bgClassName = () => {
    switch (id) {
      case "RCB":
        return "rcb";
      case "CSK":
        return "csk";
      case "MI":
        return "mi";
      case "KKR":
        return "kkr";
      case "KXP":
        return "kxp";
      case "SH":
        return "sh";
      case "RR":
        return "rr";
      case "DC":
        return "dc";
      default:
        return "";
    }
  };

  const { teamsBannerUrl, latestMatch, recentMatches } = teamsMatchList;

  return (
    <div className={`team-match-details-container ${bgClassName()}`}>
      {isLoading ? (
        <ColorRing color="#fff" height={60} width={60} />
      ) : (
        <div className="team-matches-container">
          <img src={teamsBannerUrl} alt={id} className="team-banner-image" />

          <h1 className="latest-matches-heading">Latest Matches</h1>
          <LatestMatchCard latestMatchDetails={latestMatch} />

          <div className="recent-matches-container">
            {recentMatches.map((eachRecentMatch) => (
              <RecentMatchCard
                key={eachRecentMatch.id}
                recentMatchDetails={eachRecentMatch}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// import React, { Component } from "react";
// import { ColorRing } from "react-loader-spinner";
// // import { useMatch, } from "react-router-dom";

//

// // const TeamMatchDetails = () => {
// //   const id = useMatch();

// //   return (
// //     <div>
// //       <h1> {id} </h1>
// //     </div>
// //   );
// // };

// // export default TeamMatchDetails;

// export class TeamMatchDetails extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       id: this.props.params.id,

//       isLoading: true,
//       teamsMatchList: [],
//     };
//   }

//   componentDidMount() {
//     // this.getTeamMatchListData();
//     console.log("getTeamMatchListData calling........");
//   }

//   getTeamMatchListData = async () => {
//     const { match } = this.props;
//     const { params } = match;
//     const { id } = params;

//     const response = await fetch(`https://apis.ccbp.in/ipl/${id}`);
//     const teamsData = await response.json();
//     console.log(teamsData);

//     // const formattedTeamsMatchData = {
//     //   teamsBannerUrl: teamsData.team_banner_url,
//     //   latestMatch: teamsData.latest_match_details.map((e) => ({
//     //     umpires: e.umpires,
//     //   })),
//     // };
//     // this.setState({
//     //   isLoading: false,
//     //   teamsMatchList: formattedTeamsMatchData,
//     // });
//   };

//   render() {
//     const { isLoading, teamsMatchList } = this.state;
//     var { id } = this.state;
//     console.log(this.id);
//     return (
//       <div>
//         TeamMatchDetails
//         <div>TeamMatchDetails</div>
//       </div>
//     );
//   }
// }

// export default TeamMatchDetails;
