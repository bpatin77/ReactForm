import { useState } from "react";

export default function Authenticate({ token }) {
  //uses the token that is being passed down from the App.jsx file
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  //anytime you call a api fetch function you will prob need 2 state variable one for the response and one for the error incase there is one
  async function handleClick() {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET", //With the "GET" method we are recieving as opposed to the "POST" method we use in SignUpForm
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // passing the token as a authorization code. Bearer is the type of token that is most freq used
          },
        }
      );
      const result = await response.json(); // once we get the result we set the succes msg in the state
      setSuccessMessage(result.message);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div class={check}>
      {" "}
      {/*We seperate each component due to each component having its own job: get the token, use the token. We defined this in the App.jsx line 11 and 14*/}
      <h2> Authenticate! </h2>
      {successMessage && <p>{successMessage}</p>}{" "}
      {/*if there is a success then we will rendor the success msg like the error we did in the SignUpForm on line 31*/}
      {error && <p> {error} </p>}
      <button onClick={handleClick}>Authenticate Token!</button>{" "}
      {/* the button we are using for the GET fetch*/}
    </div>
  );
}
