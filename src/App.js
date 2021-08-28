import React from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

function App() {
  return (
    <div className="App">
      <header>
        <div>
      <img src="https://www.360dsl.co.za/attachments/Logo/360SL_logo_1.png" alt="360DSL" width = "400" height = "300"/>
      </div>
        <h1>Please connect your Training Accounts to your 360DSL account:</h1>
        <div>
        <a href = "https://oauth.sandbox.trainingpeaks.com/OAuth/Authorize?client_id=m360&response_type=code&scope=workouts athlete:profile&redirect_uri=https://cisx9pt2th.execute-api.us-east-1.amazonaws.com/dev/tpnotification">Connect your TP account</a>
        </div>
        <div>
        <a href = "http://www.strava.com/oauth/authorize?client_id=7947&response_type=code&scope=activity:read_all&redirect_uri=https://cisx9pt2th.execute-api.us-east-1.amazonaws.com/dev/notification">Connect your Strava account</a>
        </div>
        <div>
        <a href = "https://ab3qw9gu7b.execute-api.us-east-1.amazonaws.com/staging/garminreqtok">Connect your Garmin account</a>
        </div>
      </header>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
