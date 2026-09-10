import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import TechEraHeader from "./TechEraHeader";
import "./TechEra.css";

const COURSES_URL = "https://apis.ccbp.in/te/courses/";

function TechEra() {
  const [coursesData, setCoursesData] = useState(null);
  const [isErrorFromApi, setIsErrorFromApi] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadCourses = async () => {
    setLoading(true);
    setIsErrorFromApi(false);
    try {
      const res = await fetch(COURSES_URL);
      if (!res.ok) {
        throw new Error("failed");
      }
      const data = await res.json();
      setCoursesData(data);
    } catch {
      setIsErrorFromApi(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    const id = "tech-era-bootstrap-css";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css";
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    }
  }, []);

  const onClick = (course) => {
    navigate(`/tech-era/courses/${course.id}`);
  };

  const onRetryCourses = () => {
    loadCourses();
  };

  return (
    <>
      <TechEraHeader />
      <div className="tech-era-main-container">
        <h2 style={{ color: "#1e293b", marginBottom: "20px" }}>Courses</h2>
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
        ) : (
          coursesData?.courses && (
            <div style={{ display: "flex", flexWrap: "wrap", width: "95%" }}>
              {coursesData.courses.map((course) => (
                <div key={course.id} className="text-era-list-container">
                  <div
                    style={{
                      display: "flex",
                      margin: "27px 30px 27px 0px",
                      cursor: "pointer",
                    }}
                    onClick={() => onClick(course)}
                    onKeyDown={(e) => e.key === "Enter" && onClick(course)}
                    role="button"
                    tabIndex={0}
                  >
                    <img
                      src={course.logo_url}
                      alt=""
                      style={{ height: "60px", width: "60px" }}
                    />
                    <p style={{ marginLeft: "14px", paddingTop: "18px" }}>
                      {course.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </>
  );
}

export default TechEra;
