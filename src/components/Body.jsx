import { useState } from "react";


function Body(){

    const [input, setInput] = useState("");



    return(
        <main>
            <h1>Body</h1>
            <form role="search" className="search-bar">
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