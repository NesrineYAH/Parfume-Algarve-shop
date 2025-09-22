import { useState } from 'react';
import Logo from './assets/Logo-Parfumerie.JPG';
import './App.scss';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={Logo} className="logo" alt=" logo parfume Algarve" />
        </a>
       
      </div>
      <h1>Parfume-Algarve-shop</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      
      </div>
    
    </>
  )
}

export default App
