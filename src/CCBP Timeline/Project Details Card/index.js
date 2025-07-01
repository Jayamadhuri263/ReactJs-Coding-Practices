import React from "react";
import { AiFillCalendar } from "react-icons/ai";
import "../index.css";

function ProjectDetailsCard(props) {
  const { projectDetails } = props;
  const { projectTitle, description, duration, imageUrl, projectUrl } =
    projectDetails;
  return (
    <div className="course-details-card-main-container">
      <img
        src={imageUrl}
        alt={projectTitle}
        className="project-details-card-image"
      />
      <div className="course-details-card-sub-container">
        <h1 className="course-details-card-title">{projectTitle}</h1>
        <div className="course-details-card-duration-container">
          <AiFillCalendar
            height={10}
            width={10}
            className="course-details-card-duration-icon"
          />
          <p className="course-details-card-duration">{duration}</p>
        </div>
      </div>
      <p className="course-details-card-description">{description}</p>
      <a
        href={projectUrl}
        target="_blank"
        rel="noreferrer"
        className="project-details-card-url"
      >
        Visit
      </a>
    </div>
  );
}

export default ProjectDetailsCard;
