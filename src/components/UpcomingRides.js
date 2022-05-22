import React from "react";
import { Rides } from "./Rides";

export const UpcomingRides = (props) => {
  const { upcomingRides, sectionActive, userStation } = props;
  if (upcomingRides.length !== 0) {
    return (
      <div
        className="upcoming-rides"
        style={{
          display: `${sectionActive === 1 ? "block" : "none"}`,
        }}
      >
        {upcomingRides.map((ride, i) => {
          return (
            <Rides ride={ride} key={ride.id + i} userStation={userStation} />
          );
        })}
      </div>
    );
  } else {
    return (
      <div
        className="upcoming-rides"
        style={{
          display: `${sectionActive === 1 ? "block" : "none"}`,
        }}
      >
        <p>No Upcoming Rides available..</p>
      </div>
    );
  }
};
