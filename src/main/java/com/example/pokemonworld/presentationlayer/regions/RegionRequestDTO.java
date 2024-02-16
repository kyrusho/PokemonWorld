package com.example.pokemonworld.presentationlayer.regions;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RegionRequestDTO {

    private String regionName;

    private String professor;

    private String starterPokemons;

    private String gym_leaders;

    private String geography;

    private String regionURL;
}
