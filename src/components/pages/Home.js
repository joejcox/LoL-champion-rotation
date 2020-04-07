import React, { Component } from "react";
import gsap from "gsap";
import HomeHeader from "../elements/headers/HomeHeader";
import Modal from "../elements/modals/ChampionModal";
// import { Link } from "react-router-dom";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super();
    this.toggleInfo = this.toggleInfo.bind(this);
    this.state = {
      modalIsOpen: false,
      modalId: null,
    };
  }
  componentDidMount() {
    const tl = gsap.timeline();

    tl.fromTo(
      ".hero-body .title",
      0.4,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        ease: "Power2.easeOut",
      }
    ).fromTo(
      ".hero-body .subtitle",
      0.4,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        ease: "Power2.easeOut",
      },
      0.2
    );
  }

  toggleInfo(name, key) {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
      modalId: `${name}${key}`,
    });
  }

  getCurrentRotation(key, name, title, img, tags, description) {
    return (
      <div
        key={key}
        className="column is-half-mobile is-one-quarter-tablet is-one-fifth-desktop has-text-centered"
        onClick={() => this.toggleInfo(name, key)}>
        <div className="wrap">
          <img
            className="image"
            src={`http://ddragon.leagueoflegends.com/cdn/10.7.1/img/champion/${img}`}
            alt={name}
          />
          <h3 className="title is-size-5-mobile is-size-4-tablet">{name}</h3>
          <h4 className="subtitle is-size-6-mobile is-size-6-tablet is-size-5-desktop">
            {title}
          </h4>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          modalId={this.state.modalId}
          id={key}
          name={name}
          title={title}
          image={img}
          tags={tags}
          description={description}
        />
      </div>
    );
  }

  render() {
    let loading;
    const champions = [];
    const rotation = [];
    Object.keys(this.props.champions).forEach((key) => {
      return champions.push(this.props.champions[key]);
    });

    this.props.rotation.forEach((id) => {
      champions.forEach((data) => {
        if (id === parseInt(data.key)) {
          rotation.push(data);
        }
      });
    });
    this.props.loading
      ? (loading = rotation.map((result) => {
          return this.getCurrentRotation(
            result.key,
            result.name,
            result.title,
            result.image.full,
            result.tags,
            result.blurb
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
            <div className="columns is-mobile is-multiline no-margin">
              {loading}
            </div>
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
