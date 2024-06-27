import React, { useContext } from 'react';

import {
  Link,BrowserRouter, Routes, Route 
} from "react-router-dom";

import './Header.css';


function Header() {

  //const history ();

  return (
    <div>
      <h1>Personal Book Keeping</h1>
      <div className="headerParentDiv">


        <ul>

          <div className="lgd">
            <li color='white'> 

            <Link to="/create" className="btn btn-primary">ADD</Link>
            <Link to="/" className="btn btn-primary">Home</Link>

            </li>
          </div>:


        </ul>


      </div></div>
  );
}

export default Header;
