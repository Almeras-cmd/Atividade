import { useState, useEffect } from "react";
export default function MovieTe(){
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('spider man');

    useEffect(() =>{
        const fetchMovies = async() =>{
            setLoading(true);
            try{
                const response = await
                        fetch(`https://www.omdbapi.com/?s=${query}&apikey=c8d1bf5e`)
                    const data = await response.json();
                    if (data.Response === 'True'){
                        setMovies(data.Search);
                    }else{
                        setMovies([]);

                    }
                }catch(error){
                    console.error("Erro ao buscar filmes:", error);

                }finally{
                    setLoading(false);
                }
        };
        const delayDebounceFn = setTimeout( () =>{
            if (query.trim() !=='') {
                fetchMovies()
            } else {
                setMovies([]);
            }
        }, 800);

        return() => clearTimeout(delayDebounceFn);
    }, [query]);

return(
    <div className="card">
     <h2>Nível Média: Consumo de API OMBD com Debounce</h2>
     <p>Busca filmes assim que você digitar.</p>
     <input 
         type="text"
         value={query}
         onChange={ (e) => setQuery(e.target.value)}
         placeholder="Buscar Filme..." 
    />

    {loading
    ?<p>Carregando filmes...</p>
    : movies.length > 0
        ? <ul className="movie-list">
            {movies.map( (movie) => (
                <li key={movie.imbdID}>
                    <strong>{movie.Title}</strong>({movie.Year})
                </li>
            ))} 
          </ul>
        :<p> Nehum filme Enconrado...</p>
    }
    </div>
  );
}