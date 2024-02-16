package com.example.pokemonworld.businesslayer.pokemons;

import com.example.pokemonworld.dataaccesslayer.pokemons.Pokemon;
import com.example.pokemonworld.dataaccesslayer.pokemons.PokemonRepository;
import com.example.pokemonworld.dataaccesslayer.regions.Region;
import com.example.pokemonworld.dataaccesslayer.regions.RegionRepository;
import com.example.pokemonworld.presentationlayer.regions.RegionResponseDTO;
import com.example.pokemonworld.presentationlayer.pokemons.PokemonRequestDTO;
import com.example.pokemonworld.presentationlayer.pokemons.PokemonResponseDTO;
import com.example.pokemonworld.utils.exception.InUseException;
import com.example.pokemonworld.utils.exception.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class PokemonServiceImpl implements PokemonService{

    private PokemonRepository pokemonRepository;
    private RegionRepository regionRepository;

    public PokemonServiceImpl(PokemonRepository pokemonRepository, RegionRepository regionRepository){
        this.pokemonRepository = pokemonRepository;
        this.regionRepository = regionRepository;
    }


    @Override
    public List<PokemonResponseDTO> getAllPokemons() {
        List<Pokemon> pokemonEntities = pokemonRepository.findAll();

        List<PokemonResponseDTO> pokemonResponseDTOS = new ArrayList<>();

        for (Pokemon pokemon : pokemonEntities){
            PokemonResponseDTO pokemonResponseDTO = new PokemonResponseDTO();
            BeanUtils.copyProperties(pokemon, pokemonResponseDTO);

            RegionResponseDTO regionResponseDTO = new RegionResponseDTO();
            BeanUtils.copyProperties(pokemon.getRegion(), regionResponseDTO);
            pokemonResponseDTO.setRegion(regionResponseDTO);

            pokemonResponseDTOS.add(pokemonResponseDTO);
        }

        return pokemonResponseDTOS;
    }

    @Override
    public PokemonResponseDTO findPokemonByPokemonId(String pokemonId) {
        Pokemon pokemon = pokemonRepository.findPokemonByPokemonId(pokemonId);

        if (pokemon == null)
            throw new NotFoundException("Unknown pokemonId: " + pokemonId);

        PokemonResponseDTO pokemonResponseDTO = new PokemonResponseDTO();
        BeanUtils.copyProperties(pokemon, pokemonResponseDTO);

        RegionResponseDTO regionResponseDTO = new RegionResponseDTO();
        BeanUtils.copyProperties(pokemon.getRegion(), regionResponseDTO);
        pokemonResponseDTO.setRegion(regionResponseDTO);

        return pokemonResponseDTO;
    }

    @Override
    public PokemonResponseDTO addPokemon(PokemonRequestDTO pokemonRequestDTO) {
        Region foundRegion = regionRepository.findRegionByRegionId(pokemonRequestDTO.getRegionId());

        if (foundRegion == null)
            throw new NotFoundException("Unknown regionId: " + pokemonRequestDTO.getRegionId());

        Pokemon pokemon = new Pokemon();
        BeanUtils.copyProperties(pokemonRequestDTO, pokemon);
        pokemon.setPokemonId(UUID.randomUUID().toString());

        pokemon.setRegion(foundRegion);

        Pokemon savedPokemon = pokemonRepository.save(pokemon);

        PokemonResponseDTO pokemonResponseDTO = new PokemonResponseDTO();
        BeanUtils.copyProperties(savedPokemon, pokemonResponseDTO);

        RegionResponseDTO regionResponseDTO = new RegionResponseDTO();
        BeanUtils.copyProperties(savedPokemon.getRegion(), regionResponseDTO);

        pokemonResponseDTO.setRegion(regionResponseDTO);

        return pokemonResponseDTO;
    }

    @Override
    public PokemonResponseDTO updatePokemon(PokemonRequestDTO pokemonRequestDTO, String pokemonId) {
        Pokemon foundPokemon = pokemonRepository.findPokemonByPokemonId(pokemonId);

        if (foundPokemon == null)
            throw new NotFoundException("Unknown pokemonId: " + pokemonId);

        Pokemon pokemon = new Pokemon();

        BeanUtils.copyProperties(pokemonRequestDTO, pokemon);
        pokemon.setPokemonId(foundPokemon.getPokemonId());
        pokemon.setId(foundPokemon.getId());

        Region region = regionRepository.findRegionByRegionId(pokemonRequestDTO.getRegionId());
        pokemon.setRegion(region);

        Pokemon savedPokemon = pokemonRepository.save(pokemon);

        PokemonResponseDTO pokemonResponseDTO = new PokemonResponseDTO();

        RegionResponseDTO regionResponseDTO = new RegionResponseDTO();
        BeanUtils.copyProperties(region, regionResponseDTO);
        pokemonResponseDTO.setRegion(regionResponseDTO);

        BeanUtils.copyProperties(savedPokemon, pokemonResponseDTO);

        return pokemonResponseDTO;
    }

    @Override
    public void deletePokemon(String pokemonId) {
        Pokemon foundPokemon = pokemonRepository.findPokemonByPokemonId(pokemonId);

        if (foundPokemon == null)
            throw new NotFoundException("Unknown pokemonId: " + pokemonId);

        pokemonRepository.delete(foundPokemon);

    }
}
