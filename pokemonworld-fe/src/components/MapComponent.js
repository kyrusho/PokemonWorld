import { Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";
import '../pages/HomePage.css'; // Adjust the import path

export default function MapComponent() {
    const [regions, setRegions] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/regions", {
                    method: "GET",
                });

                const data = await response.json();

                setRegions(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching regions:", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const getRegionByName = (name) => regions && regions.find(region => region.regionName === name);

    return (
        <Container fluid className="map-container">
            <div>
                <p>MAP
                    <map name="pokemon-map">

                    <LinkContainer to='/regiondetails' state={{ region: getRegionByName("Kanto") }}>
                            <area shape="rect" coords="303,148,470,283" alt="Kanto Region" />
                        </LinkContainer>

                        <LinkContainer to='/regiondetails' state={{ region: getRegionByName("Johto") }}>
                            <area shape="rect" coords="132,148,301,282" alt="Johto Region" />
                        </LinkContainer>

                        <LinkContainer to='/regiondetails' state={{ region: getRegionByName("Hoenn") }}>
                            <area shape="rect" coords="160,285,402,437" alt="Hoenn Region" />
                        </LinkContainer>

                        <LinkContainer to='/regiondetails' state={{ region: getRegionByName("Sinnoh") }}>
                            <area shape="rect" coords="2,442,283,704" alt="Sinnoh Region" />
                        </LinkContainer>

                        <LinkContainer to='/regiondetails' state={{ region: getRegionByName("Unova") }}>
                            <area shape="rect" coords="596,256,843,402" alt="Unova Region" />
                        </LinkContainer>

                        <LinkContainer to='/regiondetails' state={{ region: getRegionByName("Kalos") }}>
                            <area shape="rect" coords="173,4,376,142" alt="Kalos Region" />
                        </LinkContainer>

                        <LinkContainer to='/regiondetails' state={{ region: getRegionByName("Alola") }}>
                            <area shape="poly" coords="3,149,2,439,156,439,131,282,128,149" alt="Alola Region" />
                        </LinkContainer>

                        <LinkContainer to='/regiondetails' state={{ region: getRegionByName("Galar") }}>
                            <area shape="poly" coords="703,192,472,194,704,191,472,195,473,400,590,401,593,250,709,250" alt="Galar Region" />
                        </LinkContainer>                    </map>
                    <img src="/allregionss.png" width="70%" height="auto" useMap="#pokemon-map" alt="Pokemon Regions Map" />
                </p>
            </div>
        </Container>
    );
}

