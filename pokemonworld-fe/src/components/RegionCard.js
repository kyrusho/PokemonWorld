import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap"
import EditRegion from './EditRegion';


export default function RegionCard(props) {

  const { region, updateRegion, onDeleteRegionHandler } = props;
  

  const onDelete = () => {
    onDeleteRegionHandler(region.regionId)
}

  return (
    
      <Card className="region-card mx-1 mt-3" style={{ width: '30%', borderRadius: '1rem'}}>
        <Card.Img
          variant="top"
          src={region.regionURL}
          style={{ height: '100%', width: '100%', marginTop: '1rem' }}
          className="rounded-3"
        />
        <Card.Body>
          
          <Card.Title>{region.regionName} Region</Card.Title>         

          <LinkContainer to ={"/regionpokemons"} state={{regionId: region.regionId}}>
                    <Button variant="dark" className="mt-2">
                        Explore Region
                      </Button>
          </LinkContainer> <br/> <br/>
          <>
          <EditRegion region = {region} updateRegion={updateRegion}/>
          <Button variant="danger" onClick={onDelete}>Delete</Button>
         </>
        </Card.Body>
      </Card>
    
  );
}
