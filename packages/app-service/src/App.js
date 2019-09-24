import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { DataFetchComponent } from './components/DataFetchComponent/ui';
import { LoginForm } from './components';
import { client } from './client';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <DataFetchComponent />
      <LoginForm />
    </ApolloProvider>
  );
}

export default App;
