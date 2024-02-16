package com.example.pokemonworld.businesslayer.regionpokemon;

import com.example.pokemonworld.dataaccesslayer.regions.Region;
import com.example.pokemonworld.dataaccesslayer.regions.RegionRepository;
import com.example.pokemonworld.dataaccesslayer.pokemons.Pokemon;
import com.example.pokemonworld.dataaccesslayer.pokemons.PokemonRepository;
import com.example.pokemonworld.presentationlayer.regionpokemon.RegionPokemonResponseDTO;
import com.example.pokemonworld.presentationlayer.regions.RegionResponseDTO;
import com.example.pokemonworld.presentationlayer.pokemons.PokemonResponseDTO;
import com.example.pokemonworld.utils.exception.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service

public class RegionPokemonServiceImpl implements RegionPokemonService{
    private RegionRepository regionRepository;
    private PokemonRepository pokemonRepository;

    public RegionPokemonServiceImpl(RegionRepository regionRepository, PokemonRepository pokemonRepository) {
        this.regionRepository = regionRepository;
        this.pokemonRepository = pokemonRepository;
    }

    @Override
    public RegionPokemonResponseDTO getAllPokemonsByRegionId(String regionId) {

        Region foundRegion = regionRepository.findRegionByRegionId(regionId);

        if (foundRegion == null) {
            throw new NotFoundException("Unknown regionId: " + regionId);
        }

        RegionPokemonResponseDTO regionPokemonResponseDTO = new RegionPokemonResponseDTO();
        BeanUtils.copyProperties(foundRegion, regionPokemonResponseDTO);

        List< Pokemon> pokemonList = pokemonRepository.findPokemonByRegion_RegionId(regionId);

        List<PokemonResponseDTO> pokemonResponseDTOList = new ArrayList<>();
        for (Pokemon pokemon: pokemonList) {
            PokemonResponseDTO pokemonResponseDTO = new PokemonResponseDTO();
            BeanUtils.copyProperties(pokemon, pokemonResponseDTO);

            RegionResponseDTO regionResponseDTO = new RegionResponseDTO();
            BeanUtils.copyProperties(pokemon.getRegion(), regionResponseDTO);
            pokemonResponseDTO.setRegion(regionResponseDTO);
            pokemonResponseDTOList.add(pokemonResponseDTO);
        }
        regionPokemonResponseDTO.setPokemons(pokemonResponseDTOList);


        return  regionPokemonResponseDTO;
    }
}
