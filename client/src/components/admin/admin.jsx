import React from "react";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

import "../../styles/admin.css";

const AdminTable = () => {
  const [credentials, setCredentials] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (credentials.length < 1) {
      axios
        .get("http://localhost:3001/credentials/")
        .then((res) => {
          setCredentials(res.data);
        })
        .catch((err) => {
          if (err) {
            console.log("Error while fetching credentials", err);
          }
        });
    }
    if (users.length < 1) {
      axios
        .get("http://localhost:3001/user/")
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => {
          if (err) {
            console.log("Error while fetching users");
          }
        });
    }
  }, []);

  return (
    <div className="admin-table">
      <Box>
        <h2>Users list</h2>
        {users.length > 0 ? (
          users.map((user) => {
            return (
              <div key={user.user_id} className="user-card">
                <p>User ID: {user.user_id}</p>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
              </div>
            );
          })
        ) : (
          <p>No users found</p>
        )}
      </Box>

      <Box>
        <h2>Credentials list</h2>
        {credentials.length > 0 ? (
          credentials.map((credential) => {
            return (
              <div key={credential.credentials_id} className="credential-card">
                <p>Credential ID: {credential.credentials_id}</p>
                <p>Name: {credential.name}</p>
                <p>URL: {credential.url}</p>
              </div>
            );
          })
        ) : (
          <p>No users found</p>
        )}
      </Box>
    </div>
  );
};

export default AdminTable;
