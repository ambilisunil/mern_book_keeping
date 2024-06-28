import React, { Fragment ,useState,useEffect} from 'react';
import {
  useNavigate
} from "react-router-dom";
import './Edit.css';
import Header from '../Header/Header';
import axios from '../../constents/axios'
import { useParams } from "react-router-dom";


const Edit = () => {
  const [title,setTitle]=useState('');
  const [author,setAuthor]=useState('');
  const [publisher,setPublisher]=useState('');
  const [index,setIndex]=useState('');
  const [category,setcategory]=useState('');
  const [otherDetails,setOtherDetails]=useState('');
  const { id } = useParams();
  console.log({id})
  useEffect(() => {
    axios({
      method: "get",
      url: `view/${id}`,
    }).then(function (response) {
      if (response.data.statusCode === 200) {
        console.log(response.data)
        if(response.data.book){
          setTitle(response.data.book.title)
          setAuthor(response.data.book.author)
          setPublisher(response.data.book.publisher)
          setIndex(response.data.book.index)
          setcategory(response.data.book.category)
          setOtherDetails(response.data.book.otherDetails)

        }
      }
    });
  }, []);

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log({id})


  axios({
      method: 'patch',
      url: `update/${id}`,
      data: 
        {title,author,publisher,index,category,otherDetails},
    })
    .then(function (response) {
    })
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
        <form onSubmit={handleSubmit}> 
            <label htmlFor="fname">Book Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Author Name</label>
            <br />
            <input
              className="input"
              type="textArea"
              id="fname"
              name="Author"
              value={author}
              onChange={(e)=>setAuthor(e.target.value)}
             
            />
            <br />

            <label htmlFor="fname">Publisher</label>
            <br />
            <input
              className="input"
              type="textArea"
              id="fname"
              name="Publisher"
              value={publisher}
              onChange={(e)=>setPublisher(e.target.value)}
             
            />
            <br />

            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="textArea"
              id="fname"
              name="Category"
              value={category}
              onChange={(e)=>setcategory(e.target.value)}
             
            />
            <br />
            <label htmlFor="fname">Other Details</label>
            <br />
            <input
              className="input"
              type="textArea"
              id="fname"
              name="otherDetails"
              value={otherDetails}
              onChange={(e)=>setOtherDetails(e.target.value)}
             
            />
            <br /> <label htmlFor="fname">Serial Number</label>
            <br />
            <input
              className="input"
              type="textArea"
              id="fname"
              name="index"
              value={index}
              onChange={(e)=>setIndex(e.target.value)}
             
            />
            <br />
           
            <button>Update Book</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Edit;
