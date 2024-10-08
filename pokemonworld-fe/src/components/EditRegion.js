import { useState} from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



export default function EditRegion(props) {
  const {region, updateRegion} = props;

  const [show, setShow] = useState(false);

  const [regionName, setRegionName] = useState(region.regionName)
  const [professor, setProfessor] = useState(region.professor)
  const [starterPokemons, setStarterPokemons] = useState(region.starterPokemons)
  const [gym_leaders, setGym_Leaders] = useState(region.gym_leaders)
  const [geography, setGeography] = useState(region.geography)
  const [regionURL, setRegionURL] = useState(region.regionURL)



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

const handleSubmit = (event) => {
    event.preventDefault(); // Prevents refresh


    // Update the movie details
    const updatedRegion = {
        regionId: region.regionId,
    regionName: regionName,
      professor: professor, 
      starterPokemons: starterPokemons, 
      gym_leaders: gym_leaders, 
      geography: geography, 
      regionURL: regionURL
    };

    // Callback function in regionslist
    updateRegion(region.regionId, updatedRegion);

    handleClose();
};



  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Edit Region
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
          <Modal.Header closeButton>
            <Modal.Title>Edit Region</Modal.Title>
          </Modal.Header>
        <Modal.Body>

        <Form id='editmodal' onSubmit={handleSubmit}>

        <Form.Group className="mb-3" controlId="formGridRegionName">
        <Form.Label>Region Name</Form.Label>
        <Form.Control value={regionName} required type='text'
                        onChange={(e) => {
                            setRegionName(e.target.value)
                        }}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridProfessor">
        <Form.Label>Professor</Form.Label>
        <Form.Control value={professor} required type='text'
                        onChange={(e) => {
                            setProfessor(e.target.value)
                        }}/>
      </Form.Group>

      

      <Row className="mb-3">
        
      <Form.Group className="mb-3" controlId="formGridStarterPokemons">
        <Form.Label>Starter Pokemons</Form.Label>
        <Form.Control value={starterPokemons} required type='text'
                        onChange={(e) => {
                            setStarterPokemons(e.target.value)
                        }}/>
      </Form.Group>

        </Row>

        <Row className="mb-3">
        
      <Form.Group className="mb-3" controlId="formGridGymLeaders">
        <Form.Label>Gym Leaders</Form.Label>
        <Form.Control value={gym_leaders} required type='text'
                        onChange={(e) => {
                            setGym_Leaders(e.target.value)
                        }}/>
      </Form.Group>

        </Row>

        <Row className="mb-3">
        
      <Form.Group className="mb-3" controlId="formGridGeography">
        <Form.Label>Geography</Form.Label>
        <Form.Control value={geography} required type='text'
                        onChange={(e) => {
                            setGeography(e.target.value)
                        }}/>
      </Form.Group>

      </Row>

      <Row className="mb-3">

      <Form.Group className="mb-3" controlId="formGridRegionURL">
        <Form.Label>Region URL</Form.Label>
        <Form.Control value={regionURL} type='text'
                        onChange={(e) => {
                            setRegionURL(e.target.value)
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