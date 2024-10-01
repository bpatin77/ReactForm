//Controlled Form: a type of form component that uses React state to manage form data
//Using a controlled form, we can associate our state values with the value and onChange properties of our <input> elements
//Controlled forms can be used to re-render the UI with a change to the form input 
 
import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState(""); //state variable: username, password
  const [password, setPassword] = useState(""); //useState gives us the variable(username/password) and a way to update the variable(setPassword/setUsername). It returns 2 things the variable and a way to update the variable
  const [error, setError] = useState(null); //error is initially set to null if there is there is a api error then line 24 will run

  async function handleSubmit(event) {
    //event is a built-in perimeter from documentation
    event.preventDefault(); //preventing the browser refresh that usually occurs when you submit a form
    try {
      //checking the api
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST", //sending the username and password to the server
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }), //this converts the javascript obj to a string
        }
      );
      const result = await response.json();
      setToken(result.token); //we are setting the token from the api shared between the signup form and the api component
    } catch (error) {
      //if there is a api error we will update the error state and set the msg in the error state
      setError(error.message);
    }
  }

  return (
    <>
      <h2> Sign up! </h2>
      {error && <p>{error}</p>}{" "}
      {/*if there is an error then we will render the error in a <p> element in order to show the error to the user*/}
      <form onSubmit={handleSubmit}>
        {/*handleSubmit is the the eventhandler of the submit event from line 9*/}
        <label>
          Username:{" "}
          {/* {" "}: used on line 38 and line 49 to ensure there is space between the label and the field*/}
          <input
            required //if nothing is submitted within the input field of Username then a built in function will display in the browser indicating to: "fill out the field"
            minLength={8} //if the username is less then 8 characters then a built in function will display in the browser indicating to: "Please lengthen this text to 8 characters or more"
            value={username} //coming from state
            onChange={(e) => setUsername(e.target.value)} //as the user types the username we type the value and it gets placed into the state
          />{" "}
          {/* onChange is an anonomous function that is taking in a event(e) from the browser*/}
        </label>
        <label>
          Password:{" "}
          <input
            required //if nothing is submitted within the input field of Password then a built in function will display in the browser indicating to "fill out the field"
            minLength={8} //if the password is less then 8 characters then a built in function will display in the browser indicating to: "Please lengthen this text to 8 characters or more"
            value={password} //coming from state
            onChange={(e) => setPassword(e.target.value)} //as the user types the password we type the value and it gets placed into the state
          />
          {/* onChange is an anonomous function that is taking in a event(e) from the browser*/}
        </label>
        <button> Submit </button>{" "}
        {/*Gets functionality from the handleSubmit function*/}
      </form>
    </>
  );
} //line 40-50 react will convert the lines into html
