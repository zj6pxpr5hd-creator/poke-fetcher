import { useState } from "react";


function Body(){

    const [input, setInput] = useState("");
    const [error, setError] = usestate("");


    const  handleSubmit =  () => {
        if(!isValidPokemon(input)){

        }
    }


    const isValidPokemon =  (pokemon)  => {
        const v =  pokemon.trim();
        const re = /^(?!-)(?!.*--)[A-Za-z0-9-]{1,39}(?<!-)$/;
        return re.test(v);
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
                <button className="search-button" type="submit" >Search</button>
            </form>
        </main>
    );

}


export default Body;