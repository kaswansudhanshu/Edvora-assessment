import React from "react";
import { Header, Main } from "./index";
// import { Header } from "./Header";
// import { Main } from "./Main";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      sectionActive: 0,
      user: "",
      rides: "",
      upcomingRides: "",
      pastRides: "",
      nearestRides: "",
      states: "",
      cities: "",
    };
  }

  componentDidMount() {
    (async function getData() {
      const user = await fetch("https://assessment.api.vweb.app/user").then(
        (res) => res.json()
      );
      const rides = await fetch("https://assessment.api.vweb.app/rides").then(
        (res) => res.json()
      );
      if (rides) {
        let states = [];
        let cities = [];
        rides.forEach((ride) => {
          if (!states.includes(ride.state)) {
            states.push(ride.state);
          }
        });
        rides.forEach((ride) => {
          if (!cities.includes(ride.city)) {
            cities.push(ride.city);
          }
        });

        // const presentDate = new Date();
        const userStation = user.station_code;
        const upcomingRides = this.getUpcomingRides(rides);
        // rides.filter((ride) => {
        //   const rideDate = new Date(ride.date);
        //   return presentDate.getTime() < rideDate.getTime();
        // });
        const pastRides = this.getPastRides(rides);
        //  rides.filter((ride) => {
        //   const rideDate = new Date(ride.date);
        //   return presentDate.getTime() >= rideDate.getTime();
        // });
        const nearestRides = this.getNearestRides(rides, userStation);
        // rides.filter((ride) => {
        //   let val = false;
        //   for (let i = 0; i < ride.station_path.length; i++) {
        //     if (
        //       (ride.station_path[i] - userStation <= 2 &&
        //         ride.station_path[i] - userStation >= -2) ||
        //       (ride.destination_station_code <= 2 &&
        //         ride.destination_station_code >= -2)
        //     )
        //       val = true;
        //     break;
        //   }
        //   return val;
        // });
        this.setState({
          user,
          rides,
          upcomingRides,
          pastRides,
          nearestRides,
          states,
          cities,
        });
      }
    }.bind(this)());
  }

  getUpcomingRides = (rides) => {
    const presentDate = new Date();
    const upcomingRides = rides.filter((ride) => {
      const rideDate = new Date(ride.date);
      return presentDate.getTime() < rideDate.getTime();
    });
    return upcomingRides;
  };

  getPastRides = (rides) => {
    const presentDate = new Date();
    const pastRides = rides.filter((ride) => {
      const rideDate = new Date(ride.date);
      return presentDate.getTime() >= rideDate.getTime();
    });

    return pastRides;
  };

  getNearestRides = (rides, userStation) => {
    const nearestRides = rides.filter((ride) => {
      let val = false;
      for (let i = 0; i < ride.station_path.length; i++) {
        if (
          (ride.station_path[i] - userStation <= 2 &&
            ride.station_path[i] - userStation >= -2) ||
          (ride.destination_station_code <= 2 &&
            ride.destination_station_code >= -2)
        )
          val = true;
        break;
      }
      return val;
    });
    return nearestRides;
  };

  showFilters = () => {
    document.getElementById("myDropdown").classList.toggle("show");
  };

  adjustFilter = () => {
    // const { pastRides, upcomingRides, nearestRides } = this.state;
    const { rides, user } = this.state;
    const userStation = user.station_code;

    const filterState = document.getElementById("states").value;
    const filterCity = document.getElementById("cities").value;

    const pastRides = this.getPastRides(rides);
    const upcomingRides = this.getUpcomingRides(rides);
    const nearestRides = this.getNearestRides(rides, userStation);

    if (filterState !== "state" && filterCity !== "city") {
      const pastRidesStateCity = pastRides.filter((ride) => {
        return ride.state === filterState && ride.city === filterCity;
      });

      const upcomingRidesStateCity =
        upcomingRides.length !== 0
          ? upcomingRides.filter((ride) => {
              return ride.state === filterState && ride.city === filterCity;
            })
          : "";

      const nearestRidesStateCity =
        nearestRides.length !== 0
          ? nearestRides.filter((ride) => {
              return ride.state === filterState && ride.city === filterCity;
            })
          : "";

      this.setState({
        pastRides: pastRidesStateCity,
        upcomingRides: upcomingRidesStateCity,
        nearestRides: nearestRidesStateCity,
      });
    } else if (filterState === "state" && filterCity !== "city") {
      const pastRidesCity = pastRides.filter((ride) => {
        return ride.city === filterCity;
      });
      const upcomingRidesCity =
        upcomingRides.length !== 0
          ? upcomingRides.filter((ride) => {
              return ride.city === filterCity;
            })
          : "";
      const nearestRidesCity =
        nearestRides.length !== 0
          ? nearestRides.filter((ride) => {
              return ride.city === filterCity;
            })
          : "";

      this.setState({
        pastRides: pastRidesCity,
        upcomingRides: upcomingRidesCity,
        nearestRides: nearestRidesCity,
      });
    } else if (filterState !== "state" && filterCity === "city") {
      const pastRidesState = pastRides.filter((ride) => {
        return ride.state === filterState;
      });
      const upcomingRidesState =
        upcomingRides.length !== 0
          ? upcomingRides.filter((ride) => {
              return ride.state === filterState;
            })
          : "";
      const nearestRidesState =
        nearestRides.length !== 0
          ? nearestRides.filter((ride) => {
              return ride.state === filterState;
            })
          : "";

      this.setState({
        pastRides: pastRidesState,
        upcomingRides: upcomingRidesState,
        nearestRides: nearestRidesState,
      });
    }
    if (filterState === "state" && filterCity === "city") {
      // this.defaultFilter();
      this.setState({
        upcomingRides,
        pastRides,
        nearestRides,
      });
    }
  };

  // defaultFilter = () => {
  //   const { rides, user } = this.state;
  //   if (rides) {
  //     const presentDate = new Date();
  //     const userStation = user.station_code;
  //     const upcomingRides = rides.filter((ride) => {
  //       const rideDate = new Date(ride.date);
  //       return presentDate.getTime() < rideDate.getTime();
  //     });
  //     const pastRides = rides.filter((ride) => {
  //       const rideDate = new Date(ride.date);
  //       return presentDate.getTime() >= rideDate.getTime();
  //     });
  //     const nearestRides = rides.filter((ride) => {
  //       let val = false;
  //       for (let i = 0; i < ride.station_path.length; i++) {
  //         if (
  //           (ride.station_path[i] - userStation <= 2 &&
  //             ride.station_path[i] - userStation >= -2) ||
  //           (ride.destination_station_code <= 2 &&
  //             ride.destination_station_code >= -2)
  //         )
  //           val = true;
  //         break;
  //       }
  //       return val;
  //     });
  //     this.setState({
  //       upcomingRides,
  //       pastRides,
  //       nearestRides,
  //     });
  //   }
  // };

  changeSection = (id) => {
    this.setState({
      sectionActive: id,
    });
  };

  render() {
    const {
      user,
      rides,
      pastRides,
      nearestRides,
      upcomingRides,
      sectionActive,
      states,
      cities,
    } = this.state;
    return (
      <div className="App">
        <Header user={user} />
        <Main
          user={user}
          rides={rides}
          nearestRides={nearestRides}
          pastRides={pastRides}
          upcomingRides={upcomingRides}
          sectionActive={sectionActive}
          changeSection={this.changeSection}
          states={states}
          cities={cities}
          showFilters={this.showFilters}
          adjustFilter={this.adjustFilter}
        />
      </div>
    );
  }
}

export default App;
