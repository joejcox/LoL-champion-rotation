import React from "react";

const ChampInfo = (props) => {
  let content;
  if (props.readMore) {
    content = <p className="content is-medium">{props.children}</p>;
  }
  return <>{content}</>;
};

export default ChampInfo;
