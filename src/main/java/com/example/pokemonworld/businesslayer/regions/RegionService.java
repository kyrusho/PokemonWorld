package com.example.pokemonworld.businesslayer.regions;

import com.example.pokemonworld.dataaccesslayer.regions.Region;
import com.example.pokemonworld.presentationlayer.regions.RegionRequestDTO;
import com.example.pokemonworld.presentationlayer.regions.RegionResponseDTO;

import java.util.List;

public interface RegionService {

    List<RegionResponseDTO> getAllRegions();

    RegionResponseDTO findRegionByRegionId(String regionId);

    RegionResponseDTO addRegion(RegionRequestDTO regionRequestDTO);

    RegionResponseDTO updateRegion(RegionRequestDTO regionRequestDTO, String regionId);

    void deleteRegion(String regionId);
}
