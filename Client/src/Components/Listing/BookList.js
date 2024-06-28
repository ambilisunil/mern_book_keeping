import React, { useState, useEffect, useContext } from 'react';
import {
  Link,useNavigate
} from "react-router-dom";

import axios from '../../constents/axios'
import { Context } from '../../constents/Context'
import './Book.css'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import Alert from 'react-bootstrap/Alert';


function View() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios({
      method: "get",
      url: "list",
    }).then(function (response) {
      if (response.data.statusCode === 200) {
        setBooks(response.data.books);
        console.log(response.data)
      }
    });
  }, []);


  const bookDelete = (id) => {
    axios({
      method: 'delete',
      url: "delete/" + id
    })
      .then(function (response) {
        if (response.data.statusCode === 200) {
          axios({
            method: "get",
            url: "list",
          }).then(function (response) {

            if (response.data.statusCode === 200) {
              setBooks(response.data.books);
            }
          })

            ;
        }

      })


  }


  const search = (e) => {
    e.preventDefault();
    let q=e.target.value;
    if(!q.length || q.length>3){
      axios({
        method: "get",
        url: "list?q=" + e.target.value?.toUpperCase(),
      }).then(function (response) {
        if (response.data.statusCode === 200) {
          setBooks(response.data.books);
  
        }
      })
    }
  

  }

  const bookView = (id) => {

  }
  const Edit = (id) => {
  
      navigate(`/edit/${id}`);
    }

  return (
    

    <div className="viewParentDivBook">
 

   
   

        <Alert  variant="success">
        <p>

        <Form.Control

          aria-label="serchText"
          aria-describedby="inputGroup-sizing-xl"
          placeholder="Search..."
          onChange={search}
        />
        </p>
    
      </Alert>
    







      <table id="customers">
        <tr>
          <th>S.No</th>   <th>Title</th><th>Author</th><th>Publisher</th><th>Category</th><th>Other Details</th><th>Actions</th>
        </tr>

        {books ? books.map(book => {

          return (
            <tr>
              <td>{book.index}</td>

              <td>{book.title
              }<br></br>
              </td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.category}</td>
              <td>{book.otherDetails}</td>

              <td>
                <button onClick={() =>  Edit(book._id) }>View And Edit</button>


                <button style={{ color: 'white', backgroundColor: 'red' }} onClick={() => { if (window.confirm('Delete this book?')) { bookDelete(book._id) }; }}>Delete</button>




              </td>

            </tr>)
        }) : ""}

      </table>

    </div>
  );
}
export default View;
