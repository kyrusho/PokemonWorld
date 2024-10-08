import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Pokemon from "./pages/Pokemon";
import Region from "./pages/Region";
import MyNavBar from "./components/MyNavBar";
import PokemonRegionList from "./components/PokemonRegionList";
import RegionPokemonsList from "./components/RegionPokemonsList";
import RegionDetails from "./components/RegionDetails";
import MapComponent from "./components/MapComponent";
import Map from "./pages/Map";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";



function App() {
  return (
    <>
    <ToastContainer/>
    <Router>
      <MyNavBar />
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        <Route path="/pokemons" element={<Pokemon/>}/>
        <Route path="/regions" element={<Region/>}/>
        <Route path="/pokemonregion" element={<PokemonRegionList/>}/>
        <Route path="/regionpokemons" element={<RegionPokemonsList/>}/>
        <Route path="/regiondetails" element={<RegionDetails/>}/>
        <Route path="/map" element={<Map/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;