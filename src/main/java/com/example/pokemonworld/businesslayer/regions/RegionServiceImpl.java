package com.example.pokemonworld.businesslayer.regions;

import com.example.pokemonworld.dataaccesslayer.pokemons.Pokemon;
import com.example.pokemonworld.dataaccesslayer.regions.Region;
import com.example.pokemonworld.dataaccesslayer.regions.RegionRepository;
import com.example.pokemonworld.presentationlayer.pokemons.PokemonResponseDTO;
import com.example.pokemonworld.presentationlayer.regions.RegionRequestDTO;
import com.example.pokemonworld.presentationlayer.regions.RegionResponseDTO;
import com.example.pokemonworld.utils.exception.InUseException;
import com.example.pokemonworld.utils.exception.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class RegionServiceImpl implements RegionService{

    private RegionRepository regionRepository;

    public RegionServiceImpl(RegionRepository regionRepository) {
        this.regionRepository = regionRepository;
    }

    @Override
    public List<RegionResponseDTO> getAllRegions() {
        List<Region> regionEntities = regionRepository.findAll();

        List<RegionResponseDTO> regionResponseDTOS = new ArrayList<>();

        for (Region region : regionEntities){
            RegionResponseDTO regionResponseDTO = new RegionResponseDTO();
            BeanUtils.copyProperties(region, regionResponseDTO);
            regionResponseDTOS.add(regionResponseDTO);
        }

        return regionResponseDTOS;
    }

    @Override
    public RegionResponseDTO findRegionByRegionId(String regionId) {
        Region region = regionRepository.findRegionByRegionId(regionId);

        if (region == null)
            throw new NotFoundException("Unknown regionId: " + regionId);

        RegionResponseDTO regionResponseDTO = new RegionResponseDTO();
        BeanUtils.copyProperties(region, regionResponseDTO);

        return regionResponseDTO;
    }

    @Override
    public RegionResponseDTO addRegion(RegionRequestDTO regionRequestDTO) {
        Region region = new Region();
        BeanUtils.copyProperties(regionRequestDTO, region);
        region.setRegionId(UUID.randomUUID().toString());

        Region savedRegion = regionRepository.save(region);

        RegionResponseDTO regionResponseDTO = new RegionResponseDTO();
        BeanUtils.copyProperties(savedRegion, regionResponseDTO);

        return regionResponseDTO;
    }

    @Override
    public RegionResponseDTO updateRegion(RegionRequestDTO regionRequestDTO, String regionId) {
        Region foundRegion = regionRepository.findRegionByRegionId(regionId);

        if (foundRegion == null)
            throw new NotFoundException("Unknown regionId: " + regionId);

        Region region = new Region();

        BeanUtils.copyProperties(regionRequestDTO, region);
        region.setRegionId(foundRegion.getRegionId());
        region.setId(foundRegion.getId());

        Region savedRegion = regionRepository.save(region);

        RegionResponseDTO regionResponseDTO = new RegionResponseDTO();
        BeanUtils.copyProperties(savedRegion, regionResponseDTO);

        return regionResponseDTO;
    }

    @Override
    public void deleteRegion(String regionId) {
        Region foundRegion = regionRepository.findRegionByRegionId(regionId);

        if (foundRegion == null) {
            throw new NotFoundException("Unknown regionId: " + regionId);
        }
        try {
            regionRepository.delete(foundRegion);
        }catch (DataIntegrityViolationException ex){
            throw new InUseException("Cannot delete region with regionId: " + regionId + " as it is currently assigned to one or more pokemons.");
        }
    }
}
