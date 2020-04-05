import React from "react";
import MainNav from "../navigation/MainNav";

const StatsHeader = props => {
  let classes;
  const { login, siteName, statsButtonText, title, subtitle, clicked } = props;
  login ? (classes = "hero is-warning") : (classes = "hero is-danger is-large");
  return (
    <section className={classes}>
      <div className="hero-head has-background-white">
        <div className="container">
          <MainNav
            siteName={siteName}
            statsButtonText={statsButtonText}
            clicked={clicked}
          />
        </div>
      </div>
      <div className="hero-body">
        <div className="container">
          <h2 className="title">{title}</h2>
          <h3 className="subtitle">{subtitle}</h3>
        </div>
      </div>
    </section>
  );
};

export default StatsHeader;
