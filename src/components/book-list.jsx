import React, { useState } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries";
import BookDetails from "./book-details";

const isLoading = loading => loading;

const displayBooks = (books, updateSelectedBook) =>
  books.map(book => (
    <li onClick={e => updateSelectedBook(book.id)} key={book.id}>
      {book.name}
    </li>
  ));

const displayLoading = () => <div>Loading...</div>;

const renderBookList = (data, updateSelectedBook) =>
  isLoading(data.loading)
    ? displayLoading()
    : displayBooks(data.books, updateSelectedBook);

const BookList = props => {
  const [selectedBookID, setSelectedBookID] = useState(null);

  return (
    <div>
      <ul id="book-list">{renderBookList(props.data, setSelectedBookID)}</ul>
      <BookDetails bookID={selectedBookID} />
    </div>
  );
};
export default graphql(getBooksQuery)(BookList);
