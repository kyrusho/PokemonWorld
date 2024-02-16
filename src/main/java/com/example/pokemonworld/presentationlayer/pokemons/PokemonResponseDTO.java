package com.example.pokemonworld.presentationlayer.pokemons;

import com.example.pokemonworld.presentationlayer.regions.RegionResponseDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PokemonResponseDTO {

    private String pokemonId;

    private String name;

    private String typee;

    private RegionResponseDTO region;

    private String ability;

    private String weight;

    private String height;

    private String classification;

    private String pokemonURL;
}
