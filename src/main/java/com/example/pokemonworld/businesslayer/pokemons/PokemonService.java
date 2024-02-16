package com.example.pokemonworld.businesslayer.pokemons;


import com.example.pokemonworld.presentationlayer.pokemons.PokemonRequestDTO;
import com.example.pokemonworld.presentationlayer.pokemons.PokemonResponseDTO;

import java.util.List;

public interface PokemonService {

    List<PokemonResponseDTO> getAllPokemons();

    PokemonResponseDTO findPokemonByPokemonId(String pokemonId);

    PokemonResponseDTO addPokemon(PokemonRequestDTO pokemonRequestDTO);

    PokemonResponseDTO updatePokemon(PokemonRequestDTO pokemonRequestDTO, String pokemonId);

    void deletePokemon(String pokemonId);
}
