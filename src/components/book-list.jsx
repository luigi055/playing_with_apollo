import React from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries";

const isLoading = loading => loading;

const displayBooks = books =>
  books.map(book => <li key={book.id}>{book.name}</li>);

const displayLoading = () => <div>Loading...</div>;

const renderBookList = data =>
  isLoading(data.loading) ? displayLoading() : displayBooks(data.books);

const BookList = props => (
  <div>
    <ul id="book-list">{renderBookList(props.data)}</ul>
  </div>
);

export default graphql(getBooksQuery)(BookList);
