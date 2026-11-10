import useFetchAPI from "../hooks/useFetchAPI";

export default function MyPet(){
    const {loading, error, ret} = useFetchAPI(
        "https://pokeapi.co/api/v2/pokemon/", "501"
    )
    if(loading){
        return(<div>Carregando</div>)
    }
    if(error){
        return(<div>Ocorreu um erro</div>)
    }
    return(
        <div id="social">
             <h2>Meu pet</h2>                      
             <p>{ret.name}</p>                 
             <img src={ret.sprites.front_default} width="300" height="300" /> 
             <p>{ret.types[0].type.name}</p>   
        </div>
    )
}