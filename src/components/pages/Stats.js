import React, { Component } from "react";
import gsap from "gsap";
// import DefaultHeader from "../elements/headers/DefaultHeader";
import StatsHeader from "../elements/headers/StatsHeader";
import "./Stats.css";

class Stats extends Component {
  constructor(props) {
    super();
    this.state = {
      isLoaded: false,
      results: []
    };
  }
  componentDidMount() {
    const tl = gsap.timeline();

    tl.fromTo(
      ".hero-body .title",
      0.4,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        ease: "Power2.easeOut"
      }
    ).fromTo(
      ".hero-body .subtitle",
      0.4,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        ease: "Power2.easeOut"
      },
      0.2
    );

    const cors = "https://cors-anywhere.herokuapp.com/";
    const apiKey = "RGAPI-8bdd7079-c251-41c6-aa0a-5e68ba954df2";

    const urls = [
      `${cors}https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations/`,
      `${cors}http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json`
    ];
    const options = {
      method: "GET",
      headers: new Headers({
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8,la;q=0.7",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "content-type": "application/json",
        "X-Riot-Token": apiKey
      })
    };

    Promise.all([fetch(urls[0], options), fetch(urls[1], options)])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(
        ([data1, data2]) => {
          const champId = data1.freeChampionIds;
          const champData = data2.data;

          const champions = [];

          Object.keys(champData).forEach(function(key) {
            return champions.push(champData[key]);
          });

          const rotation = [];
          champId.forEach(id => {
            champions.forEach(data => {
              if (id === parseInt(data.key)) {
                rotation.push(data);
              }
            });
          });

          this.setState({
            isLoaded: true,
            results: rotation
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  componentDidUpdate() {
    const tl = gsap.timeline();

    tl.fromTo(
      ".column",
      0.4,
      {
        opacity: 0,
        y: 40
      },
      { opacity: 1, y: 0, stagger: 0.1, ease: "Power2.easeOut" }
    );
  }

  getCurrentRotation(key, name, title, img) {
    return (
      <div key={key} className="column is-one-third result-col">
        <div className="wrap">
          <img
            className="image"
            src={`http://ddragon.leagueoflegends.com/cdn/10.7.1/img/champion/${img}`}
            alt={name}
          />
          <h3 className="title is-4">{name}</h3>
          <h4 className="subtitle is-6">{title}</h4>
          <button className="button is-warning is-small">View more</button>
        </div>
      </div>
    );
  }

  render() {
    const { siteName, statsButtonText, login } = this.props;
    let isLoggedIn;
    login
      ? (isLoggedIn = (
          <StatsHeader
            siteName={siteName}
            title="Statistics"
            subtitle="View your League of Legends statistics"
            statsButtonText={statsButtonText}
            login={login}
          />
        ))
      : (isLoggedIn = (
          <>
            <StatsHeader
              siteName={siteName}
              statsButtonText={statsButtonText}
              title="Unauthorised Access"
              subtitle="Please login to view this page"
              login={login}
            />
          </>
        ));

    const results = this.state.isLoaded
      ? this.state.results.map(result => {
          return this.getCurrentRotation(
            result.key,
            result.name,
            result.title,
            result.image.full
          );
        })
      : null;
    return (
      <>
        {isLoggedIn}
        <section className="section">
          <div className="container">
            <div className="columns is-multiline">{results}</div>
          </div>
        </section>
      </>
    );
  }
}

// class Stats extends Component {
//   constructor(props) {
//     super();
//     this.state = {
//       results: [
//         { id: 1, title: "Title 1", subtitle: "Subtitle item 1" },
//         { id: 2, title: "Title 2", subtitle: "Subtitle item 2" },
//         { id: 3, title: "Title 3", subtitle: "Subtitle item 3" },
//         { id: 4, title: "Title 4", subtitle: "Subtitle item 4" },
//         { id: 5, title: "Title 5", subtitle: "Subtitle item 5" },
//         { id: 6, title: "Title 6", subtitle: "Subtitle item 6" },
//         { id: 7, title: "Title 7", subtitle: "Subtitle item 7" },
//         { id: 8, title: "Title 8", subtitle: "Subtitle item 8" },
//         { id: 9, title: "Title 9", subtitle: "Subtitle item 9" }
//       ]
//     };
//   }
//   componentDidMount() {
//     const tl = gsap.timeline();

//     tl.fromTo(
//       ".hero-body .title",
//       0.4,
//       {
//         opacity: 0,
//         y: 20
//       },
//       {
//         opacity: 1,
//         y: 0,
//         ease: "Power2.easeOut"
//       }
//     )
//       .fromTo(
//         ".hero-body .subtitle",
//         0.4,
//         {
//           opacity: 0,
//           y: 20
//         },
//         {
//           opacity: 1,
//           y: 0,
//           ease: "Power2.easeOut"
//         },
//         0.2
//       )
//       .fromTo(
//         ".column",
//         0.4,
//         {
//           opacity: 0,
//           y: 40
//         },
//         { opacity: 1, y: 0, stagger: 0.1, ease: "Power2.easeOut" }
//       );
//   }

//   render() {
//     let isLoggedIn;
//     this.props.login
//       ? (isLoggedIn = (
//           <StatsHeader
//             siteName={this.props.siteName}
//             title="Statistics"
//             subtitle="View your League of Legends statistics"
//             statsButtonText={this.props.statsButtonText}
//             login={this.props.login}
//           />
//         ))
//       : (isLoggedIn = (
//           <>
//             <StatsHeader
//               siteName={this.props.siteName}
//               statsButtonText={this.props.statsButtonText}
//               title="Unauthorised Access"
//               subtitle="Please login to view this page"
//               login={this.props.login}
//             />
//           </>
//         ));

//     const results = this.state.results.map(result => {
//       return (
//         <div key={result.id} className="column is-one-third result-col">
//           <div className="wrap">
//             <h3 className="title is-4">{result.title}</h3>
//             <h4 className="subtitle is-6">{result.subtitle}</h4>
//             <button className="button is-warning is-small">View more</button>
//           </div>
//         </div>
//       );
//     });
//     return (
//       <>
//         {isLoggedIn}
//         <section className="section">
//           <div className="container">
//             <div className="columns is-multiline">{results}</div>
//           </div>
//         </section>
//       </>
//     );
//   }
// }

export default Stats;
