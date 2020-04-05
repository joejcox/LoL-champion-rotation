import React, { Component } from "react";
import gsap from "gsap";
import HomeHeader from "../elements/headers/HomeHeader";
// import { Link } from "react-router-dom";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super();
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
  }

  componentDidUpdate() {
    const tl = gsap.timeline();

    tl.fromTo(
      ".column",
      0.8,
      {
        opacity: 0,
        y: 20
      },
      { opacity: 1, y: 0, stagger: 0.1, ease: "Power2.easeInOut" }
    );
  }

  getCurrentRotation(key, name, title, img) {
    return (
      <div key={key} className="column is-2 has-text-centered">
        <div className="wrap">
          <img
            className="image"
            src={`http://ddragon.leagueoflegends.com/cdn/10.7.1/img/champion/${img}`}
            alt={name}
          />
          <h3 className="title is-3">{name}</h3>
          <h4 className="subtitle is-6">{title}</h4>
        </div>
      </div>
    );
  }

  render() {
    let loading;
    const champions = [];
    const rotation = [];
    Object.keys(this.props.champions).forEach(key => {
      return champions.push(this.props.champions[key]);
    });

    this.props.rotation.forEach(id => {
      champions.forEach(data => {
        if (id === parseInt(data.key)) {
          rotation.push(data);
        }
      });
    });
    this.props.loading
      ? (loading = rotation.map(result => {
          return this.getCurrentRotation(
            result.key,
            result.name,
            result.title,
            result.image.full
          );
        }))
      : (loading = "Loading Data");

    let fetching;
    this.props.isLoading
      ? (fetching = (
          <h2 className="title is-1 has-text-centered">Loading...</h2>
        ))
      : (fetching = (
          <>
            <div className="columns is-multiline no-margin">{loading}</div>
          </>
        ));

    return (
      <div id="home-content">
        <HomeHeader
          siteName={this.props.siteName}
          title={this.props.title}
          subtitle={this.props.subtitle}
          statsButtonText={this.props.statsButtonText}
          clicked={this.props.clicked}
          isLoggedIn={this.props.isLoggedIn}
        />

        <section className="section" id="champion-rotation">
          <div className="container">{fetching}</div>
        </section>
      </div>
    );
  }
}

export default Home;
