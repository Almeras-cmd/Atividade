import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import MovieTe from './components/listMovie';
//import MouseTracker from './components/mouseTracker';

function App() {
  const API_KEY = 'c8d1bf5e'; 
  const [perfil, setPerfil] = useState({})      //Variavel com controle de estado para o objeto perfil
  const [error, setError] = useState(false)     //Variavel com controle de estado para o erros
  const [loading, setLoading] = useState(true)  //Variavel com controle de estado para o Carregamento
  const [DBZ, setDBZ] = useState({})            //Variavel com controle de estado para o objeto DBZ
  const [pokemon, setPokemon] = useState({})    //Variavel com controle de estado para o objeto pokemon
  const [filme, setFilme] = useState({})        //Variavel com controle de estado para o objeto filme
  const [text, setText] = useState(() => {
    return localStorage.getItem('easy-input') || '';
  });
  //Atividade etapa 1, variaveis de estado movies, query e queryloading
  // Atividade etapa 1 até aqui



  //Atividade etapa 2 variaveis de estado showtrakcer
  //

  useEffect(() => {                             //inicio do useEffect
    const getData = async () => {               //inicio da função getData
      try {                                     //definição da estrutura try/catch
        const response = await axios.get(       //primeiro consumo da API person mockada, o ID(ultimo numero da URL precisa ser o seu ID)
          "https://6a79e554674f43f4db11ebc8.mockapi.io/api/person/35")
        setPerfil(response.data)                //altera a variavel de estado perfil com o objeto retornado pela API
        const responseDBZ = await axios.get(    //segundo consumo de API DBZ, o ultimo numero é o ID do persnagem
          "https://dragonball-api.com/api/characters/19")
        setDBZ(responseDBZ.data)                //altera a variavel de estado DBZ com o objeto retornado pela API
        const responsePoke = await axios.get(   //terceiro consumo de API Pokemon, o ultimo numero ou palavra é o ID do persnagem
          "https://pokeapi.co/api/v2/pokemon/oshawott")
        setPokemon(responsePoke.data)           //altera a variavel de estado pokemon com o objeto retornado pela API
        const responseFilme = await axios.get(  //terceiro consumo de API OMDB, nessa precisamos de uma apiKey gerada e o id IMDB de um filme
          `https://www.omdbapi.com/?i=tt0424774&apikey=${API_KEY}`)
        setFilme(responseFilme.data)            //altera a variavel de estado filme com o objeto retornado pela API
        setLoading(false)                       //altera a variavel de estado loadind para falso
      } catch (error) {                         //em caso de erro em qualquer linha acima executa a sequencia do catch
        setLoading(false)                       //altera a variavel de estado loadind para falso
        setError(true)                          //altera a variavel de estado loadind para true
        console.log("Error: ", error)           //apresenta o erro no console
      }

    }
    getData()                                   //chama a função getData
  }, [])                                        //finaliza o useEffect com dependencia vazia (executa ao recarregar a pagina)


  // Toda vez que o 'text' mudar, o useEffect será acionado e salvará no localStorage
  useEffect(() => {
    localStorage.setItem('easy-input', text);
    console.log('Fácil: Salvando no localStorage ->', text);
  }, [text]); // A dependência [text] garante que só execute quando text mudar


  //Atividade etapa 1, useEffect pesquisa de filme

  //Atividade 1 até aqui

  if (loading) {                                // caso loading true retorna essa div para a pagina
    return (<div>Loading</div>)
  }
  if (error) {                                  // caso error true retorna essa div para a pagina
    return (<div>Ocorreu um erro inesperado</div>)
  }
  return (                                      //se passar pelos ifs anteriores retorna essa pagina
    <>
      <section id="center"> 
        <MovieTe/>                    {/* mantive o retorno do padrão da pagina gerado pelo vite*/}
        <div className="hero">                  {/*alterando apenas o conteudo apresentado, mas podemos trabalhar um um layout novo
                                                     sempre que quisermos, vou abordar isso nas próximas atividades*/}
          <img src={DBZ.image} className="base" width="170" height="179" alt="" /> {/* apresenta a imagem da api do DBZ */}
        </div>
        <div>
          <h1>{perfil.nome}</h1>                {/* Apresenta o nome salvo no objeto perfil */}
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
{/*Atividade etapa 1 renderizar pesquisa de filmes aqui */}


{/*Atividade etapa 1 renderizar pesquisa de filmes  até aqui */}


{/*Atividade etapa 2 renderizar mousetracker aqui */}


      </section>
      <div className="ticks"></div>
      <section id="next-steps">
        <div id="docs">
          <h2>Filme que não gostei</h2>         {/* titulo de uma parte do site */}
          <p>{filme.Title}</p>                  {/* apresenta o titulo do objeto filme */}
          <img src={filme.Poster} width="170" /> {/* apresenta o poster do objeto filme */}
          <p>{filme.Ratings[1].Source}</p>      {/* apresenta uma avaliação do objeto filme */}
          <p>{filme.Ratings[1].Value}</p>
          <p></p>
          <p></p>
        </div>
        <div id="social">
          <h2>Meu pet</h2>                      {/* titulo de uma parte do site */}
          <p>{pokemon.name}</p>                 {/* apresenta o nome do objeto pokemon */}
          <img src={pokemon.sprites.front_default} /> {/* apresenta a imagem do objeto pokemon */}
          <p>{pokemon.types[0].type.name}</p>   {/* apresenta o tipo do objeto pokemon */}
        </div>
      </section>
      <div className="ticks"></div>
    </>
  )
}

export default App                             //retorna minha pagina ou componente