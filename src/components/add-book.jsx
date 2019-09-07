import React, { useState } from "react";
import { graphql } from "react-apollo";
import compose from "lodash.flowright";
import { getAuthorQuery, addBookMutation, getBooksQuery } from "../queries";

const displayAuthors = authors =>
  authors.map(author => (
    <option value={author.id} key={author.id}>
      {author.name}
    </option>
  ));

const displayLoading = () => <option>Loading...</option>;

const renderAuthorList = (authors, isLoading) =>
  isLoading ? displayLoading() : displayAuthors(authors);

const TextInput = ({ labelText, updateState }) => (
  <div className="field">
    <label>{labelText}</label>
    <input type="text" onChange={event => updateState(event.target.value)} />
  </div>
);

const Select = ({ labelText, options, isLoading, updateState }) => (
  <div className="field">
    <label>{labelText}</label>
    <select onChange={event => updateState(event.target.value)}>
      <option>Select Author</option>
      {renderAuthorList(options, isLoading)}
    </select>
  </div>
);

const AddBook = ({ getAuthorQuery: { loading, authors }, addBookMutation }) => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorID, setAuthorID] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    addBookMutation({
      variables: {
        name,
        genre,
        authorID
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  };

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <TextInput labelText="Book Name:" updateState={setName} />
      <TextInput labelText="Genre:" updateState={setGenre} />
      <Select
        labelText="Author:"
        options={authors}
        isLoading={loading}
        updateState={setAuthorID}
      />
      <button>+</button>
    </form>
  );
};

export default compose(
  graphql(getAuthorQuery, { name: "getAuthorQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
