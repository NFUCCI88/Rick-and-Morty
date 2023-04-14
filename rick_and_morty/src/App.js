import './App.css';
import Nav from './components/Nav';
import Cards from './components/Cards.jsx';
import { useState } from 'react';
import axios from "axios";
import {Routes, Route, useLocation, useNavigate} from "react-router-dom"
import About from './components/About';
import Detail from './components/Detail';
import Form from './components/Form';
import { useEffect } from 'react';
import Favorites from './components/Favorites/Favorites';



const URL_BASE = "https://be-a-rym.up.railway.app/api/character"
const API_KEY = "221499f9bca0.2cd7022468bff26a9215"


function App() {
const navigate = useNavigate()

   const [access, setAccess] = useState(false)
   const EMAIL = "nico@gmail.com"
   const PASSWORD = "12345nico"

   const login = (userData)=>{
      if(EMAIL === userData.username  && PASSWORD === userData.password ){
         setAccess(true);
         navigate("/home")

      }

   }

   useEffect(() => {
      !access && navigate('/');
   }, [access]);

   const [characters, setCharacters] = useState([]);

   const location = useLocation();


   const onSearch = (id)=> {
      axios(`${URL_BASE}/${id}?key=${API_KEY}`).then(({ data }) => {
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         } else {
            alert('¡No hay personajes con este ID!');
         }
      });
   }

   const onClose = (id)=>{
      const charactersFiltered = characters.filter(character => character.id !==Number(id))
      setCharacters(charactersFiltered)

   }
   return (
      <div className='App'>
         {location.pathname === "/" ? <Form login = {login}></Form>: <Nav onSearch = {onSearch}></Nav>}

        <Routes>
         <Route path="/home" element={<Cards characters={characters} onClose={onClose} ></Cards>}> </Route>
         
         <Route path="/about" element={<About></About>}> </Route>
        
         <Route path="/detail/:id" element={<Detail></Detail>}> </Route>
         
         <Route path = "/favorites" element = {<Favorites></Favorites>}></Route>

        </Routes>

         
         
           
      </div>
   );
}

export default App;
