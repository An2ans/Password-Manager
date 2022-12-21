import React from "react";

import ModalShow from "../modals/modal-show";
import ModalEdit from "../modals/modal-edit";
import ModalDelete from "../modals/modal-delete";

const Credentials = ({ userId, id, name, url }) => {
  return (
    <div className="card-container">
      <div className="credentials">
        <h2 className="name">{name}</h2>
        <a href={url}>
          <p className="url">{url}</p>
        </a>
      </div>
      <div className="buttons">
        <ModalShow userId={userId} credId={id} name={name} url={url} />
        <ModalEdit userId={userId} credId={id} name={name} url={url} />
        <ModalDelete userId={userId} credId={id} name={name} url={url} />
      </div>
    </div>
  );
};

export default Credentials;
