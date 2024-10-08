import { useLocation } from "react-router-dom";
import { Container, Row } from "react-bootstrap"
import RegionDetails from "./RegionDetails";


export default function PokemonRegionList(){

    const { state } = useLocation();

    return(
        <Container fluid>
            <RegionDetails region={state.region}/>
        </Container>
    );
}