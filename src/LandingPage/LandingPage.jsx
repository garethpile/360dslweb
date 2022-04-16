import React, {useEffect , useState} from "react";
import Header from "../Components/Header"
import {
    BrowserRouter as Router,
    Routes,
    Route,
    BrowserRouter
} from "react-router-dom";
import ThreeSixtyDSL from "../ThreeSixtyDSL/ThreeSixtyDSL";
import { Auth } from 'aws-amplify';


const LandingPage = () => {
    const [userId, setUserId] = useState("");
  
    useEffect(() => {
      Auth.currentAuthenticatedUser({
        bypassCache: true, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      })
        .then((user) => {
          setUserId(user.username);
          console.log("Current userId: ", user.username);
        })
        .catch((err) => console.log(err));
    }, []);
    return (
        <BrowserRouter>
        <Header user={userId}></Header>
            <Routes>
                <Route path="/Profile" element={<h1>Hello world</h1>} />
                <Route exact path="/" element={<ThreeSixtyDSL />} />
            </Routes>
        </BrowserRouter>
    )
}

export default LandingPage