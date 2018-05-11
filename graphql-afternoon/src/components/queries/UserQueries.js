import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

export const GET_USERS = gql`
  {
    users {
      id
      username
      password
    }
  }
`;

export default class UserQuery extends Component {
  render() {
    return (
      <Query query={GET_USERS}>
        {(loading, err, data) => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (err) {
            return <div>Error :(</div>;
          }
          return <div>{this.props.render(data)}</div>;
        }}
      </Query>
    );
  }
}
