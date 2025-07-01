import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";
import "./index.css";
import "../Comments App/index.css";
import AppointmentItem from "./Appointment Item";

const initialAppointmentList = [
  {
    id: uuid(),
    title: "Office",
    date: format(new Date(), "dd MMMM yyyy, EEEE"),
    isFavorite: true,
  },
];

function AppointmentsApp() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [appointmentsList, setAppointmentList] = useState(
    initialAppointmentList
  );
  let [isStarred, setIsStarred] = useState(false);

  const onSubmitForm = (e) => {
    e.preventDefault();

    let newAppointment = {
      id: uuid(),
      title,
      date: format(new Date(), "dd MMMM yyyy, EEEE"),
      isFavorite: false,
    };
    setAppointmentList([...appointmentsList, newAppointment]);
    setTitle("");
    setDate("");
  };

  const toggleIsFavorite = (id) => {
    setAppointmentList(
      appointmentsList.map((item) => {
        if (item.id === id) {
          return { ...item, isFavorite: !item.isFavorite };
        }
        return item;
      })
    );
  };

  const getFilteredAppointmentList = () => {
    if (isStarred) {
      return appointmentsList.filter((app) => app.isFavorite === true);
    }
    return appointmentsList;
  };

  const onClickStarred = () => {
    setIsStarred((isStarred = !isStarred));
  };

  //   console.log("starred list: ", appointmentsList);

  const filteredAppointmentList = getFilteredAppointmentList();

  return (
    <div className="appointments-app-container">
      <div className="appointments-app-mini-container">
        <h1 className="comments-app-heading">Add Appointment</h1>
        <div className="comments-app-mini-container appointment-form-mini-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            alt="appointment"
            className="comments-app-image appointment-image"
          />
          <form
            className="comments-app-form-container appointment-form-container"
            onSubmit={onSubmitForm}
          >
            <label
              className="comments-app-form-heading appointment-title"
              htmlFor="appointmentTitle"
            >
              TITLE
            </label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              id="appointmentTitle"
              onChange={(e) => setTitle(e.target.value)}
              className="comments-app-form-name-input appointment-input"
            />
            <label
              className="comments-app-form-heading appointment-title"
              htmlFor="appointmentDate"
            >
              DATE
            </label>
            <input
              type="date"
              id="appointmentDate"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              //   onBlur={(e) => (e.target.type = "text")}
              className="comments-app-form-name-input textarea-input appointment-input"
            />
            <button
              type="submit"
              className="comments-app-button appointment-submit-button"
            >
              Add
            </button>
          </form>
        </div>
        <hr className="comments-app-line appointment-app-line" />

        <div className="appointments-list-container">
          <div className="appointments-list-name-fav-container">
            <h1 className="comments-app-heading appointments-list-heading-appointments">
              Appointments
            </h1>
            <button
              type="button"
              className="appointments-list-starred-button"
              onClick={onClickStarred}
            >
              Starred
            </button>
          </div>
          <div className="appointments-lists-container-bottom">
            {filteredAppointmentList.map((eachAppointment) => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleIsFavorite={toggleIsFavorite}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentsApp;
