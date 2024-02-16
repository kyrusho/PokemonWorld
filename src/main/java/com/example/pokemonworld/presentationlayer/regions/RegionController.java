package com.example.pokemonworld.presentationlayer.regions;


import com.example.pokemonworld.businesslayer.regions.RegionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/regions")
public class RegionController {

    private RegionService regionService;

    public RegionController(RegionService regionService) {
        this.regionService = regionService;
    }

    //create a new getmapping with a path variable which is the id
    @GetMapping("/{regionId}")
    public ResponseEntity<RegionResponseDTO> getRegionById(@PathVariable String regionId){
        return ResponseEntity.status(HttpStatus.OK).body(regionService.findRegionByRegionId(regionId));
    }
    @GetMapping()//gets http request
    public ResponseEntity<List<RegionResponseDTO>> getRegions(){
        return ResponseEntity.status(HttpStatus.OK).body(regionService.getAllRegions());
    }

    @PostMapping()
    public ResponseEntity<RegionResponseDTO> addRegion (@RequestBody RegionRequestDTO regionRequestDTO)
    {
        return ResponseEntity.status(HttpStatus.CREATED).body(regionService.addRegion(regionRequestDTO));
    }

    @PutMapping("/{regionId}")
    public ResponseEntity<RegionResponseDTO> updateRegion (@RequestBody RegionRequestDTO regionRequestDTO,
                                                               @PathVariable String regionId){
        return ResponseEntity.status(HttpStatus.OK).body(regionService.updateRegion(regionRequestDTO, regionId));
    }

    @DeleteMapping("/{regionId}")
    public ResponseEntity<Void> deleteRegion(@PathVariable String regionId){
        regionService.deleteRegion(regionId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }


}
