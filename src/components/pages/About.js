import React, { Component } from "react";
import gsap from "gsap";
import DefaultHeader from "../elements/headers/DefaultHeader";

class About extends Component {
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
  render() {
    return (
      <DefaultHeader
        siteName={this.props.siteName}
        title="About Page"
        subtitle="Here you can learn about us"
        statsButtonText={this.props.statsButtonText}
        clicked={this.props.clicked}
      />
    );
  }
}

export default About;
