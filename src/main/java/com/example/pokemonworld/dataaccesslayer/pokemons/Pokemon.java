package com.example.pokemonworld.dataaccesslayer.pokemons;


import com.example.pokemonworld.dataaccesslayer.regions.Region;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "pokemons")
@NoArgsConstructor
@Data
public class Pokemon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; //database id

    @Column(name = "pokemonid")
    private String pokemonId;

    private String name;

    @Column(name = "typee")
    private String typee;


    @ManyToOne
    @JoinColumn(name = "regionid", referencedColumnName = "regionid")
    private Region region;

    @Column(name = "ability")
    private String ability;

    @Column(name = "weight")
    private String weight;

    @Column(name = "height")
    private String height;

    @Column(name = "classification")
    private String classification;

    @Column(name = "pokemonurl")
    private String pokemonURL;



}
