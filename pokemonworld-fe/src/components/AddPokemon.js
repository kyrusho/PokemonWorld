import { useState, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';


export default function AddPokemon(props) {
  const {addingPokemon, regionOptions} = props;

  const [show, setShow] = useState(false); 

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
    // Add more abilities as needed
  ];
  
  // Generate dual-ability combinations
  const dualAbilities = allAbilities.flatMap((ability1) =>
    allAbilities.map((ability2) => (ability1 !== ability2 ? `${ability1}/${ability2}` : null))
  );


//submitting the edited pokemon
const handleSubmit = (event) => {
    event.preventDefault(); 

    console.log("Name is: "+ event.target[0].value)
    console.log("Type is: "+ event.target[1].value)
    console.log("Ability is: "+ event.target[3].value)
    console.log("Region is: "+ event.target[2].value)
    console.log("Weight is: "+ event.target[5].value)
    console.log("Height is: "+ event.target[6].value)
    console.log("Classification is: "+ event.target[7].value)
    console.log("PokemonURL is: "+ event.target[4].value)


    //if posterURL is null, maybe add a default image
    var pokemonURL = "https://media.istockphoto.com/id/1354776457/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=w3OW0wX3LyiFRuDHo9A32Q0IUMtD4yjXEvQlqyYk9O4="
    if(event.target[4].value && event.target[4].value !==""){
        pokemonURL = event.target[4].value;
    }

    //get DirectorId
    var region = regionOptions.find(region => 
      region.regionName === event.target[2].value)

    var ability = event.target[3].value

    //callback function in movieslist
    addingPokemon(event.target[0].value,
    event.target[1].value,
    region.regionId,  
    ability,
    pokemonURL,
    event.target[5].value,
    event.target[6].value,
    event.target[7].value)

    handleClose();
};



//form layout

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Add Pokemon
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
          <Modal.Header closeButton>
            <Modal.Title>Add Pokemon</Modal.Title>
          </Modal.Header>
        <Modal.Body>

        <Form id='addmodal' onSubmit={handleSubmit}>

          <Form.Group className="mb-3" controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="Name" required type='text'/>
          </Form.Group>

          <Row className="mb-3">

          <Form.Group as={Col} className='mb-3' controlId='formGridTypee'>
            <Form.Label>Type</Form.Label>
            <Form.Select defaultValue="Choose...">
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
              <Form.Select defaultValue="Choose...">
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
              <Form.Select defaultValue="Choose...">
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

            </Row>

            <Row className="mb-3">

              <Form.Group as={Col} controlId='formGridPokemonURL'>
                <Form.Label>Pokemon URL</Form.Label>
                <Form.Control placeholder="http://yourpokemonsurl.com" required type='url'/>
              </Form.Group>

            </Row>

            <Row className="mb-3">

              <Form.Group as={Col} controlId='formGridWeight'>
                <Form.Label>Weight</Form.Label>
                <Form.Control placeholder="0.0lbs" required type='text'/>
              </Form.Group>

              <Form.Group as={Col} controlId='formGridHeight'>
                <Form.Label>Height</Form.Label>
                <Form.Control placeholder="0ft 0in" required type='text'/>
              </Form.Group>
            
            </Row>

            <Row className="mb-3">

            <Form.Group as={Col} controlId='formGridClassification'>
              <Form.Label>Classification</Form.Label>
              <Form.Control placeholder='Identity of Pokemon' required type='text'/>
            </Form.Group>

            </Row>

        </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button form="addmodal" variant="primary" type="submit">Save</Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }