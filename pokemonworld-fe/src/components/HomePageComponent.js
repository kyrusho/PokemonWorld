import { LinkContainer } from 'react-router-bootstrap';
import { Container } from 'react-bootstrap';

export default function MapComponent() {
  return (
    <Container fluid style={{ padding: '20px', textAlign: 'center' }}>
      <div>
        <LinkContainer to="/map">
          <img
            src="https://static-ca.gamestop.ca/images/products/761314/3max.jpg"
            className="hover-effect"
            width="60%"
            height='auto'
            alt="welcome image pokemons"
          />
        </LinkContainer>
      </div>
    </Container>
  );
}
