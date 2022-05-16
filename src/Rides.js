import React from "react";

export const Rides = (props) => {
  let distance;
  const { userStation } = props ? props : "";
  const { id, origin_station_code, station_path, date, map_url, state, city } =
    props.ride ? props.ride : "";

  if (userStation) {
    const nearestStation = station_path.reduce((prev, curr) => {
      return Math.abs(curr - userStation) < Math.abs(prev - userStation)
        ? curr
        : prev;
    });
    distance = Math.abs(nearestStation - userStation);
  }
  return (
    <div className="rides-container">
      <div className="ride-map-img">
        <img src={`${map_url}`} alt="map" />
      </div>
      <div className="ride-data">
        <p>
          Ride Id :<span>{id}</span>
        </p>
        <p>
          Origin Station :<span>{origin_station_code}</span>
        </p>
        <p>
          Station Path :<span>{JSON.stringify(station_path)}</span>
        </p>
        <p>
          Date :<span>{date}</span>
        </p>
        <p>
          Distance :<span>{distance}</span>
        </p>
      </div>
      <div className="ride-location">
        <div className="city-name">{city}</div>
        <div className="state-name">{state}</div>
      </div>
    </div>
  );
};
