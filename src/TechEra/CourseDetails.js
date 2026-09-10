import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import TechEraHeader from "./TechEraHeader";
import "./TechEra.css";

function CourseDetails() {
  const { id } = useParams();
  const [courseDetails, setCourseDetails] = useState([]);
  const [isErrorFromApi, setIsErrorFromApi] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadDetails = useCallback(async () => {
    if (!id) {
      setIsNotFound(true);
      setLoading(false);
      return;
    }
    setLoading(true);
    setIsErrorFromApi(false);
    setIsNotFound(false);
    try {
      const res = await fetch(`https://apis.ccbp.in/te/courses/${id}`);
      if (res.status === 404) {
        setIsNotFound(true);
        setCourseDetails([]);
        return;
      }
      if (!res.ok) {
        throw new Error("failed");
      }
      const data = await res.json();
      let details = data.course_details;
      if (details == null) {
        setIsNotFound(true);
        setCourseDetails([]);
        return;
      }
      if (!Array.isArray(details)) {
        details = [details];
      }
      setCourseDetails(details);
      setIsNotFound(false);
    } catch {
      setIsErrorFromApi(true);
      setCourseDetails([]);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadDetails();
  }, [loadDetails]);

  const onRetryCourses = () => {
    loadDetails();
  };

  return (
    <>
      <TechEraHeader />
      <div className="tech-era-course-details-container">
        {loading ? (
          <div style={{ padding: "40px" }}>
            <ColorRing color="#4565a1" height={60} width={60} />
            <p style={{ color: "#1e293b" }}>Please Wait... </p>
          </div>
        ) : isErrorFromApi ? (
          <div className="tech-era-failure-view-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
              alt=""
              style={{ height: "46vh", width: "38%", marginTop: "0px" }}
            />
            <h1
              style={{
                color: "#4565a1",
                marginTop: "20px",
                marginBottom: "10px",
              }}
            >
              Oops! Something went wrong
            </h1>
            <p style={{ color: "#4565a1" }}>
              We can&apos;t seem to find the page you&apos;re looking for.
            </p>
            <button
              type="button"
              onClick={onRetryCourses}
              className="tech-era-failure-button"
            >
              Retry
            </button>
          </div>
        ) : isNotFound && courseDetails.length === 0 ? (
          <div className="tech-era-failure-view-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
              alt=""
              style={{ height: "46vh", width: "28%", marginTop: "0px" }}
            />
            <h1
              style={{
                color: "#64748b",
                marginTop: "20px",
                marginBottom: "10px",
              }}
            >
              Page Not Found
            </h1>
            <p style={{ color: "#4565a1" }}>
              We are sorry, the page you&apos;re requested could not be found.
            </p>
          </div>
        ) : (
          courseDetails.map((courseDetail) => (
            <div
              key={courseDetail.id || courseDetail.name}
              style={{
                display: "flex",
                borderRadius: "7px",
                boxShadow: "1px 1px 1px 1px #888888",
                width: "90%",
                marginBottom: "24px",
              }}
            >
              <img
                src={courseDetail.image_url}
                alt={courseDetail.name}
                className="tech-era-detail-image"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "40px 60px 10px 10px",
                }}
              >
                <h1 style={{ color: "#1e293b" }}>{courseDetail.name}</h1>
                <p
                  style={{
                    color: "#475569",
                    marginTop: "10px",
                    fontSize: "18px",
                    lineHeight: "32px",
                  }}
                >
                  {courseDetail.description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default CourseDetails;
