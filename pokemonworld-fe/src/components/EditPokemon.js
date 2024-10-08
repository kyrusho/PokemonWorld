import { useState, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';


export default function EditPokemon(props) {
const {pokemon, updatePokemon, regionOptions} = props

const [show, setShow] = useState(false); //help
const [name, setName] = useState(pokemon.name)
const [typee, setTypee] = useState(pokemon.typee)
const [ability, setAbility] = useState(pokemon.ability)
const [weight, setWeight] = useState(pokemon.weight)
const [height, setHeight] = useState(pokemon.height)
const [classification, setClassification] = useState(pokemon.classification)
const [pokemonURL, setPokemonURL] = useState(pokemon.pokemonURL)
const [regionName, setRegionName] = useState(pokemon.region.regionName)


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const allTypes = [
    'Normal',
    'Fire',
    'Water',
    'Grass',
    'Electric',
    'Ice',
    'Fighting',
    'Poison',
    'Ground',
    'Flying',
    'Psychic',
    'Bug',
    'Rock',
    'Ghost',
    'Dark',
    'Steel',
    'Dragon',
    'Fairy'
  ];
  
  // Generate dual-type combinations
  const dualTypes = allTypes.flatMap((type1) =>
    allTypes.map((type2) => (type1 !== type2 ? `${type1}/${type2}` : null))
  );

  const allAbilities = [
    'Overgrow',
    'Blaze',
    'Torrent',
    'Chlorophyll',
    'Static',
    'Levitate',
    'Inner Focus',
    'Poison Point',
    'Sand Veil',
    'Keen Eye',
    'Synchronize',
    'Swarm',
    'Rock Head',
    'Levitate',
    'Shadow Tag',
    'Dark Aura',
    'Sturdy',
    'Dragon Claw',
    'Fairy Aura',
  ];
  
  // Generate dual-ability combinations
  const dualAbilities = allAbilities.flatMap((ability1) =>
    allAbilities.map((ability2) => (ability1 !== ability2 ? `${ability1}/${ability2}` : null))
  );

//submitting the edited pokemon
const handleSubmit = (event) => {
    event.preventDefault();

    // Get regionId
    const region = regionOptions.find((region) => region.regionName === regionName);

    // Update the pokemon details
    const updatedPokemon = {
        pokemonId: pokemon.pokemonId,
        name: name,
        typee: typee,
        region: region,
        ability: ability,
        pokemonURL: pokemonURL,
        weight: weight,
        height: height,
        classification: classification,
    };

    // Callback function in pokemonsList
    updatePokemon(pokemon.pokemonId, updatedPokemon);

    handleClose();
};



//form layout

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Edit Pokemon
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
          <Modal.Header closeButton>
            <Modal.Title>Edit Pokemon</Modal.Title>
          </Modal.Header>
        <Modal.Body>

        <Form id='editmodal' onSubmit={handleSubmit}>

          <Form.Group className="mb-3" controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control value={name} required type='text'
                        onChange={(e) => {
                            setName(e.target.value)
                        }}/>
          </Form.Group>

          <Row className="mb-3">

          <Form.Group as={Col} className='mb-3' controlId='formGridTypee'>
            <Form.Label>Type</Form.Label>
            <Form.Select value={typee}
                          onChange={(e) => {
                            setTypee(e.target.value)
                          }}>
                  <option value="">Choose...</option>
                  {allTypes.map((allTypes,i) => {
                    return(
                      <option key={i} value={allTypes}>
                            {allTypes}
                        </option>
                    )
                  })}
                  {dualTypes.map((dualTypes,i) => {
                    return(
                      <option key={i} value={dualTypes}>
                            {dualTypes}
                        </option>
                    )
                  })}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridRegion">
              <Form.Label>Region</Form.Label>
              <Form.Select value={regionName}
                            onChange={(e) => {
                                setRegionName(e.target.value)
                            }}>
                <option value="">Choose...</option>
                {regionOptions && regionOptions.map((region, i) => {
                    return(
                        <option key={i} value={region.regionName}>
                            {region.regionName}
                        </option>
                )}
                )}
              </Form.Select>
            </Form.Group>

            </Row>


          <Row className="mb-3">

          <Form.Group as={Col} controlId='formGridAbility'>
              <Form.Label>Ability</Form.Label>
              <Form.Select value={ability}
                            onChange={(e) => {
                              setAbility(e.target.value)
                            }}>
                    <option value="">Choose...</option>
                    {allAbilities.map((allAbilities,i) => {
                      return(
                        <option key={i} value={allAbilities}>
                              {allAbilities}
                          </option>
                      )
                    })}
                    {dualAbilities.map((dualAbilities,i) => {
                      return(
                        <option key={i} value={dualAbilities}>
                              {dualAbilities}
                          </option>
                      )
                    })}

              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId='formGridClassification'>
              <Form.Label>Classification</Form.Label>
              <Form.Control value={classification} required type='text'
                            onChange={(e) => {
                              setClassification(e.target.value)
                            }}/>
            </Form.Group>

            </Row>

            <Row className="mb-3">

              <Form.Group as={Col} controlId='formGridPokemonURL'>
                <Form.Label>Pokemon URL</Form.Label>
                <Form.Control value={pokemonURL} required type='url'
                              onChange={(e) => {
                                setPokemonURL(e.target.value)
                              }}/>
              </Form.Group>

            </Row>

            <Row className="mb-3">

              <Form.Group as={Col} controlId='formGridWeight'>
                <Form.Label>Weight</Form.Label>
                <Form.Control value={weight} required type='text'
                              onChange={(e) => {
                                setWeight(e.target.value)
                              }}/>
              </Form.Group>

              <Form.Group as={Col} controlId='formGridHeight'>
                <Form.Label>Height</Form.Label>
                <Form.Control value={height} required type='text'
                              onChange={(e) => {
                                setHeight(e.target.value)
                              }}/>
              </Form.Group>
            
            </Row>


        </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button form="editmodal" variant="primary" type="submit">Save</Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }