import {
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client";

const client = new ApolloClient({
    headers : {
        "API-ID": "7wktsy5t35hhjk24fbvhoj6nge",
        "API KEY": "da2-az5dh3w2ujexfpthrxxq2hcurq",
    },
    uri: 'https://yffoucqeyrd2fpmmd6nozkllmu.appsync-api.us-east-1.amazonaws.com',
    cache: new InMemoryCache()
});


export default client