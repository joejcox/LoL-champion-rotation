import React from "react";

const ChampionModal = (props) => {
  let modalClass = "modal";
  if (props.isOpen) {
    if (props.modalId === `${props.name}${props.id}`) {
      modalClass = "modal is-active";
    } else {
      modalClass = "modal";
    }
  }

  return (
    <div className={modalClass}>
      <div className="modal-background" onClick={props.clicked}></div>
      <div className="modal-content is-clipped has-background-white">
        <article className="media">
          <figure className="media-left">
            <p className="image is-96x96">
              <img
                className="image"
                src={`http://ddragon.leagueoflegends.com/cdn/10.7.1/img/champion/${props.image}`}
                alt={props.name}
              />
            </p>
          </figure>
          <div className="media-content is-clipped">
            <div className="content">
              <h3 className="title is-size-5-mobile is-size-4-tablet">
                {props.name}
              </h3>
              <h4 className="subtitle is-size-6-mobile is-size-6-tablet is-size-5-desktop">
                {props.title}
              </h4>
              <div className="tags">
                {props.tags.map((tag) => {
                  return (
                    <span key={`${props.id}${tag}`} className="tag is-warning">
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
              <p dangerouslySetInnerHTML={{ __html: props.description }}></p>
            </div>
          </div>
        </article>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={props.clicked}></button>
      </div>
    </div>
  );
};

export default ChampionModal;
