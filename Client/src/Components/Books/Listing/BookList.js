import React, { useState, useEffect } from 'react';
import {
   useNavigate
} from "react-router-dom";

import axios from '../../../constents/axios'
import Form from 'react-bootstrap/Form';

import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';


function View() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios({
      method: "get",
      url: "list",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
    },
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
      url: "delete/" + id,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
    },
    })
      .then(function (response) {
        if (response.data.statusCode === 200) {
          axios({
            method: "get",
            url: "list",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem("token")
          },
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
    let q = e.target.value;
    if (!q.length || q.length > 3) {
      axios({
        method: "get",
        url: "list?q=" + e.target.value?.toUpperCase(),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem("token")
      },
      }).then(function (response) {
        if (response.data.statusCode === 200) {
          setBooks(response.data.books);

        }
      })
    }


  }


  const Edit = (id) => {

    navigate(`/edit/${id}`);
  }

  return (


    <div className="viewParentDivBook">
      <card>

        <Alert variant="">
          <p>

            <Form.Control

              aria-label="serchText"
              aria-describedby="inputGroup-sizing-xl"
              placeholder="Search..."
              onChange={search}
            />
          </p>

      <Table id="books" striped="columns" responsive="sm" bordered hover="true">
            <thead>

              <tr>
                <th>S.No</th>   <th>Title</th><th>Author</th><th>Publisher</th><th>Category</th><th>Other Details</th><th>Actions</th>
              </tr>
            </thead>

            {books ? books.map(book => {

              return (
                <tbody hover={true}>

                  <tr >
                    <td>{book.index}</td>

                    <td><button style={{ color: 'blue', border: 'none' }} onClick={() => Edit(book._id)}> {book.title
                    }</button>
                    </td>
                    <td>{book.author}</td>
                    <td>{book.publisher}</td>
                    <td>{book.category}</td>
                    <td>{book.otherDetails}</td>
                    <td>
                      
                      <button style={{ color: 'white', backgroundColor: 'red' }} onClick={() => { if (window.confirm('Delete this book?')) { bookDelete(book._id) }; }}>Delete</button>

                    </td>

                  </tr>         </tbody>
              )

            }) : ""}

          </Table>
        </Alert>
      </card>

    </div>
  );
}
export default View;
