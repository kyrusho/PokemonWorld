package com.example.pokemonworld.dataaccesslayer.regions;

import com.example.pokemonworld.dataaccesslayer.pokemons.Pokemon;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
@Entity
@Table(name = "regions")
@Data
@NoArgsConstructor

public class Region {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; //database id

    @Column(name = "regionid")
    private String regionId;

    @Column(name = "regionname")
    private String regionName;

    @Column(name="professor")
    private String professor;

    @Column(name = "starterpokemons")
    private String starterPokemons;

    @Column(name = "gym_leaders")
    private String gym_leaders;

    @Column(name = "geography")
    private String geography;

    @Column(name = "regionurl")
    private String regionURL;

    @OneToMany(mappedBy = "region")
    private Set<Pokemon> pokemons;
}
