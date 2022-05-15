import React from "react";

export const Main = (props) => {
  return (
    <div className="data-main">
      <div className="main-options">
        <div className="section-btns">
          <button>
            Nearest rides<span></span>
          </button>
          <button className="section-active">
            Upcoming rides<span></span>
          </button>
          <button>
            Past rides<span></span>
          </button>
        </div>
        <div className="filters">
          <button type="button" className="filter-btn">
            <img
              src="https://icon-library.com/images/white-menu-icon-png/white-menu-icon-png-18.jpg"
              alt="filter"
              style={{ width: "20px", height: "20px" }}
            />
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};
