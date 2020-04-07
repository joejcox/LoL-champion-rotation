import React, { Component } from "react";
import "./ChampionModal.css";
// import ChampInfo from "./ChampInfo";

class ChampionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      champInfo: [],
      readMore: false,
    };
  }

  // componentDidUpdate() {
  //   if (this.props.modalIsOpen === true) {
  //     this.setState({
  //       readMore: false,
  //     });
  //   }
  // }

  fetchInfo(championName) {
    const options = {
      method: "GET",
      cache: "force-cache",
      headers: new Headers({
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8,la;q=0.7",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "content-type": "application/json",
        "X-Riot-Token": this.props.apiKey,
      }),
    };

    fetch(
      `https://cors-anywhere.herokuapp.com/http://ddragon.leagueoflegends.com/cdn/10.7.1/data/en_US/champion/${championName}.json`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        // First Check if the data exists in state - if not then push to champ info and set state
        this.setState({
          champInfo: data.data,
          readMore: true,
        });
      });
  }

  render() {
    let modalClass = "modal";
    if (this.props.isOpen) {
      if (this.props.modalId === `${this.props.name}${this.props.id}`) {
        modalClass = "modal is-active";
      } else {
        modalClass = "modal";
      }
    }

    // const theChamp = this.props.champId;
    // let champLore;
    // if (this.state.readMore === true) {
    //   console.log(this.state.champInfo[this.props.champId]);
    //   champLore = this.state.champInfo[theChamp].lore;
    // } else {
    //   champLore = "Hello my dear";
    // }
    let champInfo;
    if (this.state.readMore === true) {
      const champ = this.props.champId;
      champInfo = (
        <p className="content is-medium">{this.state.champInfo[champ].lore}</p>
      );
    } else {
      champInfo = (
        <>
          <p
            className="is-inline"
            dangerouslySetInnerHTML={{
              __html: this.props.description,
            }}></p>
          <button
            className="button more-info"
            onClick={() => this.fetchInfo(this.props.champId)}>
            {" "}
            Read more
          </button>
        </>
      );
    }

    return (
      <div className={modalClass}>
        <div className="modal-background" onClick={this.props.clicked}></div>
        <div className="modal-content is-clipped has-background-white">
          <article className="media">
            <figure className="media-left">
              <p className="image is-96x96">
                <img
                  className="image"
                  src={`http://ddragon.leagueoflegends.com/cdn/10.7.1/img/champion/${this.props.image}`}
                  alt={this.props.name}
                />
              </p>
            </figure>
            <div className="media-content is-clipped">
              <div className="content">
                <h3 className="title is-size-5-mobile is-size-4-tablet">
                  {this.props.name}
                </h3>
                <h4 className="subtitle is-size-6-mobile is-size-6-tablet is-size-5-desktop">
                  {this.props.title}
                </h4>
                <div className="tags">
                  {this.props.tags.map((tag) => {
                    return (
                      <span
                        key={`${this.props.id}${tag}`}
                        className="tag is-warning">
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </article>
          <article className="media">
            <div className="media-content">
              <div className="content">
                {/* <ChampInfo
                  readMore={this.state.readMore}
                  champId={this.props.champId}
                  champLore={champLore}
                  description={this.props.description}
                  clicked={() => this.fetchInfo(this.props.champId)}
                /> */}
                {champInfo}
              </div>
            </div>
          </article>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={this.props.clicked}></button>
        </div>
      </div>
    );
  }
}

export default ChampionModal;
