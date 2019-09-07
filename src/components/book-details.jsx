import React from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries";

const composeBookDetails = book => (
  <div>
    <h2>{book.name}</h2>
    <p>{book.genre}</p>
    <p>{book.author.name}</p>
    <p>All books by this author:</p>
    <ul className="other-books">
      {book.author.books.map(book => (
        <li key={book.id}>{book.name}</li>
      ))}
    </ul>
  </div>
);

const DisplayBookDetails = ({ book }) =>
  book ? composeBookDetails(book) : <p>Select a Book</p>;

const BookDetails = ({ bookID, data: { book } }) => (
  <div id="book-details">
    <DisplayBookDetails book={book} />
  </div>
);

export default graphql(getBookQuery, {
  options: props => ({
    variables: {
      id: props.bookID
    }
  })
})(BookDetails);
