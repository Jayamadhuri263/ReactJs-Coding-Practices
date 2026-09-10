import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./WeatherApp.css";
import { fetchCitiesIndia, fetchStatesIndia } from "./weatherLocationsApi";
import WeatherCustomSelect from "./WeatherCustomSelect";

/** OpenWeather / air — same app ids as Angular WeatherAppService */
const WEATHER_APP_ID = "695ed9f29c4599b7544d0db5c211d499";
const AIR_APP_ID = "d9576385ecb258b4086e0c72840f58d2";

function toTitleCase(str) {
  if (!str) {
    return "";
  }
  return str.replace(/\w\S*/g, (txt) =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

function WeatherApp() {
  const [statesList, setStatesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  /** State name string — same as IndiaLocationSelector (value = state.name) */
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [statesLoading, setStatesLoading] = useState(true);
  const [locationsReady, setLocationsReady] = useState(false);
  const [locationsLoading, setLocationsLoading] = useState(false);
  const [locationsError, setLocationsError] = useState(null);

  const [weatherRecord, setWeatherRecord] = useState([]);
  const [airPollutionDetails, setAirPollutionDetails] = useState([]);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCityNotFound, setIsCityNotFound] = useState(false);

  useEffect(() => {
    const linkId = "font-awesome-weather-app";
    if (!document.getElementById(linkId)) {
      const link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
      document.head.appendChild(link);
    }
  }, []);

  // 1) Load all India states (Countries Now) — same as IndiaLocationSelector
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLocationsError(null);
      try {
        const states = await fetchStatesIndia();
        if (cancelled) return;
        if (!states.length) {
          setLocationsError("No states returned from API.");
          return;
        }
        setStatesList(states);
        setSelectedState(states[0].state_name);
      } catch (err) {
        if (!cancelled) {
          setLocationsError(
            err?.message ||
              "Could not load states. Check the network or try again later."
          );
        }
      } finally {
        if (!cancelled) setStatesLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // 2) Load cities whenever selected state changes — POST body { country, state: selectedState }
  useEffect(() => {
    if (!selectedState) {
      setCitiesList([]);
      setSelectedCity("");
      setLocationsReady(false);
      return;
    }

    let cancelled = false;
    (async () => {
      setLocationsLoading(true);
      setLocationsError(null);
      try {
        const cities = await fetchCitiesIndia(selectedState);
        if (cancelled) return;
        if (!cities.length) {
          setLocationsError("No cities returned for this state.");
          setCitiesList([]);
          setSelectedCity("");
          setLocationsReady(false);
          return;
        }
        setCitiesList(cities);
        setSelectedCity(cities[0].city_name);
        setLocationsReady(true);
      } catch (err) {
        if (!cancelled) {
          setLocationsError(
            err?.message || "Failed to load cities. Check the network."
          );
          setCitiesList([]);
          setSelectedCity("");
          setLocationsReady(false);
        }
      } finally {
        if (!cancelled) setLocationsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [selectedState]);

  const fetchWeatherForCity = useCallback(async (cityName, stateName) => {
    if (!cityName) return;
    setLoading(true);
    setIsCityNotFound(false);
    setWeatherRecord([]);
    setAirPollutionDetails([]);
    const weatherQuery =
      cityName && stateName
        ? `${cityName},${stateName},IN`
        : `${cityName},IN`;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          weatherQuery
        )}&units=metric&APPID=${WEATHER_APP_ID}`
      );
      if (!res.ok) {
        if (res.status === 404) {
          setIsCityNotFound(true);
        }
        setLoading(false);
        return;
      }
      const record = await res.json();
      setWeatherRecord([record]);
      const icon = record.weather[0].icon;
      setImage(`https://openweathermap.org/img/wn/${icon}@2x.png`);
      setIsCityNotFound(false);

      const lat = record.coord.lat;
      const lon = record.coord.lon;

      const airRes = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${AIR_APP_ID}`
      );
      if (airRes.ok) {
        const airData = await airRes.json();
        setAirPollutionDetails(airData.list || []);
      }
    } catch {
      setIsCityNotFound(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!locationsReady || !selectedCity) return;
    fetchWeatherForCity(selectedCity, selectedState);
  }, [selectedCity, selectedState, locationsReady, fetchWeatherForCity]);

  const stateOptions = statesList.map((s) => ({
    value: s.state_name,
    label: s.state_name,
  }));

  const cityOptions = citiesList.map((c) => ({
    value: c.city_name,
    label: c.city_name,
  }));

  const cityPlaceholder =
    !locationsLoading && selectedState && citiesList.length === 0
      ? "No cities for this state"
      : "Select city";

  return (
    <div className="weather-app-root e-bank-home-main-container">
      <div className="e-bank-home-header-container">
        <Link
          to="/weatherApp"
          style={{
            textDecoration: "none",
            cursor: "pointer",
            display: "flex",
            color: "#fff",
          }}
        >
          <img
            src="https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png"
            className="e-bank-home-header-logo"
            alt=""
          />
          <h2>Weather Application</h2>
        </Link>
      </div>
      <hr
        style={{
          borderTop: "2px solid #fff",
          marginBottom: "20px",
          marginTop: "10px",
        }}
      />
      <div className="weather-app-main-layout">
        <aside className="weather-app-sidebar" aria-label="Location selection">
          <form
            className="weather-app-location-form"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Choose state and city for weather"
          >
          <div className="weather-app-location-card">
            <div className="weather-app-location-card__header">
              <span className="weather-app-location-card__eyebrow">India</span>
              <h3 className="weather-app-location-card__title">Location</h3>
              <p className="weather-app-location-card__hint">
                Pick a state, then a city to load the forecast.
              </p>
            </div>

            {locationsError && (
              <div className="weather-app-location-error" role="alert">
                {locationsError}
              </div>
            )}

            <div className="weather-app-field">
              <label className="weather-app-field__label" htmlFor="weather-state">
                State
              </label>
              <div className="weather-app-select-wrap">
                <WeatherCustomSelect
                  id="weather-state"
                  value={selectedState}
                  onChange={setSelectedState}
                  options={stateOptions}
                  disabled={statesLoading || !statesList.length}
                  loading={statesLoading}
                  loadingLabel="Loading states…"
                  placeholder="Select state"
                  searchPlaceholder="Search states…"
                  aria-busy={statesLoading}
                />
              </div>
            </div>

            <div className="weather-app-field">
              <label className="weather-app-field__label" htmlFor="weather-city">
                City
              </label>
              <div className="weather-app-select-wrap">
                <WeatherCustomSelect
                  id="weather-city"
                  value={selectedCity}
                  onChange={setSelectedCity}
                  options={cityOptions}
                  disabled={
                    !selectedState || locationsLoading || !citiesList.length
                  }
                  loading={
                    Boolean(
                      locationsLoading &&
                        selectedState &&
                        citiesList.length === 0
                    )
                  }
                  loadingLabel="Loading cities…"
                  placeholder={cityPlaceholder}
                  searchPlaceholder="Search cities…"
                  aria-busy={locationsLoading}
                />
              </div>
            </div>
          </div>
        </form>
        </aside>

        <section
          className="weather-app-weather-details-container weather-app-results-panel"
          aria-label="Weather forecast"
        >
          {/* Spinner while any HTTP is in flight (like WeatherInterceptor + getLoading()) */}
          {(loading || statesLoading || locationsLoading) && (
            <div className="cssload-container">
              <div className="cssload-speeding-wheel" />
            </div>
          )}
          <h2 className="city-weather-title">
            {toTitleCase(selectedCity)}&apos;s Weather
          </h2>
          <h2
            className={`city-not-found-heading ${
              !isCityNotFound ? "weather-app-d-none" : ""
            }`}
          >
            {selectedCity}&apos;s Weather and it&apos;s details are Not Found
          </h2>
          <div
            className={
              isCityNotFound
                ? "weather-app-d-none"
                : "weather-app-results-grid"
            }
          >
            {weatherRecord.map((w) => (
              <div
                key={w.id}
                className="weather-record-sub-container weather-record-sub-container--hero"
              >
                <h1 className="weather-details-main-temp">
                  {Math.round(w.main.temp)}
                  <sup>
                    <span style={{ fontSize: "22px" }}>&#8451;</span>
                  </sup>
                </h1>
                <p className="weather-details-feels-temp">
                  Feels like{" "}
                  <span style={{ color: "#152850", fontWeight: 600 }}>
                    {Math.round(w.main.feels_like)}
                    <sup>
                      <span style={{ fontSize: "18px" }}>&#8451;</span>
                    </sup>
                  </span>
                </p>
                <img
                  src={image}
                  className="weather-details-image-icon"
                  alt=""
                />
                <p className="weather-details-description">
                  {w.weather[0].main} -{" "}
                  {toTitleCase(w.weather[0].description)}
                </p>
              </div>
            ))}
            {weatherRecord.map((w) => (
              <div
                key={`extra-${w.id}`}
                className="weather-record-sub-container weather-record-sub-container--stats"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <p className="weather-details-min-max-temp">
                    Latitude <br />
                    <span style={{ color: "#152850", fontWeight: 600 }}>
                      {w.coord.lat.toFixed(1)}
                      <sup>
                        <span style={{ fontSize: "15px" }}>&#xb0;</span>
                      </sup>
                    </span>
                  </p>
                  <p className="weather-details-min-max-temp">
                    Longitude <br />
                    <span style={{ color: "#152850", fontWeight: 600 }}>
                      {w.coord.lon.toFixed(1)}
                      <sup>
                        <span style={{ fontSize: "15px" }}>&#xb0;</span>
                      </sup>
                    </span>
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: "20px",
                  }}
                >
                  <p className="weather-details-min-max-temp">
                    Min Temp <br />
                    <span style={{ color: "#152850", fontWeight: 600 }}>
                      {Math.round(w.main.temp_min)}
                      <sup>
                        <span style={{ fontSize: "12px" }}>&#8451;</span>
                      </sup>
                    </span>
                  </p>
                  <p className="weather-details-min-max-temp">
                    Max Temp <br />
                    <span style={{ color: "#152850", fontWeight: 600 }}>
                      {Math.round(w.main.temp_max)}
                      <sup>
                        <span style={{ fontSize: "12px" }}>&#8451;</span>
                      </sup>
                    </span>
                  </p>
                  <p className="weather-details-min-max-temp">
                    Humidity <br />
                    <span style={{ color: "#152850", fontWeight: 600 }}>
                      {w.main.humidity}
                      <span style={{ fontSize: "15px" }}>%</span>
                    </span>
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: "20px",
                  }}
                >
                  <p className="weather-details-min-max-temp">
                    Pressure <br />
                    <span style={{ color: "#152850", fontWeight: 600 }}>
                      {w.main.pressure}
                      <span style={{ fontSize: "15px" }}> N/m²</span>
                    </span>
                  </p>
                  <p className="weather-details-min-max-temp">
                    Speed <br />
                    <span style={{ color: "#152850", fontWeight: 600 }}>
                      {w.wind?.speed ?? 0}
                      <span style={{ fontSize: "15px" }}> kmph</span>
                    </span>
                  </p>
                  <p className="weather-details-min-max-temp">
                    Visibility <br />
                    <span style={{ color: "#152850", fontWeight: 600 }}>
                      {w.visibility ?? 0}
                      <span style={{ fontSize: "15px" }}> m</span>
                    </span>
                  </p>
                </div>
              </div>
            ))}
            {airPollutionDetails[0] && (
              <div className="weather-record-sub-container weather-record-sub-container--aqi">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "-10px",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <p className="weather-details-min-max-temp">
                    <span style={{ color: "#152850", fontWeight: 600 }}>
                      AQI
                    </span>{" "}
                    is a measure of how air pollution affects one&apos;s health
                    within a short time period
                  </p>
                  <p className="weather-details-min-max-temp">
                    <span style={{ color: "#152850", fontWeight: 500 }}>
                      Air Quality Index(AQI)
                    </span>{" "}
                    -{" "}
                    <span style={{ color: "#152850", fontWeight: 600 }}>
                      {airPollutionDetails[0].main?.aqi}
                    </span>
                  </p>
                  <p style={{ marginTop: "10px" }}>
                    If{" "}
                    <span style={{ color: "#152850", fontWeight: 600 }}>
                      AQI = 1
                    </span>
                    , it means{" "}
                    <span style={{ color: "#152850", fontWeight: 600 }}>
                      Good
                    </span>{" "}
                    air
                  </p>
                  <p>
                    If{" "}
                    <span style={{ color: "#152850", fontWeight: 600 }}>
                      AQI = 2
                    </span>
                    , it means{" "}
                    <span style={{ color: "#152850", fontWeight: 600 }}>
                      Fair
                    </span>{" "}
                    air
                  </p>
                  <p>
                    If{" "}
                    <span style={{ color: "#152850", fontWeight: 600 }}>
                      AQI = 3
                    </span>
                    , it means{" "}
                    <span style={{ color: "#152850", fontWeight: 600 }}>
                      Moderate
                    </span>{" "}
                    air
                  </p>
                  <p>
                    If{" "}
                    <span style={{ color: "#152850", fontWeight: 600 }}>
                      AQI = 4
                    </span>
                    , it means{" "}
                    <span style={{ color: "#152850", fontWeight: 600 }}>
                      Poor
                    </span>{" "}
                    air
                  </p>
                  <p>
                    If{" "}
                    <span style={{ color: "#152850", fontWeight: 600 }}>
                      AQI = 5
                    </span>
                    , it means{" "}
                    <span style={{ color: "#152850", fontWeight: 600 }}>
                      Very poor
                    </span>{" "}
                    air
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default WeatherApp;
