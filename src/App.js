import React from "react";
import { Header } from "./Header";
import { Main } from "./Main";

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
        const states = rides.map((ride) => ride.state);
        const cities = rides.map((ride) => ride.city);

        const presentDate = new Date();
        const userStation = user.station_code;
        const upcomingRides = rides.filter((ride) => {
          const rideDate = new Date(ride.date);
          return presentDate.getTime() < rideDate.getTime();
        });
        const pastRides = rides.filter((ride) => {
          const rideDate = new Date(ride.date);
          return presentDate.getTime() >= rideDate.getTime();
        });
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

  showFilters = () => {
    document.getElementById("myDropdown").classList.toggle("show");
  };

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
        />
      </div>
    );
  }
}

export default App;
