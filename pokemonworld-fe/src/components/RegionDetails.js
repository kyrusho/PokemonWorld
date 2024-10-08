import React from 'react';
import  Button  from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';

export default function RegionDetails() {
    const location = useLocation();
    const region = location.state?.region || null;
    

    if (!region) {
        return <div><strong>No region data available.</strong></div>;
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', marginBottom: '50px' }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
                <h1>Welcome to {region.regionName} Region</h1>
                <img
                    src={region.regionURL}
                    alt={`${region.regionName} Region`}
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
                <div style={{textAlign: 'right', paddingRight: '12%'}}>
                <LinkContainer to={`/regionpokemons`} state={{ regionId: region.regionId }}>
                <Button variant="dark" className="mt-2">
                  Explore Region
                </Button>
              </LinkContainer>
              </div>
                <div style={{ textAlign: 'left', paddingLeft: '15%', marginTop: '20px' }}>
                  
                    <div style={{ marginBottom: '20px' }}>
                        <h3><strong>Professor:</strong></h3> {region.professor}
                    </div>
                    <div>
                        <h3><strong>Starters:</strong></h3> {region.starterPokemons}
                    </div>
                </div>
            </div>

            <div style={{ flex: 1, margin: '7%'}}>
                <h2 style={{marginBottom: "7%", fontWeight: 'bold'}}>{region.regionName} Region Details</h2>
                <div style={{ marginBottom: '20px' }}>
                    <h3><strong>Gym Leaders:</strong></h3> {region.gym_leaders}
                </div>
                <div>
                    <h3><strong>Geography</strong></h3>
                    <div>{region.geography}</div>
                </div>
            </div>
        </div>
    );
}

