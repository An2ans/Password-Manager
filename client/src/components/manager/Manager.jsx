import { Box } from "@mui/material";
import React, { Component, useEffect } from "react";
import { redirect } from "react-router-dom";
import axios from "axios";

import Card from "./Card";

class Manager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      session: null,
      credentials: [],
    };
    this.getCredentials = this.getCredentials.bind(this);
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
    axios.get(`http://localhost:3001/credentials/${userId}`).then((res) => {
      this.setState({ credentials: res.data });
    });
  };

  render() {
    const credentials = this.state.credentials;
    return (
      <Box textAlign="center">
        {credentials.length > 1 ? (
          credentials.map((cred) => {
            let { id, name, url } = cred;
            return <Card key={id} id={id} name={name} url={url} />;
          })
        ) : (
          <h2>No credentials found</h2>
        )}
      </Box>
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
