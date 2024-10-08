import { Container, Row } from "react-bootstrap";
import RegionCard from "./RegionCard";
import { useState, useEffect, useRef } from "react";
import AddRegion from "./AddRegion";
import { errorToast, successToast } from "../utils/toasts";


export default function RegionList() {
  const [regions, setRegions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const initialized = useRef(false)


  useEffect(() => {

    if(!initialized.current){
      initialized.current = true
    getAllRegions()
    }
}, []);

function getAllRegions(){
 (async() =>{
     const response = await fetch("http://localhost:8080/api/v1/regions", {
         method: "GET"
     });

     const regions= await response.json()
     setRegions(regions)
     setIsLoading(false)

     console.log(regions)
 })();
}


 if(isLoading){
     return <div><h1>Loading...</h1></div>
 }

 function updateRegion(id, updatedRegion){

  var regionRequestDTO = {
    regionName: updatedRegion.regionName,
    professor: updatedRegion.professor, 
    starterPokemons: updatedRegion.starterPokemons, 
    gym_leaders: updatedRegion.gym_leaders, 
    geography: updatedRegion.geography, 
    regionURL: updatedRegion.regionURL
   }

  fetch(`http://localhost:8080/api/v1/regions/${updatedRegion.regionId}`, {
      method: 'PUT',
      //header will define what is the format of the data we'll send and recieve
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(regionRequestDTO)
  })
  //if async isnt use, the app could freeze while waiting for response. async will say when u recieve a response, send it to us and while we wait we can still work. Async allows us to not wait and continue working.
  .then(async response => {
      const isJson = response.headers.get('content-type')?.includes('application/json'); //the ? is like an option operation meaning that its possible tha we dont recieve a content-type.
      const data = isJson && await response.json();
      

      //check for error
      if(!response.ok){
          const error = (data && data.message) || response.status;
          console.log("post error occured")
          return Promise.reject(error);
      }else{
        successToast("Updated " + updatedRegion.regionName + " Region Successfully")
        console.log("Region Updated!")
        getAllRegions()
      }

      getAllRegions()

  })
}

 function addRegion(regionName, professor, starterPokemons, gym_leaders, geography, regionURL){
    console.log("RegionList addRegion")

     var regionRequestDTO = {
      regionName: regionName,
      professor: professor, 
      starterPokemons: starterPokemons, 
      gym_leaders: gym_leaders, 
      geography: geography, 
      regionURL: regionURL
     }

     fetch("http://localhost:8080/api/v1/regions", {
         method: 'POST',
         //header will define what is the format of the data we'll send and recieve
         headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
         },
         body: JSON.stringify(regionRequestDTO)
     })
     //if async isnt use, the app could freeze while waiting for response. async will say when u recieve a response, send it to us and while we wait we can still work. Async allows us to not wait and continue working.
     .then(async response => {
         const isJson = response.headers.get('content-type')?.includes('application/json'); //the ? is like an option operation meaning that its possible tha we dont recieve a content-type.
         const data = isJson && await response.json();
         

         //check for error
         if(!response.ok){
             const error = (data && data.message) || response.status;
             console.log("post error occured")
             return Promise.reject(error);
         }else{
            successToast("Added " + regionName + " Region Successfully")
            console.log("Region Added!")
            getAllRegions()
          }

         getAllRegions()

     })
 }

 async function deleteRegionHandler(regionId){

  const response = await fetch(`http://localhost:8080/api/v1/regions/${regionId}`, {
      method: 'DELETE',
      //header will define what is the format of the data we'll send and recieve
      headers: {
          'Content-Type': 'application/json',
      },
  })
  .then(response => {
      const isJson = response.headers.get('content-type')?.includes('application/json');

      if(response.status === 204){
          successToast("Delete " + regionId+ " Successful")
          console.log("Region Deleted!")
          getAllRegions()
      } else if (response.status === 422) {
        errorToast("Cannot delete Region " + regionId);
     }
     
  })
  .catch(function(error){
      console.log("an unknown error occured")
      return Promise.reject(error)
  })
}
 


  return (
    <Container fluid>
      <AddRegion addingRegion={addRegion}/>
      <Row sm={2} lg={4} className="justify-content-evenly">
        {regions.map((region) => 
          <RegionCard key={region.regionId} region={region} updateRegion={updateRegion} onDeleteRegionHandler={deleteRegionHandler}/>
        )}

      </Row>
    </Container>
  );
}
