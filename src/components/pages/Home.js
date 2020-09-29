import React, { Component } from "react";
import gsap from "gsap";
import HomeHeader from "../elements/headers/HomeHeader";
import Modal from "../elements/modals/ChampionModal";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
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
      modalIsOpen: true,
      modalId: `${name}${key}`,
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
    });
  }

  getCurrentRotation(id, key, name, title, img, tags, description, info) {
    const { modalIsOpen, modalId } = this.state;
    return (
      <React.Fragment key={`${name}${key}`}>
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
        </div>
        <Modal
          champId={id}
          isOpen={modalIsOpen}
          modalId={modalId}
          key={`${name}${key}${title}`}
          id={key}
          name={name}
          title={title}
          image={img}
          tags={tags}
          description={description}
          clicked={() => this.closeModal()}
          apiKey={this.props.apiKey}
          info={info}
        />
      </React.Fragment>
    );
  }

  render() {
    const {
      siteName,
      title,
      subtitle,
      statsButtonText,
      clicked,
      isLoggedIn,
      champions,
      isLoading,
    } = this.props;

    let loading;
    const champs = [];
    const rotation = [];
    Object.keys(champions).forEach((key) => {
      return champs.push(champions[key]);
    });

    this.props.rotation.forEach((id) => {
      champs.forEach((data) => {
        if (id === parseInt(data.key)) {
          rotation.push(data);
        }
      });
    });

    this.props.loading
      ? (loading = rotation.map(
          ({ id, key, name, title, tags, blurb, info, image: { full } }) => {
            return this.getCurrentRotation(
              id,
              key,
              name,
              title,
              full,
              tags,
              blurb,
              info
            );
          }
        ))
      : (loading = "Loading Data");

    let fetching;
    isLoading
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
          siteName={siteName}
          title={title}
          subtitle={subtitle}
          statsButtonText={statsButtonText}
          clicked={clicked}
          isLoggedIn={isLoggedIn}
        />

        <section className="section" id="champion-rotation">
          <div className="container">{fetching}</div>
        </section>
      </div>
    );
  }
}

export default Home;
