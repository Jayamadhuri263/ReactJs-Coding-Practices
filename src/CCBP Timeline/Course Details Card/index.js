import React from "react";
import { AiFillClockCircle } from "react-icons/ai";
import "../index.css";

function CourseDetailsCard(props) {
  const { courseDetails } = props;
  const { courseTitle, description, duration, tagsList } = courseDetails;

  return (
    <div className="course-details-card-main-container">
      <div className="course-details-card-sub-container">
        <h1 className="course-details-card-title">{courseTitle}</h1>
        <div className="course-details-card-duration-container">
          <AiFillClockCircle
            height={10}
            width={10}
            className="course-details-card-duration-icon"
          />
          <p className="course-details-card-duration">{duration}</p>
        </div>
      </div>
      <p className="course-details-card-description">{description}</p>
      <div className="course-details-card-tag-list-container">
        {tagsList.map((each) => (
          <li className="course-details-card-tag-list-item" key={each.id}>
            <p className="course-details-card-tag-list-item-name">
              {each.name}
            </p>
          </li>
        ))}
      </div>
    </div>
  );
}

export default CourseDetailsCard;
