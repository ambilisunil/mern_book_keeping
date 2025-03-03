import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import CreatePage from './Pages/AddBook';
import ViewBooks from './Pages/ListBooks';
import EditBooks from './Pages/EditBook';


//import ViewUsers from './Pages/ViewUsers';



import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState , useEffect} from "react";


function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log({user})
    const theUser = localStorage.getItem("user");

    if (theUser && !theUser.includes("undefined")) {
      console.log("ooooooooo",{user})

      setUser(theUser);
      console.log("ohhhhhhhhhhhhdfc",{user})

    }
  }, []);
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" 
                element={localStorage?.user ? <ViewBooks/> : <Home />}

/>     
        <Route path="create" element={<CreatePage />} />
        <Route path="edit/:id" element={<EditBooks />} />
        <Route path="reg" element={<Home />} />
        ,


      
    </Routes>
  </BrowserRouter>
    // <div className="App">
    //   <Home/>
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
