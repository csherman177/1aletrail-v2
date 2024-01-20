import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Must match the server code.
// " mutation add profile" is the function name.
// the second "addUser" is named from the server side code name.
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($text: String!, $breweryId: ID!, $breweryName: String!) {
    addComment(text: $text, breweryId: $breweryId, breweryName: $breweryName) {
      _id
      text
      breweryId
      breweryName
      user
    }
  }
`;
