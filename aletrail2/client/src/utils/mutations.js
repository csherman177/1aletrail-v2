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
  mutation addComment($text: String!, $breweryId: String!, $breweryName: String!) {
    addComment(text: $text, breweryId: $breweryId, breweryName: $breweryName) {
      _id
      text
      breweryId
      breweryName
      user
      createdAt
    }
  }
`;
