
drop table regions if exists;
create table regions(
    id INT NOT NULL AUTO_INCREMENT,
    regionid VARCHAR(36) NOT NULL UNIQUE,
    regionname VARCHAR(255) NOT NULL,
    professor VARCHAR(255) NOT NULL,
    starterpokemons VARCHAR(255) NOT NULL,
    gym_leaders VARCHAR(2000) NOT NULL,
    geography VARCHAR(2000) NOT NULL,
    regionurl VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);


drop table pokemons if exists;
create table pokemons(
                         id  INT NOT NULL AUTO_INCREMENT,
                         pokemonid VARCHAR(36) NOT NULL UNIQUE,
                         name VARCHAR(255) NOT NULL,
                         typee VARCHAR(255) NOT NULL,
                         regionid VARCHAR(36) NOT NULL,
                         ability VARCHAR(255) NOT NULL,
                         weight VARCHAR(255) NOT NULL,
                         height VARCHAR(255) NOT NULL,
                         classification VARCHAR(255) NOT NULL,
                         pokemonurl VARCHAR(255) NOT NULL,
                         PRIMARY KEY (id),
                         FOREIGN KEY (regionid) references regions(regionid)

);