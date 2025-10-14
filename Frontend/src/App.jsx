import "./App.scss";
import Headers from "./components/Header/Header.jsx";
import  Home  from "./page/Home/Home.jsx";
import Caroussel from "./components/Caroussel/Caroussel.jsx";
import { Routes, Route } from 'react-router-dom';

import Auth from "./page/Auth/Auth.jsx";


function App() {

  return (
    <>
      <div className="App">
             <Headers />
        <h1>Parfume-Algarve-shop</h1>
        <h2>Welcome to Parfume Algarve shop</h2>

        <Home />
    <Caroussel />
    
 
      <Routes>
             <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
      </Routes>




 
   
      </div>
    </>
  );
}

export default App;
 /*
 <Route path="/register" element={<Register />} />
<Route path="/login" element={<Login />} />
        */ 