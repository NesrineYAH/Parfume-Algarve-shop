import "./App.scss";
import Headers from "./components/Header/Header.jsx";
import  Home  from "./page/Home/Home.jsx";
import Caroussel from "./components/Caroussel/Caroussel.jsx";

function App() {

  return (
    <>
      <div className="App">
             <Headers />
        <h1>Parfume-Algarve-shop</h1>
        <h2>Welcome to Parfume Algarve shop</h2>

        <Home />
    <Caroussel />
    
    <BrowserRouter>
    
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
   
      </div>
    </>
  );
}

export default App;
