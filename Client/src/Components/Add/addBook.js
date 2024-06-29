import React, { Fragment ,useState} from 'react';
import {
  useNavigate
} from "react-router-dom";
//import './Create.css';
import Header from '../Header/Header';
import axios from '../../constents/axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, InputGroup, Row, Button } from 'react-bootstrap';
const Create = () => {
  const [title,setTitle]=useState('');
  const [author,setAuthor]=useState('');
  const [publisher,setPublisher]=useState('');
  const [index,setIndex]=useState('');
  const [category,setcategory]=useState('');
  const [otherDetails,setOtherDetails]=useState('');



 //const history=useNavigate();
  const handleSubmit=(e)=>{
  //  e.preventDefault();
    

  axios({
      method: 'post',
      url: 'add',
      data: 
        {title,author,publisher,index,category,otherDetails},
      
     
      
    })
    .then(function (response) {
      alert(response.data.message)
    })
  }
  return (
    <>
      
      <card>
        <div className="centerDiv">
        <form className="container mt-3 mb-3">


<Row className="mb-3">

    <Form.Group className=" col col-sm-6" >
        <Form.Label>Name</Form.Label>
        <Form.Control className="form-control" type="text" name="address1" value={title} onChange={(e)=>setTitle(e.target.value)} />
    </Form.Group>
    <Form.Group className="col col-sm-6" controlId="formGridAddress2">
        <Form.Label>Author</Form.Label>
        <Form.Control className="form-control" name="address2"  value={author}
          onChange={(e)=>setAuthor(e.target.value)} type="text" />
    </Form.Group>
    
</Row>
<Row className="mb-3">
<Form.Group controlId="" className="col col-sm-4">
        <Form.Label>Publisher</Form.Label>
        <Form.Control className="form-control" type="text" name="publisher"  value={publisher}
          onChange={(e)=>setPublisher(e.target.value)} />
    </Form.Group>
    <Form.Group controlId="" className="col col-sm-4">
        <Form.Label>Category</Form.Label>
        <Form.Control className="form-control" type="text" name="category"  value={category}
          onChange={(e)=>setcategory(e.target.value)} />
    </Form.Group>
    <Form.Group className=" col col-sm-4" >
        <Form.Label>Index</Form.Label>
        <Form.Control className="form-control" type="text" name="index" value={index} onChange={(e)=>setIndex(e.target.index)} />
    </Form.Group>
   
</Row>
<Row className="mb-3">

    <Form.Group controlId="" className="">
        <Form.Label>Other Details</Form.Label>
        <Form.Control as="textarea" rows="{3}" className="form-control" name="otherdetails"   value={otherDetails}
          onChange={(e)=>setOtherDetails(e.target.value)}/>
    </Form.Group>
</Row>
<Row className="mb-3">
    <Form.Group controlId="" className="col col-sm-6">
        <button type="submit" onClick={handleSubmit}className="me-4 btn btn-success btn-lg btn-block">ADD</button>

    </Form.Group>
</Row>
</form>
   </div>
      </card>
    </>
  );
};

export default Create;
