import React from "react";
import MainNav from "../navigation/MainNav";

const DefaultHeader = props => {
  return (
    <section className="hero is-medium is-warning">
      <div className="hero-head has-background-white">
        <div className="container">
          <MainNav
            siteName={props.siteName}
            statsButtonText={props.statsButtonText}
            clicked={props.clicked}
          />
        </div>
      </div>
      <div className="hero-body">
        <div className="container">
          <h2 className="title">{props.title}</h2>
          <h3 className="subtitle">{props.subtitle}</h3>
        </div>
      </div>
    </section>
  );
};

export default DefaultHeader;
