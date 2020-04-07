import React from "react";

const ChampInfo = (props) => {
  // this.state.readMore - props.readMore
  // this.props.champId - props.champId
  // this.state.champInfo[champ].lore - props.champLore
  // this.props.description - props.description
  // this.props.champId - props.champId
  let champInfo;
  if (props.readMore === true) {
    // const champ = props.champId;
    champInfo = <p className="content is-medium">{props.champLore}</p>;
  } else {
    champInfo = (
      <>
        <p
          className="is-inline"
          dangerouslySetInnerHTML={{
            __html: props.description,
          }}></p>
        <button className="button more-info" onClick={props.clicked}>
          {" "}
          Read more
        </button>
      </>
    );
  }

  return { champInfo };
};

export default ChampInfo;
