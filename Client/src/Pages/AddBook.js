import React, { Fragment } from 'react';
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'

import Create from '../Components/Books/Add/addBook';

const CreatePage = () => {
  return (
    <div>
        <Header/>
        <Create/>
        <Footer/>
    </div>
  
  );
};

export default CreatePage;
