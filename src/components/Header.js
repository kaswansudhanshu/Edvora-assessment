import React from "react";

export const Header = (props) => {
  return (
    <div className="page-header">
      <div className="logo">
        <h2>Edvora</h2>
      </div>
      <div className="user-details">
        <p className="user-name">{props.user?.name}</p>
        <img className="user-image" src={`${props.user?.url}`} alt="user" />
      </div>
    </div>
  );
};
