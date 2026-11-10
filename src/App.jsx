import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import MovieTe from './components/listMovie';
import CharDBZ from './components/charDBZ'
import MyPet from './components/myPet';
import MyName from './components/myName';
import ThemeButton from './components/themeButton';
//import MouseTracker from './components/mouseTracker';

function App() {
  const API_KEY = 'c8d1bf5e'; 
  const [error, setError] = useState(false)    
  const [loading, setLoading] = useState(true)             
  const [filme, setFilme] = useState({})     
   
  const [text, setText] = useState(() => {
    return localStorage.getItem('easy-input') || '';
  });
  const [dark, setDark] = useState(false);
  const theme = dark ? 'theme-dark' : 'theme-light';

  useEffect(() => {                             
    const getData = async () => {               
      try {                                               
        const filme = await axios.get(  
          `https://www.omdbapi.com/?i=tt0424774&apikey=${API_KEY}`)
        setFilme(filme.data)            
        setLoading(false)                       
      } catch (error) {                         
        setLoading(false)                       
        setError(true)                          
        console.log("Error: ", error)         
      }
    }
    getData()                                   
  }, [])                                       
  useEffect(() => {
    localStorage.setItem('easy-input', text);
    console.log('Fácil: Salvando no localStorage ->', text);
  }, [text]); 
  if (loading) {                                
    return (<div>Loading</div>)
  }
  if (error) {                                  
    return (<div>Ocorreu um erro inesperado</div>)
  }
  return (                                      
    <>
      <section id="center" className={theme}> 
      <ThemeButton dark={dark}
          onToggle={() => setDark(!dark)}/>
          <div className={theme}/>
          <MovieTe/>  
        <div className="hero">                  
          <CharDBZ/>
        </div>
        <div>
          <MyName/>         
        </div>
        <div className="card">
          <h2>UseEffect Nível Fácil: Sincronizar com LocalStorage</h2>
          <p>O que você digitar será salvo automaticamente. Se recarregar a página, não perderá a informação.</p>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Digite algo para salvar..."
          /></div>
      </section>
      <div className="ticks"></div>
      <section id="next-steps">
        <div id="docs">
          <h2>Filme que gostei</h2>         
          <p>{filme.Title}</p>                 
          <img src={filme.Poster} width="170" /> 
          <p>{filme.Ratings[1].Source}</p>      
          <p>{filme.Ratings[1].Value}</p>
          <p></p>
          <p></p>
        </div>
        <MyPet/>
      </section>
      <div className="ticks"></div>
    </>
  )
}
export default App                             