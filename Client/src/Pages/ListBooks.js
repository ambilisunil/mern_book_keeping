import React from 'react';
import Book from '../Components/Listing/BookList';
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer';
function Books() {
  return (
    <div><Header/>
      <Book/>
      <Footer/>
    </div>
  );
}

export default Books;
