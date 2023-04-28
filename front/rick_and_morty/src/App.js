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



// const URL_BASE = `http://localhost:3001/rickandmorty`;
// const API_KEY = "221499f9bca0.2cd7022468bff26a9215"
const username = "nico@gmail.com"
const password = "12345nico"

function App() {
   


   const location = useLocation();
   const navigate = useNavigate()
   const [characters, setCharacters] = useState([]);
   const [access, setAccess] = useState(false);

   const login = (userData)=>{
      const { username, password } = userData;
      const URL = 'http://localhost:3001/rickandmorty/login';
      axios(URL + `?email=${username}&password=${password}`)
      .then(({ data }) => {
         const { access } = data;
         setAccess(access);
         access && navigate('/home');
      });
   }

   useEffect(() => {
      !access && navigate('/');
   }, [access]);




   const onSearch = (id)=> {
 

      if(characters.find((char)=>char.id == id)){
         return alert("Personaje repetido")
      }

      axios(`http://localhost:3001/rickandmorty/character/${id}`)
      
      .then(({ data }) => {
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         } else {
            alert("¡No hay personajes con este ID!")
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
