import { Box, Alert } from "@mui/material";
import React, { Component, useEffect } from "react";
import { redirect } from "react-router-dom";
import axios from "axios";
import ModalAdd from "../modals/modal-add";

import Credentials from "./Credentials";

import "../../styles/manager.css";

class Manager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: null,
      session: null,
      credentials: [],
    };
    this.getCredentials = this.getCredentials.bind(this);
    this.addNewCredentials = this.addNewCredentials.bind(this);
  }

  componentDidMount() {
    const session = JSON.parse(localStorage.getItem("session"));
    if (!session) {
      redirect("/log-in");
    } else {
      this.setState({ session: session });
      this.getCredentials(session.userId);
    }
  }

  // Get the credentials when component mount
  getCredentials = (userId) => {
    axios
      .get(`http://localhost:3001/credentials/${userId}`)
      .then((res) => {
        this.setState({ credentials: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Add new credentials. It is passed to ModalAdd component where the new credentials are created.
  addNewCredentials = (newCredentials, userId) => {
    axios
      .post(`http://localhost:3001/credentials/${userId}`, newCredentials)
      .then((res) => {
        if (res.data.success === true) {
          // window.location.reload();

          this.setState({
            info: {
              message: "New credentials successfully added",
              severity: "success",
            },
          });

          this.getCredentials(userId);
        }
      })
      .catch((error) => {
        this.setState({
          info: {
            message: `There was an error while creating the new credentials: ${error}`,
            severity: "error",
          },
        });
      });
  };

  render() {
    const credentials = this.state.credentials;
    const info = this.state.info;

    return (
      <div className="manager-page">
        {info && <Alert severity={info.severity}>{info.message}</Alert>}

        {credentials.length > 1 ? (
          credentials.map((cred) => {
            const id = cred.credentials_id;
            const { name, url } = cred;
            return (
              <Credentials
                userId={this.state.session.userId}
                key={id}
                id={id}
                name={name}
                url={url}
              />
            );
          })
        ) : (
          <h2>No credentials found</h2>
        )}
        {this.state.session && (
          <ModalAdd
            userId={this.state.session.userId}
            addNewCredentials={this.addNewCredentials}
          />
        )}
      </div>
    );
  }
}

export default Manager;

// const ManagerPage = () => {

//   useEffect(() => {
//     getCredentials(1).then((response) => {
//       setCredentials(response.data);
//     });
//   }, [credentials]);

//   return (
//     <div className="manager-container">
//       <ModalInfo message={message || ""} />
//       <table className="table">
//         <thead>
//           <tr>
//             <th className="name">Password Name</th>
//             <th className="credentials">Show credentials</th>
//             <th className="edit">Edit Password</th>
//           </tr>
//         </thead>
//         <tbody>
//           {credentials.map((pass) => {
//             return (
//               <PasswordCard
//                 key={pass.id}
//                 passId={pass.id}
//                 passName={pass.name}
//                 passUrl={pass.url}
//               />
//             );
//           })}
//         </tbody>
//       </table>
//       <ModalAdd />
//     </div>
//   );
// };
