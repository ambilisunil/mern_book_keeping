import React from 'react';

import Footer from '../Components/Footer/Footer';
import Register from '../Components/User/Register';


function Home(props) {
  return (
    <div className="homeParentDiv">
      <Register/>
    <Footer/>
    </div>
  );
}

export default Home;
 
