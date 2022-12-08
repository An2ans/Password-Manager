import React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import ModalShow from "../modals/modal-show";
import ModalEdit from "../modals/modal-edit";

const managerCard = ({ userId, id, name, url }) => {
  return (
    <div className="card-container">
      <h2>{name}</h2>
      <a href={url}>
        <p>{url}</p>
      </a>
      <ModalShow userId={userId} credId={id} name={name} url={url} />
      {/* <ModalEdit /> */}
    </div>
  );
};

export default managerCard;
