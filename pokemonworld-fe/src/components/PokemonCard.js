import { Card,Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap"
import EditPokemon from "./EditPokemon";

export default function PokemonCard(props) {

  const { pokemon, updatePokemon, regionOptions, onDeletePokemonHandler } = props;

  const onDelete = () => {
    onDeletePokemonHandler(pokemon.pokemonId)
}

  return (
      <Card
      className={`pokemon-card ${pokemon.typee.toLowerCase()} ${pokemon.typee.replace('/', '-')} mx-1 mt-3`}
      style={{ width: '25rem', borderRadius: '1rem', background: [pokemon.typee] }}
      >      
      <LinkContainer to ="/pokemonregion" state={pokemon}>  
        <Card.Img
            variant="top"
            src={pokemon.pokemonURL}
            style={{ height: '100%', marginTop: '1rem' }}
            className="rounded-3"
          />
        </LinkContainer>

        <Card.Body>  
          <Card.Title>{pokemon.name}</Card.Title>
          <Card.Text className="cardTxt">
            <strong>Pokemon Type: </strong> {pokemon.typee} <br/>
            <strong>Ability: </strong> {pokemon.ability} <br/>
            <strong>Weight: </strong> {pokemon.weight} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <strong>Height: </strong> {pokemon.height}<br/>
            <strong>Classification: </strong> {pokemon.classification}
          </Card.Text>
          {window.location.pathname === "/pokemons" &&
          <>
          <EditPokemon pokemon={pokemon} updatePokemon={updatePokemon} regionOptions = {regionOptions}/> 
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="danger" onClick={onDelete}>Delete</Button>
          </>
}
        </Card.Body>
      </Card>
  );
}
