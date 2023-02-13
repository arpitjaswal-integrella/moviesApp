import {useEffect, useState} from "react";
import './App.css'
import SearchIcon from "./search.svg"
import MovieCard from "./MovieCard";

const API_URL = 'http://www.omdbapi.com?apikey=676463f1';
// const movie1 = {
//     "Title": "Superman II",
//     "Year": "1980",
//     "imdbID": "tt0081573",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BODk2NjgzNTEtYzZhZC00ZTBkLTllMGQtMmMxMzU1NDRkM2RlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg"
// }


const App = ()=>{
        const[Movies, setMovies] = useState([]);
        const[searchTerm, setSearchTerm]=useState('');  
        const searchMovies = async(title)=>{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }
        useEffect(()=>{
            searchMovies('superman');
        },[])
        return(
            <div className="app">
                <h1>Cinemapedia</h1>
                <div className="search">

                    <input type="text" placeholder="Search for movies..." value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/   >
                    <img src={SearchIcon} alt="search"  onKeyPress={searchMovies(searchTerm)} onClick={()=>{
                        searchMovies(searchTerm);
                    }}/>
                    </div>
 

                    {
                        Movies?.length>0
                        ?(
                            <div className="container">
                                {Movies.map((movie)=>(
                                    <MovieCard movie={movie}/>
                                ))}
                            </div>
                        ):(
                            <div className="empty">
                                <h2>Kindly enter a valid/meaningful search term...</h2>
                            </div>
                        )
                    }
                    
                </div>
            
        )
}

export default App;