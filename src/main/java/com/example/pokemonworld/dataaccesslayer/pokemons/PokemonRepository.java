package com.example.pokemonworld.dataaccesslayer.pokemons;

import com.example.pokemonworld.dataaccesslayer.pokemons.Pokemon;
import com.example.pokemonworld.dataaccesslayer.regions.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import javax.swing.*;
import java.util.List;

public interface PokemonRepository extends JpaRepository <Pokemon, Integer> {

    Pokemon findPokemonByPokemonId(String pokemonId);

    List<Pokemon> findPokemonByRegion_RegionId(String regionId);
}
