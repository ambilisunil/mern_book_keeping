import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import axios from '../../constents/axios'
// https://developers.google.com/identity/gsi/web/reference/js-reference
import background from '../../images/w.jpeg';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
  // const { handleGoogle, loading, error } = useFetch(
  //   "http://localhost:4000/user/login"
  // );

  const googleSignUp=(response)=>{
    //  e.preventDefault();
      
  
    axios({
        method: 'post',
        url: 'user/login',
        data: { credential: response.credential },
        
      })
      .then((res) => {
        console.log(res)
        if (res.data?.user) {
          localStorage.setItem("user", JSON.stringify(res.data?.user));
          localStorage.setItem("token", (res.data?.user.token));

          window.location.reload();
        }
        throw new Error(res.data?.message || res);

      })
     
      .catch((error) => {
        setError(error?.message);
      });
    }

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: googleSignUp,
      });

      google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
         type: "standard",
        theme: "filled_white",
        text: "continue_with",
        shape: "pill",
        theme: "outline",
        size: "large",
       
      });

      // google.accounts.id.prompt()
    }
  }, [googleSignUp]);

  return (
    <>
    <div style={{ backgroundImage: `url(${background})` , backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height:'75vh',
    width:'100vw'}}>
    <nav style={{ padding: "2rem" }}>
        <Link to="/">Go Back</Link>
      </nav>
      <header style={{ textAlign: "center", color:"white"}}>
        <h1>Personal Book Catalog</h1>
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