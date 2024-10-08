import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap"
import PokemonCard from "./PokemonCard"


export default function RegionPokemonsList(){

    const { state } = useLocation()

    const [pokemons, setPokemons] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async() => {
            const response = await fetch(`http://localhost:8080/api/v1/regions/${state.regionId}/pokemons`, {
                method: "GET"
            });
            const result = await response.json()
            const pokemons = result.pokemons
            setPokemons(pokemons)
            setIsLoading(false)
    })();
}, []);


    if(isLoading){
        return <div><h1>Loading...</h1></div>
    }

    return(
        
        <Container fluid className="p-4">
            
            <Row sm={2} lg={4} className="justify-content-evenly">
                
        {pokemons && pokemons.map((pokemon) => 
            <PokemonCard key={pokemon.pokemonId} pokemon={pokemon}/>
        )}
            </Row>
        </Container>
    );
}