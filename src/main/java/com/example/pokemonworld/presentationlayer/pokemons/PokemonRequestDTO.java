package com.example.pokemonworld.presentationlayer.pokemons;



import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PokemonRequestDTO {

    private String name;

    private String typee;

    private String regionId;

    private String ability;

    private String weight;

    private String height;

    private String classification;

    private String pokemonURL;
}
