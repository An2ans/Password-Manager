import { Box, Alert, TextField } from "@mui/material";
import React, { Component, useEffect } from "react";
import { redirect } from "react-router-dom";
import axios from "axios";
import ModalAdd from "../modals/modal-add";

import SearchBar from "../other/SearchBar";

import Credentials from "./Credentials";

import "../../styles/manager.css";

class Manager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: null,
      session: null,
      credentials: [],
      search: [],
    };
    this.getCredentials = this.getCredentials.bind(this);
    this.addNewCredentials = this.addNewCredentials.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.listCredentials = this.listCredentials.bind(this);
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

  handleSearch = (search) => {
    // const search = this.state.searchInput;

    // e.preventDefault();

    // this.setState({ searchInput: e.target.value });

    console.log({ search });

    if (!search) {
      this.setState({ search: [] });
    }
    if (search.length > 0) {
      const searchResults = this.state.credentials.filter((cred) => {
        return cred.name.toLowerCase().includes(search);
      });
      this.setState({ search: searchResults });
    }
  };

  listCredentials = (list) => {
    if (list.length > 0) {
      return list.map((cred) => {
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
      });
    } else {
      return <h2 className="no-found">No found credentials </h2>;
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value.toLowerCase();
    this.setState({ searchInput: value }, () => {
      this.handleSearch(this.state.searchInput);
    });
  };

  render() {
    const { credentials, info, session, search } = this.state;

    if (session) {
      return (
        <div className="manager-page">
          {/* info to be replaced by modalinfo */}
          {info && <Alert severity={info.severity}>{info.message}</Alert>}

          {/* Search bar to filter credentials */}
          <SearchBar handleSearch={this.handleSearch} />

          <ModalAdd
            userId={this.state.session.userId}
            addNewCredentials={this.addNewCredentials}
          />

          {search.length > 0
            ? this.listCredentials(search)
            : this.listCredentials(credentials)}

          {/* {credentials.length > 0 ? (
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
            <h2>No found credentials </h2>
          )} */}
        </div>
      );
    }
  }
}

export default Manager;
