package com.example.pokemonworld.dataaccesslayer.regions;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RegionRepository extends JpaRepository<Region, Integer> {

    Region findRegionByRegionId(String regionId);
}
