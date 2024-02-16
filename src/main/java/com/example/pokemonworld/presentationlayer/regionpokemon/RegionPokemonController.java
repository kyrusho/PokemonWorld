package com.example.pokemonworld.presentationlayer.regionpokemon;

import com.example.pokemonworld.businesslayer.regionpokemon.RegionPokemonService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/regions/{regionId}/pokemons")
public class RegionPokemonController {
    private RegionPokemonService regionPokemonService;

    public RegionPokemonController(RegionPokemonService regionPokemonService) {
        this.regionPokemonService = regionPokemonService;
    }

    @GetMapping()
    public ResponseEntity<RegionPokemonResponseDTO> getAllPokemonsByRegionId(@PathVariable String regionId){
        return ResponseEntity.status(HttpStatus.OK).body(regionPokemonService.getAllPokemonsByRegionId(regionId));
    }

}
