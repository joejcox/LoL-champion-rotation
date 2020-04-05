import React from "react";
import MainNav from "../elements/navigation/MainNav";

const PageNoExist = props => {
  return (
    <>
      <div className="container">
        <MainNav siteName={props.siteName} />
      </div>
      <section className="section is-medium has-text-centered">
        <h2 className="title is-1">404</h2>
        <h3 className="subtitle is-3">Page does not exist</h3>
      </section>
    </>
  );
};

export default PageNoExist;
