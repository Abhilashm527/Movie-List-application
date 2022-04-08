import React, { useState } from "react";
import Axios from "axios";
import './App.css';

export const API_KEY = "a9118a3a";


function App() {
  const [movieList, updateMovieList] = useState([]);
  const [search,setSearch]=useState('');
  const [errorr,setErrorr]=useState('');
const searchMovie=(e)=>
{
     setSearch(e.target.value);
}

const fetchMovie=async (event)=>
{
  event.preventDefault();
  const resp =await Axios.get(
    `https://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`);
    setErrorr(resp.data.Error);
  if(resp.data.Error==undefined)
   updateMovieList(resp.data.Search)
   
}
if(errorr==undefined){
return(
  <section>  
    <div className="header">
      <h2>Movies List</h2>
    <form onSubmit={fetchMovie}>
      <input type='text' id="search" value={search} onChange={searchMovie}/>
      <input type='submit' id="submit" />
 </form>
 </div>
 { 
<div className="display">
  {
        movieList.map((value)=> {
      return(
        <div className="displayMovie">
          <img src={value.Poster} alt="Poster"/>
          <h4>Movie Titel:{value.Title}</h4>
          <h5>Year:{value.Year}</h5>
    
         <a href={`https://imdb.com/title/${value.imdbID}`}>Know More</a>
        </div>
      )
         }  )
        
        }
     
</div>
}
</section>
);
}
else
{
  return(
    <section>  
      <div className="header">
        <h2>Movies List</h2>
      <form onSubmit={fetchMovie}>
        <input type='text' id="search" value={search} onChange={searchMovie}/>
        <input type='submit' id="submit" />
   </form>
   </div>
   { 
  <div className="display">
   {errorr}
  </div>
  }
  </section>
  );
}
}

export default App;