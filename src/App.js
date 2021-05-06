import React from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

function App() {
  return (
    <div className="App">
      <header>
      <img src="./images/360dsl_logo.png" alt="360DSL" />
        <h1>Please connect your accounts to your 360DSL account:</h1>
        <a href = "https://oauth.sandbox.trainingpeaks.com/OAuth/Authorize?client_id=m360&response_type=code&scope=workouts athlete:profile&redirect_uri=https://cisx9pt2th.execute-api.us-east-1.amazonaws.com/dev/tpnotification">Connect your TP account</a>
        <a href = "http://www.strava.com/oauth/authorize?client_id=7947&response_type=code&scope=activity:read_all&redirect_uri=https://cisx9pt2th.execute-api.us-east-1.amazonaws.com/dev/notification">Connect your Strava account</a>
      </header>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
