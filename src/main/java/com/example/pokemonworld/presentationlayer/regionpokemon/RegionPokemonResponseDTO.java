package com.example.pokemonworld.presentationlayer.regionpokemon;

import com.example.pokemonworld.dataaccesslayer.pokemons.Pokemon;
import com.example.pokemonworld.presentationlayer.pokemons.PokemonResponseDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class RegionPokemonResponseDTO {

    private String regionId;

    private String regionName;

    private String professor;

    private String starterPokemons;

    private String gymLeaders;

    private String geography;

    private String regionURL;

    private List<PokemonResponseDTO> pokemons;
}
