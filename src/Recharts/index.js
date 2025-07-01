import React, { Component } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./index.css";

const data = [
  {
    group_name: "RGUKT,RKV",
    boys: 1200,
    girls: 700,
  },
  {
    group_name: "SVU,Tirupati",
    boys: 3000,
    girls: 579,
  },
  {
    group_name: "IIT, Hyderabad",
    boys: 1000,
    girls: 1500,
  },
  {
    group_name: "Sathyabama",
    boys: 700,
    girls: 1200,
  },
  {
    group_name: "Anna University",
    boys: 2700,
    girls: 760,
  },
];

export class Recharts extends Component {
  render() {
    const DataFormatter = (number) => {
      if (number > 1000) {
        return `${(number / 1000).toString()}k`;
      }
      return number.toString();
    };

    return (
      <>
        <h1 className="recharts-heading">Recharts</h1>
        <ResponsiveContainer width="50%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 2,
            }}
          >
            <XAxis
              dataKey="group_name"
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
              }}
            />
            <Bar dataKey="boys" name="Boys" fill="#1f77b4" barSize="1%" />
            <Bar dataKey="girls" name="Girls" fill="#fd7f0e" barSize="1%" />
          </BarChart>
        </ResponsiveContainer>
      </>
    );
  }
}

export default Recharts;
