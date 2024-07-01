import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import axios from '../../constents/axios'
// https://developers.google.com/identity/gsi/web/reference/js-reference
import background from '../../images/w.jpeg';

const SignUp = () => {
  const { handleGoogle, loading, error } = useFetch(
    "http://localhost:4000/user/signup"
  );

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
        // type: "standard",
        theme: "filled_black",
        // size: "small",
        text: "continue_with",
        shape: "pill",
      });

      // google.accounts.id.prompt()
    }
  }, [handleGoogle]);

  return (
    <>
    <div style={{ backgroundImage: `url(${background})` , backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height:'100vh',
    width:'100vw'}}>
    <nav style={{ padding: "2rem" }}>
        <Link to="/">Go Back</Link>
      </nav>
      <header style={{ textAlign: "center", color:"white"}}>
        <h1>Register to continue</h1>
      </header>
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading ? (
          <div>Loading....</div>
        ) : (
          <div id="signUpDiv" data-text="signup_with"></div>
        )}
      </main>
      <footer></footer>
      </div>
    </>
  );
};

export default SignUp;