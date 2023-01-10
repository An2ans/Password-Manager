import { Alert } from "@mui/material";
import React, { Component } from "react";
import { redirect } from "react-router-dom";
import axios from "axios";
import ModalAdd from "../modals/modal-add";
import ModalAlert from "../modals/modal-alert";

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
    this.deleteCredentials = this.deleteCredentials.bind(this);
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
        if (res.data.success) {
          this.setState({
            credentials: res.data.results,
          });
        } else {
          this.setState({
            info: { category: "error", message: res.data.message },
          });
        }
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
              message: res.data.message,
              category: "success",
            },
          });

          this.getCredentials(userId);
        } else {
          this.setState({
            info: {
              message: res.data.message,
              severity: "error",
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteCredentials = (userId, credId) => {
    axios
      .delete(`http://localhost:3001/credentials/${userId}/${credId}`)
      .then((res) => {
        if (res.data.success === true) {
          this.setState({
            info: { category: "success", message: res.data.message },
          });
          window.location.reload();
        } else {
          this.setState({
            info: { category: "error", message: res.data.message },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleSearch = (search) => {
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
            deleteCredentials={this.deleteCredentials}
          />
        );
      });
    } else {
      return <h2 className="no-found">No found credentials </h2>;
    }
  };

  render() {
    const { credentials, info, session, search } = this.state;

    if (session) {
      return (
        <div className="manager-page">
          {/* info to be replaced by modalinfo */}
          {info && <ModalAdd category={info.category} message={info.message} />}

          <div className="top">
            <ModalAdd
              userId={this.state.session.userId}
              addNewCredentials={this.addNewCredentials}
            />
            {/* Search bar to filter credentials */}
            <SearchBar handleSearch={this.handleSearch} />
          </div>

          {search.length > 0
            ? this.listCredentials(search)
            : this.listCredentials(credentials)}
        </div>
      );
    }
  }
}

export default Manager;
