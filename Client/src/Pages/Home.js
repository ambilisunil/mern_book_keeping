import React from 'react';

import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import ListBooks from './ListBooks';
import AddBook from './AddBook';


function Home(props) {
  return (
    <div className="homeParentDiv">
      <Header />
      <AddBook/>
      
      <br></br><br></br><br></br><br></br> <br></br> <br></br><br></br><br></br><br></br>
    <Footer/>
    </div>
  );
}

export default Home;
 
