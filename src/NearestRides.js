import React from "react";
import { Rides } from "./Rides";

export const NearestRides = (props) => {
  const { nearestRides, sectionActive, userStation } = props;

  if (nearestRides.length !== 0) {
    const sortedNearestRide = nearestRides.sort((a, b) => {
      const arr1 = a.station_path;
      const arr2 = b.station_path;
      const val1 = arr1.reduce(function (prev, curr) {
        return Math.abs(curr - userStation) < Math.abs(prev - userStation)
          ? curr
          : prev;
      });
      const val2 = arr2.reduce(function (prev, curr) {
        return Math.abs(curr - userStation) < Math.abs(prev - userStation)
          ? curr
          : prev;
      });
      if (Math.abs(val2 - userStation) > Math.abs(val1 - userStation)) {
        return -1;
      }
      if (Math.abs(val2 - userStation) < Math.abs(val1 - userStation)) {
        return 1;
      }
      // a must be equal to b
      return 0;
    });
    return (
      <div
        className="nearest-rides"
        style={{
          display: `${sectionActive === 0 ? "block" : "none"}`,
        }}
      >
        {sortedNearestRide.map((ride, i) => {
          return (
            <Rides ride={ride} key={ride.id + i} userStation={userStation} />
          );
        })}
      </div>
    );
  } else {
    return (
      <div
        className="nearest-rides"
        style={{
          display: `${sectionActive === 0 ? "block" : "none"}`,
        }}
      >
        <p>No Rides with distance 2 or less</p>
      </div>
    );
  }
};
