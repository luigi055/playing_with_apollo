import { gql } from "apollo-boost";

export const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

export const getAuthorQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

export const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorID: ID!) {
    addBook(name: $name, genre: $genre, author_id: $authorID) {
      name
      id
    }
  }
`;
