import Authenticate from "./components/Authenticate";
import SignUpForm from "./components/SignUpForm";
import { useState } from "react";

//App.jsx is the used as the parent component to the rest of the components

export default function App() {
  //token is a state as it is a variable that is changing
  const [token, setToken] = useState(null); //declaring the token state and were passing the token and the setToken to the passing form
  return (
    <>
      <Authenticate token={token} />
      {/*renders the applications(child components)
      token is the property and everything within the curly braces is the value of that property*/}
      <SignUpForm setToken={setToken} />{" "}
      {/*renders the applications(child components)
      sign up will receive the token and update the state with the setToken and then we will pass the token to the authenticate component*/}
    </>
  );
}
