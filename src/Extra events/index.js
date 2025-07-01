import { Component } from "react";
import "./index.css";
import ExtraEventsItem from "./Item";

const eventsList = [
  {
    id: "f9bb2373-b80e-46b8-8219-f07217b9f3ce",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/event-canada-dance-festival-img.png",
    name: "Canada Dance Festival",
    location: "Canada, America",
    registrationStatus: "YET_TO_REGISTER",
  },
  {
    id: "c0040497-e9cb-4873-baa9-ef5b994abfff",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/events-kathakali-img.png",
    name: "Puthanalkkal Kalavela",
    location: "Karnataka, India",
    registrationStatus: "REGISTERED",
  },
  {
    id: "0037d5e4-4005-4030-987b-ce41b691b92a",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/events-kuchipudi-img.png",
    name: "Nithyopahara",
    location: "Kerala, India",
    registrationStatus: "REGISTRATIONS_CLOSED",
  },
  {
    id: "c9ff08cb-610c-4382-9939-78e5e50a72b2",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/events-bharatanatyam-img.png",
    name: "Shivam",
    location: "Andhra Pradesh, India",
    registrationStatus: "YET_TO_REGISTER",
  },
  {
    id: "d1153723-5b6e-4628-9a1a-ccd8f84f1273",
    imageUrl: "https://assets.ccbp.in/frontend/react-js/events-kolatam-img.png",
    name: "Janapada Kolatam",
    location: "Tamil Nadu, India",
    registrationStatus: "REGISTERED",
  },
  {
    id: "7d6ec013-d0ae-4d84-b776-14b733a9174f",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/event-colonial-fest-img.png",
    name: "Colonial Fest",
    location: "Washington, America",
    registrationStatus: "REGISTRATIONS_CLOSED",
  },
];

class ExtraEvents extends Component {
  state = { activeEvent: "" };
  onTriggerEvent = (id) => {
    this.setState({
      activeEvent: id,
    });
  };
  getStatus = () => {
    const { activeEvent } = this.state;
    const activeDetails = eventsList.find((item) => item.id === activeEvent);
    if (activeDetails) {
      switch (activeDetails.registrationStatus) {
        case "YET_TO_REGISTER":
          return <h1>Registrations yet to start.</h1>;
        case "REGISTRATIONS_CLOSED":
          return <h1>Registrations are closed.</h1>;
        case "REGISTERED":
          return <h1>Already registered.</h1>;
        default:
          return "";
      }
    }
    return <h1>Click an Event to view its registration details.</h1>;
  };

  render() {
    return (
      <section className="extra-events">
        <div className="extra-events-list-container">
          <h1>Events</h1>
          <div className="extra-events-list">
            {eventsList.map((eachItem) => {
              return (
                <ExtraEventsItem
                  key={eachItem.id}
                  itemDetails={eachItem}
                  onTriggerEvent={this.onTriggerEvent}
                />
              );
            })}
          </div>
        </div>
        <div className="extra-events-results-container">{this.getStatus()}</div>
      </section>
    );
  }
}

export default ExtraEvents;
