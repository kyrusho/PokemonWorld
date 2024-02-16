package com.example.pokemonworld.presentationlayer.pokemons;


import com.example.pokemonworld.businesslayer.pokemons.PokemonService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/pokemons")
public class PokemonController {

    private PokemonService pokemonService;

    public PokemonController(PokemonService pokemonService) {
        this.pokemonService = pokemonService;
    }

    @GetMapping()
    public ResponseEntity<List<PokemonResponseDTO>> getPokemons(){
        return ResponseEntity.status(HttpStatus.OK).body(pokemonService.getAllPokemons());
    }

    @GetMapping("/{pokemonId}")
    public ResponseEntity<PokemonResponseDTO> getPokemonById(@PathVariable String pokemonId){
        return ResponseEntity.status(HttpStatus.OK).body(pokemonService.findPokemonByPokemonId(pokemonId));
    }

    @PostMapping()
    public ResponseEntity<PokemonResponseDTO> addPokemon (@RequestBody PokemonRequestDTO pokemonRequestDTO)
    {
        return ResponseEntity.status(HttpStatus.CREATED).body(pokemonService.addPokemon(pokemonRequestDTO));
    }

    @PutMapping("/{pokemonId}")
    public ResponseEntity<PokemonResponseDTO> updatePokemon (@RequestBody PokemonRequestDTO pokemonRequestDTO,
                                                         @PathVariable String pokemonId){
        return ResponseEntity.status(HttpStatus.OK).body(pokemonService.updatePokemon(pokemonRequestDTO, pokemonId));
    }

    @DeleteMapping("/{pokemonId}")
    public ResponseEntity<Void> deletePokemon(@PathVariable String pokemonId){
        pokemonService.deletePokemon(pokemonId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }
}
