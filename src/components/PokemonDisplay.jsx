import { useState } from "react";

function PokemonDisplay({ pokemon }){

    const [isHovering, setIsHovering] = useState(false);
    
    return (
        <section className="pokemon-display">
            <div>
                <p className="pokemon-name">
                    {String(pokemon.name).charAt(0).toUpperCase() + String(pokemon.name).slice(1)}
                </p>
                <div
                    className={`pokemon-img-wrap`}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <img    
                        className="pokemon-img"
                        src={isHovering ? pokemon.sprites.front_shiny : pokemon.sprites.front_default}  
                        alt={pokemon.name}
                    />
                </div>
            </div>
            <div className="pokemon-stats">
                <p className="bold">Types</p>
                <ol className="pokemon-types">
                    {pokemon.types.map((type) => {
                        return (
                            <li key={type.type.name} className={`pokemon-type background-color-${type.type.name}`}>
                                {type.type.name}
                            </li>
                        );
                    })}
                </ol>
                <p><span className="bold">Height:</span> {pokemon.height}</p>
                <p><span className="bold">Weight:</span> {pokemon.weight}</p>
                <p className="bold">Abilities</p>
                <ol className="pokemon-abilities">
                    {pokemon.abilities.map((ability) => {
                        return (
                            <li key={ability.ability.name} className="pokemon-ability">
                                {ability.ability.name}
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );

}

export default PokemonDisplay;
