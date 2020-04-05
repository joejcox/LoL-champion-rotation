import React, { Component } from "react";
import "./App.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import PageNoExist from "./components/pages/PageNoExist";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteName: "LoLStats",
      login: false,
      rotationIds: [],
      champions: [],
      cors: "https://cors-anywhere.herokuapp.com/",
      apiKey: "RGAPI-1e141e7f-8636-4fcc-b8cb-5bfd8336510c",
      siteInfo: {
        title: "League Rotation",
        subtitle: "Find the latest champion rotation"
      }
    };
  }

  componentDidMount() {
    const rotationSave = JSON.parse(localStorage.getItem("rotation"));
    const championsSave = JSON.parse(localStorage.getItem("champions"));
    const date = new Date().getDay();
    if (rotationSave && championsSave && date !== 3) {
      console.log("loading from saved data");
      this.setState({
        dataStored: true,
        rotationIds: rotationSave.freeChampionIds,
        champions: championsSave.data
      });
    } else {
      console.log("Need to fetch");
      const urls = [
        `https://cors-anywhere.herokuapp.com/https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations/`,
        `https://cors-anywhere.herokuapp.com/http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json`
      ];

      const options = {
        method: "GET",
        cache: "force-cache",
        headers: new Headers({
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
          "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8,la;q=0.7",
          "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
          "content-type": "application/json",
          "X-Riot-Token": this.state.apiKey
        })
      };
      console.log("fetching");
      // Fetch from endpoints
      this.isLoading(true);
      Promise.all([fetch(urls[0], options), fetch(urls[1], options)])
        .catch(err => {
          console.log(err);
        })
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([rotation, champions]) => {
          this.isLoading(false);
          this.setState({
            rotationIds: rotation.freeChampionIds,
            champions: champions.data
          });

          localStorage.setItem("rotation", JSON.stringify(rotation));
          localStorage.setItem("champions", JSON.stringify(champions));
        })
        .catch(err => {
          console.log(err);
        });

      this.setState({ dataStored: true });
    }
  }

  isLoading(bool) {
    this.setState({ isLoading: bool });
  }

  render() {
    let loginText;
    this.state.login
      ? (loginText = (
          <div className="buttons">
            <Link
              className="button is-outlined"
              onClick={() => this.setState({ login: false })}
              to="/"
            >
              Log Out
            </Link>
          </div>
        ))
      : (loginText = (
          <Link
            className="button is-warning"
            to="/stats"
            onClick={() => this.setState({ login: true })}
          >
            <strong>Log In</strong>
          </Link>
        ));

    const { title, subtitle } = this.state.siteInfo;
    console.log();
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Home
                {...props}
                siteName={this.state.siteName}
                title={title}
                subtitle={subtitle}
                loading={this.state.dataStored}
                rotation={this.state.rotationIds}
                champions={this.state.champions}
                statsButtonText={loginText}
                isAuthed={true}
                isLoading={this.state.isLoading}
                isLoggedIn={this.state.login}
                apiKey={this.state.apiKey}
                clicked={() => this.setState({ login: !this.state.login })}
              />
            )}
          />
          <Route
            exact
            path="/about"
            render={props => (
              <About
                {...props}
                siteName={this.state.siteName}
                statsButtonText={loginText}
                isAuthed={true}
              />
            )}
          />
          <Route
            render={props => (
              <PageNoExist {...props} siteName={this.state.siteName} />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
