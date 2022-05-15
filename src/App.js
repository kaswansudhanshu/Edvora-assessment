import React from "react";
import { Header } from "./Header";
import { Main } from "./Main";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: "",
      rides: "",
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  componentDidUpdate() {
    console.log(this.state);
  }
  getUserData = () => {
    fetch("https://assessment.api.vweb.app/user")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          user: data,
        });
      });
    fetch("https://assessment.api.vweb.app/rides")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          rides: data,
        });
      });
  };

  render() {
    const { user, rides } = this.state;
    return (
      <div className="App">
        <Header user={user} />
        <Main rides={rides} />
      </div>
    );
  }
}

export default App;
