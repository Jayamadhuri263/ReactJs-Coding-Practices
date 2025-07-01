import React, { Component } from "react";
import { Bars } from "react-loader-spinner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
  Cell,
} from "recharts";
import "./index.css";

const apiConstantsList = {
  initial: "INITIAL",
  loading: "LOADING",
  failure: "FAILURE",
  success: "SUCCESS",
};

export class CoWINDashboard extends Component {
  state = {
    isLoading: false,
    cowinDataList: [],
    apiStatus: apiConstantsList.success,
  };

  componentDidMount() {
    this.getCowinDetails();
  }

  getCowinDetails = async () => {
    const response = await fetch("https://apis.ccbp.in/covid-vaccination-data");
    const data = await response.json();
    const fetchedLast7DaysData = data.last_7_days_vaccination;
    const formattedLast7DaysData = fetchedLast7DaysData.map((each) => ({
      dose1: each.dose_1,
      dose2: each.dose_2,
      vaccineDate: each.vaccine_date,
    }));

    const fetchedByAgeData = data.vaccination_by_age;
    const formattedByAgeData = fetchedByAgeData.map((each) => ({
      age: each.age,
      count: each.count,
    }));

    const fetchedByGenderData = data.vaccination_by_gender;
    const formattedByGenderData = fetchedByGenderData.map((each) => ({
      count: each.count,
      gender: each.gender,
    }));

    this.setState({
      cowinDataList: {
        formattedLast7DaysData,
        formattedByAgeData,
        formattedByGenderData,
      },
    });
  };

  renderLoadingView = () => {
    return (
      <div data-testid="loader" className="cowin-dashboard-loading-container">
        <Bars color="#ffffff" height={40} width={40} />
      </div>
    );
  };

  renderFailureView = () => {
    return (
      <div className="cowin-dashboard-failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure-view"
          className="cowin-dashboard-failure-image"
        />
        <h1 className="cowin-dashboard-failure-content">
          Something went wrong
        </h1>
      </div>
    );
  };

  renderSuccessView = () => {
    const { cowinDataList } = this.state;
    console.log(cowinDataList);
    console.log(cowinDataList.formattedByGenderData);

    const DataFormatter = (number) => {
      if (number > 1000) {
        return `${(number / 1000).toString()}k`;
      }
      return number.toString();
    };

    return (
      <>
        <div className="cowin-dashboard-success-view-container">
          <h1 className="cowin-dashboard-chart-heading">
            Vaccination Coverage
          </h1>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={cowinDataList.formattedLast7DaysData}
              margin={{
                top: 2,
                borderRadius: 10,
              }}
            >
              <XAxis
                dataKey="vaccineDate"
                tick={{
                  stroke: "gray",
                  strokeWidth: 1,
                }}
              />
              <YAxis
                tickFormatter={DataFormatter}
                tick={{
                  stroke: "gray",
                  strokeWidth: 0,
                }}
              />
              <Legend
                wrapperStyle={{
                  padding: 3,
                  borderRadius: 6,
                }}
              />
              <Bar dataKey="dose1" name="Dose1" fill="#5a8dee" barSize="1%" />
              <Bar dataKey="dose2" name="Dose2" fill="#f54394" barSize="1%" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="cowin-dashboard-success-view-container">
          <h1 className="cowin-dashboard-chart-heading">
            Vaccination by Gender
          </h1>

          <PieChart width={850} height={210}>
            <Pie
              data={cowinDataList.formattedByGenderData}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius={40}
              outerRadius={80}
              dataKey="count"
            >
              <Cell name="Male" fill="#f54394" />
              <Cell name="Female" fill="#5a8dee" />
              <Cell name="Others" fill="#2cc6c6" />
            </Pie>
            <Legend
              iconType="circle"
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                fontSize: 12,
              }}
            />
          </PieChart>
        </div>

        <div className="cowin-dashboard-success-view-container">
          <h1 className="cowin-dashboard-chart-heading">Vaccination by Age</h1>
          <PieChart width={950} height={320}>
            <Pie
              data={cowinDataList.formattedByAgeData}
              cx="50%"
              cy="50%"
              outerRadius={110}
              dataKey="count"
            >
              <Cell fill="#5a8dee" name="18-44" />
              <Cell fill="#a3df9f" name="45-60" />
              <Cell fill="#64c2a6" name="Above 60" />
            </Pie>
            <Legend
              iconType="circle"
              align="center"
              layout="horizontal"
              verticalAlign="bottom"
              wrapperStyle={{
                fontSize: 14,
              }}
            />
          </PieChart>
        </div>
      </>
    );
  };

  renderCowinCharts = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case "LOADING":
        return this.renderLoadingView();
      case "FAILURE":
        return this.renderFailureView();
      case "SUCCESS":
        return this.renderSuccessView();
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="cowin-dashboard-main-container">
        <div className="cowin-dashboard-logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="logo"
            className="cowin-dashboard-logo"
          />
          <h1 className="cowin-dashboard-logo-name">Co-WIN</h1>
        </div>
        <h1 className="cowin-dashboard-main-heading">
          CoWIN Vaccination in India
        </h1>

        {this.renderCowinCharts()}
      </div>
    );
  }
}

export default CoWINDashboard;
