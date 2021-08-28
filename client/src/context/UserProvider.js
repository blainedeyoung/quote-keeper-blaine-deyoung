//if this were much bigger, I'd break into two providers but it's manageable

import React, { Component } from "react";
import axios from "axios";

const UserContext = React.createContext();
const quoteAxios = axios.create();

// Adds the JSON web token to the Authorization header on all outgoing requests when using 'quoteAxios'
quoteAxios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

class UserProvider extends Component {
  constructor() {
    super();
    this.state = {
      user: JSON.parse(sessionStorage.getItem("user")) || {},
      token: sessionStorage.getItem("token") || "",
      quotes: [],
      authErr: "",
    };
  }

  //authorization functions
  signup = (credentials) => {
    axios
      .post(`/auth/signup`, credentials)
      .then((res) => {
        const { user, token } = res.data;
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("token", token);
        this.setState({ user, token });
      })
      .catch((err) => this.handleAuthErr(err));
  };

  login = (credentials) => {
    axios
      .post(`/auth/login`, credentials)
      .then((res) => {
        const { user, token } = res.data;
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("token", token);
        this.setState({ user, token });
      })
      .catch((err) => this.handleAuthErr(err));
  };

  logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    this.setState({ user: {}, token: "", quotes: [] });
  };

  handleAuthErr = (err) => {
    this.setState({
      authErr: err.response.data.errMsg,
    });
  };

  //quote functions
  addQuote = (newQuote) => {
    if (
      newQuote.permissions !== "public" &&
      newQuote.permissions !== "private"
    ) {
      alert("the permissions field must be set to 'public' or 'private'");
    } else
      quoteAxios
        .post(`/api/quote`, newQuote)
        .then((res) => {
          this.setState((prevState) => ({
            quotes: [...prevState.quotes, res.data],
          }));
        })
        .catch((err) => console.log(err.response.data.errMsg));
  };

  getUserQuotes = () => {
    quoteAxios
      .get(`/api/quote/user`)
      .then((res) => {
        this.setState({ quotes: res.data });
      })
      .catch((err) => console.log(err.response.data.errMsg));
  };

  getAllQuotes = () => {
    quoteAxios
      .get(`/api/quote/`)
      .then((res) => {
        this.setState({ quotes: res.data });
      })
      .catch((err) => console.log(err.response.data.errMsg));
  };

  deleteQuote = (id) => {
    quoteAxios
      .delete(`/api/quote/${id}`)
      .then((res) => {
        this.setState((prevState) => ({
          quotes: prevState.quotes.filter((quote) => quote._id !== id),
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  };

  getOneQuote = (id) => {
    return this.state.quotes.find((quote) => quote._id === id);
  };

  editQuote = (id, updates) => {
    quoteAxios
      .put(`/api/quote/${id}`, updates)
      .then((res) => {
        this.setState((prevState) => ({
          quotes: prevState.quotes.map((quote) =>
            quote._id === id ? res.data : quote
          ),
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          signup: this.signup,
          login: this.login,
          logout: this.logout,
          addQuote: this.addQuote,
          getUserQuotes: this.getUserQuotes,
          getAllQuotes: this.getAllQuotes,
          deleteQuote: this.deleteQuote,
          getOneQuote: this.getOneQuote,
          editQuote: this.editQuote,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;

//high-order component allows consumption of context without wrapping every component in tags
export const withUser = (C) => (props) =>
  (
    <UserContext.Consumer>
      {(value) => <C {...value} {...props} />}
    </UserContext.Consumer>
  );
