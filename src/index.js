import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Amplify from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);

const client = new ApolloClient({
  credentials : "include",
  headers : {
      "API-ID": "7wktsy5t35hhjk24fbvhoj6nge",
      "API KEY": "da2-7z76gvic7bhuvokfij6f2ux25m"
  },
  uri: 'https://tbhnz4fce5fqvecf2t42r5zwkq.appsync-api.eu-west-1.amazonaws.com/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
