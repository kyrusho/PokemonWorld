package com.example.pokemonworld.businesslayer.regionpokemon;

import com.example.pokemonworld.presentationlayer.regionpokemon.RegionPokemonResponseDTO;

public interface RegionPokemonService {
    RegionPokemonResponseDTO getAllPokemonsByRegionId(String regionId);

}
