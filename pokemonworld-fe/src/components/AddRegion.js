import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function AddRegion({addingRegion}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



const handleSubmit = (event) => {
  event.preventDefault(); 

    const regionName = event.target[0].value;
    const professor = event.target[1].value;
    const starterPokemons = event.target[2].value;
    const gym_leaders = event.target[3].value;
    const geography = event.target[4].value;




    //if regionURL is null, maybe add a default image
        var regionURL = "https://static.wikia.nocookie.net/essentialsdocs/images/c/c4/Region.png/revision/latest?cb=20190822193258"
        if(event.target[5].value && event.target[5].value !==""){
          regionURL = event.target[5].value;
        }

    addingRegion(regionName, professor, starterPokemons, gym_leaders, geography, regionURL)

    handleClose()
}


  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Add Region
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Region</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form id='addmodal' onSubmit={handleSubmit}>


      <Form.Group className="mb-3" controlId="formGridRegionName">
        <Form.Label>Region Name</Form.Label>
        <Form.Control placeholder="Region's Name" required type='text'/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridProfessor">
        <Form.Label>Professor</Form.Label>
        <Form.Control placeholder="Professor Name" required type='text'/>
      </Form.Group>

      

      <Row className="mb-3">
        
      <Form.Group className="mb-3" controlId="formGridStarterPokemons">
        <Form.Label>Starter Pokemons</Form.Label>
        <Form.Control placeholder="Starter1, Starter2, and Starter3" required type='text'/>
      </Form.Group>

        </Row>

        <Row className="mb-3">
        
      <Form.Group className="mb-3" controlId="formGridGymLeaders">
        <Form.Label>Gym Leaders</Form.Label>
        <Form.Control placeholder="Gym Leader1, Gym Leader2, Gym Leader3, etc" required type='text'/>
      </Form.Group>

        </Row>

        <Row className="mb-3">
        
      <Form.Group className="mb-3" controlId="formGridGeography">
        <Form.Label>Geography</Form.Label>
        <Form.Control placeholder="Region's Geography information" required type='text'/>
      </Form.Group>

      </Row>

      <Row className="mb-3">

      <Form.Group className="mb-3" controlId="formGridRegionURL">
        <Form.Label>Region URL</Form.Label>
        <Form.Control placeholder="http://yourregionsurl.com" type='text'/>
      </Form.Group>

        </Row>

    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button form="addmodal" variant="primary" type='submit'>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}