import React, { Component } from "react";
import "./App.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import PageNoExist from "./components/pages/PageNoExist";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  state = {
    siteName: "LoLStats",
    login: false,
    rotationIds: [],
    champions: [],
    cors: "https://cors-anywhere.herokuapp.com/",
    apiKey: process.env.REACT_APP_RIOT_API_KEY,
    siteInfo: {
      title: "League Rotation",
      subtitle: "Find the latest champion rotation",
    },
  };

  componentDidMount() {
    const urls = [
      `https://cors-anywhere.herokuapp.com/https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations`,
      `https://cors-anywhere.herokuapp.com/http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json`,
    ];

    const options = {
      method: "GET",
      headers: new Headers({
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8,la;q=0.7",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "content-type": "application/json",
        "X-Requested-With": "FetchAPI",
        "X-Riot-Token": this.state.apiKey,
      }),
    };
    this.isLoading(true);
    Promise.all([fetch(urls[0], options), fetch(urls[1], options)])
      .catch((err) => {
        console.log(err);
      })
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(async ([rotation, champions]) => {
        await this.isLoading(false);
        await this.setState({
          rotationIds: rotation.freeChampionIds,
          champions: champions.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({ dataStored: true });
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
              to="/">
              Log Out
            </Link>
          </div>
        ))
      : (loginText = (
          <Link
            className="button is-warning"
            to="/stats"
            onClick={() => this.setState({ login: true })}>
            <strong>Log In</strong>
          </Link>
        ));

    const { title, subtitle } = this.state.siteInfo;
    const {
      siteName,
      dataStored,
      rotationIds,
      champions,
      isLoading,
      login,
      apiKey,
    } = this.state;
    console.log();
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home
                siteName={siteName}
                title={title}
                subtitle={subtitle}
                loading={dataStored}
                rotation={rotationIds}
                champions={champions}
                statsButtonText={loginText}
                isAuthed={true}
                isLoading={isLoading}
                isLoggedIn={login}
                apiKey={apiKey}
                clicked={() => this.setState({ login: !login })}
              />
            )}
          />
          <Route
            exact
            path="/about"
            render={() => (
              <About
                siteName={siteName}
                statsButtonText={loginText}
                isAuthed={true}
              />
            )}
          />
          <Route render={() => <PageNoExist siteName={siteName} />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
