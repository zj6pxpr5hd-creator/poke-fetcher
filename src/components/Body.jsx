import { useState, useEffect } from "react";
import PokemonDisplay from "./PokemonDisplay";
import { checkCache, saveCache } from "../utils/cacheManagement";


function Body(){

    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const [pokemondata, setPokemondata] = useState(null);

    // https://pokeapi.co/api/v2/pokemon/{name}

    const  handleSubmit =  (e) => {
        e.preventDefault();
        setPokemondata(null);

        if(!isValidPokemon(input)){ // check if the name is valid 
            setError("Enter valid Pokemon name");//if it isn't trhow an error
            return;
        }

        fetchPokemon(input.trim());//if name is valid fetch pokemon
        setInput("");
 
    }

    const fetchPokemon = async (name) =>  {    //asyncronous function because it must wait for the response
        
        setLoading(true);   //set loading state
        setError("");

        if(checkCache(name)){
            //POKEMON IS IN CACHE AND IT'S NOT STALE
            const cache = JSON.parse(localStorage.getItem(key));
            setPokemondata(cache.data);   //sets pokemon data as data retrieved from cache
            setLoading(false);
        } else {
            //fetches pokemon data

            try{                //try to fetch pokemon
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);// fetch pokemon with Poke API
            
            if(!response.ok){   //in case the response did not produce a positive result
                switch (response.status){
                    case 400:
                        throw new Error("Pokemon name not valid, try something else");
                    case 404:   //element not found
                        throw new Error("Pokemon not found");
                    case 403:   //limit reached
                        throw new Error("Rate limit reach, try again later");
                    case 500:   //server error
                        throw  new Error("Server Error, try again later");
                    default:    //other error accurred
                        throw new Error("Something went wrong during the request");
                }
            }
                //else response was successful
                const data = await response.json();  //turn response in a javascript object
                setPokemondata(data);               //set state variable as response to display it ok screen

                //saves data in localStorage as cache
                saveCache(name, data);

            }catch  (error){ //an error accurred, i need to pass the error to the "response"
                setError(error.message);
                
            }finally{
                //end loading fase
                setLoading(false);
            }
        }
        
    }


    const isValidPokemon =  (pokemon)  => {
        const v =  pokemon.trim();
        const re = /^(?!-)(?!.*--)[A-Za-z0-9-]{1,39}(?<!-)$/;
        return re.test(v);
    }

    useEffect(() => {// FOR TESTING
        console.log(pokemondata);
    }, [pokemondata]);

    const clearCache = () => {
        localStorage.clear();
    }

    return(
        <main>
            <h1 className="main-title">Search the Pokedex</h1>
            <form role="search" className="search-bar" onSubmit={handleSubmit}>
                <label className="sr-only" htmlFor="pokedex-search">
                    Search The Pokedex
                </label>
                <input 
                    type="search"
                    value={input}
                    id = "pokedex-search"
                    placeholder="e.g. ditto"
                    autoComplete="off"
                    onChange={(e) => setInput(e.target.value)}
                    className="search-input"
                />
                <button className="search-button" type="submit" >{loading ? "Searching" : "Search"}</button>
            </form>
            {error.length!==0 && <p>{error}</p>}
            {pokemondata && <PokemonDisplay pokemon={pokemondata} />}
            <button className="clear-button" onClick={clearCache}>Clear Cache</button>
        </main>
    );

}


export default Body;