import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";
import "./index.css";
import Item from "./Item";

class ExtraAppointment extends Component {
  state = {
    extraAppointments: [],
    title: "",
    date: "",
  };

  onChangeTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  onChangeDate = (e) => {
    this.setState({
      date: e.target.value,
    });
  };

  onAddAppointment = (e) => {
    e.preventDefault();
    const { title, date } = this.state;
    const newAppointmentList = {
      id: uuid(),
      title,
      date: format(new Date(date), "dd MMMM yyyy, EEEE"),
      isFavorite: true,
    };
    this.setState((prevState) => ({
      extraAppointments: [...prevState.extraAppointments, newAppointmentList],
      title: "",
      date: "",
    }));
  };

  onStarButtonIcon = (id) => {
    this.setState((prevState) => ({
      extraAppointments: prevState.ExtraAppointment.map((each) => {
        if (id === each.id) {
          return { ...each, isFavorite: !each.isFavorite };
        }
        return each;
      }),
    }));
  };

  render() {
    const { title, date, extraAppointments } = this.state;
    console.log(extraAppointments);
    return (
      <div className="extra-app-container">
        <div className="extra-app-container-mini">
          <div className="extra-app-container-mini-container">
            <div className="extra-form-container">
              <h1 className="extra-app-heading"> Add Appointment</h1>
              <form onSubmit={this.onAddAppointment}>
                <label>Title</label>
                <input
                  type="text"
                  value={title}
                  placeholder="Title"
                  onChange={this.onChangeTitle.bind()}
                />
                <label>Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={this.onChangeDate.bind()}
                />
                <button type="submit">Add</button>
              </form>
            </div>
            <div className="extra-image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointment"
              />
            </div>
          </div>
          <hr />
          <div className="extra-results-container">
            <h1 className="extra-app-result-heading">Appointments</h1>
            <button type="button">Starred</button>
          </div>
          <ul className="results-list-container">
            {extraAppointments.map((item) => (
              <Item
                key={item.id}
                itemDetails={item}
                onStarButtonIcon={this.onStarButtonIcon}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ExtraAppointment;
