import React from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import BookList from "./components/book-list";
import AddBook from "./components/add-book";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
