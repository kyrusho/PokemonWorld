import { Container, Row } from "react-bootstrap";
import PokemonCard from "./PokemonCard";
import { useState, useEffect, useRef } from "react";
import AddPokemon from "./AddPokemon";
import { successToast } from "../utils/toasts";

export default function PokemonList() {
  const [pokemons, setPokemons] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [regionOptions, setRegionOptions] = useState(null);

  const initialized = useRef(false)

  useEffect(() => {
    if(!initialized.current){
        initialized.current = true
    getAllPokemons()
    getRegionOptions()
    }
}, []);

function getAllPokemons(){
 (async() =>{
     const response = await fetch("http://localhost:8080/api/v1/pokemons", {
         method: "GET"
     });

     const pokemons= await response.json()
     setPokemons(pokemons)
     setIsLoading(false)

     console.log(pokemons)
 })();
}

function getRegionOptions(){
  (async() =>{
      const response = await fetch("http://localhost:8080/api/v1/regions", {
          method: "GET"
      });

      const regions= await response.json()
      setRegionOptions(regions)
  })();
 }


 if(isLoading){
     return <div><h1>Loading...</h1></div>
 }

 function updatePokemon(id, updatedPokemon){
     console.log("updatePokemon in PokemonsList")
     console.log(updatedPokemon)


     var pokemonRequestDTO = {
         //left => backened
         //right => prop mentionned above
         name: updatedPokemon.name, //this will match out props name defined above while the left one should match the backend name
         typee: updatedPokemon.typee,
         regionId: updatedPokemon.region.regionId,
         ability: updatedPokemon.ability,
         weight: updatedPokemon.weight,
         height: updatedPokemon.height,
         classification: updatedPokemon.classification,
         pokemonURL: updatedPokemon.pokemonURL,

     }

     fetch(`http://localhost:8080/api/v1/pokemons/${updatedPokemon.pokemonId}`, {
         method: 'PUT',
         //header will define what is the format of the data we'll send and recieve
         headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
         },
         body: JSON.stringify(pokemonRequestDTO)
     })
     //if async isnt use, the app could freeze while waiting for response. async will say when u recieve a response, send it to us and while we wait we can still work. Async allows us to not wait and continue working.
     .then(async response => {
         const isJson = response.headers.get('content-type')?.includes('application/json'); //the ? is like an option operation meaning that its possible tha we dont recieve a content-type.
         const data = isJson && await response.json();
         console.log("data is: "+ data.title)
         
        
         //check for error. if no error return success toast
         if(!response.ok){
             const error = (data && data.message) || response.status;
             console.log("post error occured")
             return Promise.reject(error);
         }else{
            successToast("Updated " + updatedPokemon.name + " Successfully")
            console.log("Pokemon Updated!")
            getAllPokemons()
         }

         getAllPokemons()

     })
 }

  if (pokemons === null) {
    // Check if pokemons is still null, and handle it appropriately
    return <div><h1>No Pokemon data available</h1></div>;
  }

  //promise syntax on exam
  async function deletePokemonHandler(pokemonId){

    const response = await fetch(`http://localhost:8080/api/v1/pokemons/${pokemonId}`, {
        method: 'DELETE',
        //header will define what is the format of the data we'll send and recieve
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');

        if(response.status === 204){
            successToast("Deleted " + pokemonId + " Successfully")
            console.log("Pokemon Deleted!")
            getAllPokemons()
        }
    })
    .catch(function(error){
        console.log("an unknown error occured")
        return Promise.reject(error)
    })
}

  function addPokemon(name, typee, regionId, ability, pokemonURL, weight, height, classification){
    console.log("PokemonList addPokemon")

    var pokemonRequestDTO = {
        //left => backened
        //right => prop mentionned above
        name: name, //this will match out props name defined above while the left one should match the backend name
         typee: typee,
         regionId: regionId,
         ability: ability,
         pokemonURL: pokemonURL,
         weight: weight,
         height: height,
         classification: classification,
    }

    fetch("http://localhost:8080/api/v1/pokemons", {
        method: 'POST',
        //header will define what is the format of the data we'll send and recieve
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pokemonRequestDTO)
    })
    //if async isnt use, the app could freeze while waiting for response. async will say when u recieve a response, send it to us and while we wait we can still work. Async allows us to not wait and continue working.
    .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json'); //the ? is like an option operation meaning that its possible tha we dont recieve a content-type.
        const data = isJson && await response.json();
        console.log("data is: "+ data.name)
        

        //check for error
        if(!response.ok){
            const error = (data && data.message) || response.status;
            console.log("post error occured")
            return Promise.reject(error);
        }else{
            successToast("Added " + name + " Successfully")
            console.log("Pokemon Added!")
            getAllPokemons()
         }

        getAllPokemons()

    })
}

  return (
    <Container fluid>
      <AddPokemon addingPokemon={addPokemon} regionOptions = {regionOptions}/>
      <Row sm={2} lg={4} className="justify-content-evenly">
        {pokemons.map((pokemon) => 
          <PokemonCard key={pokemon.pokemonId} 
                       pokemon={pokemon} 
                       updatePokemon={updatePokemon} 
                       regionOptions = {regionOptions}
                       onDeletePokemonHandler = {deletePokemonHandler}/>
        )}
      </Row>
    </Container>
  );
}
