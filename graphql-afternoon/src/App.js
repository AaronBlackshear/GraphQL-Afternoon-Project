import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import UserQuery from "./components/queries/UserQueries";

const client = new ApolloClient({ uri: "http://localhost:3002/graphql" });

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <UserQuery render={'test'} />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
