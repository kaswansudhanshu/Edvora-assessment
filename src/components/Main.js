import React from "react";
import { PastRides, UpcomingRides, NearestRides } from './index'
// import { PastRides } from "./PastRides";
// import { UpcomingRides } from "../UpcomingRides";
// import { NearestRides } from "../NearestRides";

export const Main = (props) => {
  const {
    user,
    pastRides,
    nearestRides,
    upcomingRides,
    sectionActive,
    changeSection,
    states,
    cities,
    showFilters,
    adjustFilter,
  } = props;
  const userStation = user.station_code;
  return (
    <div className="data-main">
      <div className="main-options">
        <div className="section-btns">
          <button
            className={sectionActive === 0 ? "section-active" : ""}
            onClick={() => changeSection(0)}
          >
            Nearest rides<span>{`(${nearestRides.length})`}</span>
          </button>
          <button
            className={sectionActive === 1 ? "section-active" : ""}
            onClick={() => changeSection(1)}
          >
            Upcoming rides<span>{`(${upcomingRides.length})`}</span>
          </button>
          <button
            className={sectionActive === 2 ? "section-active" : ""}
            onClick={() => changeSection(2)}
          >
            Past rides<span>{`(${pastRides.length})`}</span>
          </button>
        </div>
        <div className="filters dropdown">
          <button
            type="button"
            className="filter-btn dropbtn"
            onClick={showFilters}
          >
            <img
              src="https://icon-library.com/images/white-menu-icon-png/white-menu-icon-png-18.jpg"
              alt="filter"
              style={{ width: "20px", height: "20px" }}
            />
            Filter
          </button>
          <div id="myDropdown" className="dropdown-content">
            <div className="select-container">
              <select id="states" name="states" onChange={adjustFilter}>
                <option value="state">State</option>
                {states.length !== 0
                  ? states.map((state, i) => {
                      return (
                        <option value={state} key={i}>
                          {state}
                        </option>
                      );
                    })
                  : ""}
              </select>
              <select id="cities" name="cities" onChange={adjustFilter}>
                <option value="city">City</option>
                {cities.length !== 0
                  ? cities.map((city, i) => {
                      return (
                        <option value={city} key={i}>
                          {city}
                        </option>
                      );
                    })
                  : ""}
              </select>
            </div>
          </div>
        </div>
      </div>
      <NearestRides
        nearestRides={nearestRides}
        sectionActive={sectionActive}
        userStation={userStation}
      />
      <PastRides
        pastRides={pastRides}
        sectionActive={sectionActive}
        userStation={userStation}
      />
      <UpcomingRides
        upcomingRides={upcomingRides}
        sectionActive={sectionActive}
        userStation={userStation}
      />
    </div>
  );
};
