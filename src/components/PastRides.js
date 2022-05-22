import React from "react";
import { Rides } from "./Rides";

export const PastRides = (props) => {
  const { pastRides, sectionActive, userStation } = props;
  if (pastRides)
    return (
      <div
        className="past-rides"
        style={{
          display: `${sectionActive === 2 ? "block" : "none"}`,
        }}
      >
        {pastRides.map((ride, i) => {
          return (
            <Rides
              ride={ride}
              key={ride.id + `${i}`}
              userStation={userStation}
            />
          );
        })}
      </div>
    );
};
