import React, { Fragment ,useState,useEffect} from 'react';
import { useParams, useNavigate} from "react-router-dom";
import axios from '../../constents/axios'

//import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, InputGroup, Row, Button } from 'react-bootstrap';
const Edit = () => {
  const [title,setTitle]=useState('');
  const [author,setAuthor]=useState('');
  const [publisher,setPublisher]=useState('');
  const [index,setIndex]=useState('');
  const [category,setcategory]=useState('');
  const [otherDetails,setOtherDetails]=useState('');
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate()

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


  axios({
      method: 'patch',
      url: `update/${id}`,
      data: 
        {title,author,publisher,index,category,otherDetails},
    })
    .then(res => {
      alert(res.data.message)

      setMessage("Updated");

    })
  }

  const goBack=()=>{

    navigate(-1);

  }
  return (
    <Fragment>
                <button onClick={(e)=>goBack(e)} className="btn btn-light">Go Back</button>

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
            <button type="submit" onClick={handleSubmit}className="me-4 btn btn-success btn-lg btn-block">Update</button>
            {message && <div>{message}</div>}

        </Form.Group>
    </Row>
</form>
      <div>
     </div>   
        
      </div>
    </Fragment>
  );
};

export default Edit;
