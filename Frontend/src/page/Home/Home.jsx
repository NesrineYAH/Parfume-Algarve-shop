import React, { useState, useEffect } from "react";
import SearchBar from "../../components/searchBar/searchBar.jsx";
import { useNavigate } from "react-router-dom";
import "./Home.scss";
import { Link } from "react-router-dom";


const Home = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("http://localhost:5000/data/products");
      const data = await res.json();
      setProducts(data);
      setFiltered(data);
    };
    fetchProducts();
  }, []);

  const handleSearch = (query) => {
    const results = products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(results);
  };

  const handleClickProduct = (id) => {
    navigate(`/Product/${id}`); // redirige vers la page produit (carrousel)
  };

  return (
    <div className="home">
      <SearchBar onSearch={handleSearch} className="searchBar" />

      <div className="grid">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="card"
            onClick={() => handleClickProduct(product.id)}
          >
            <img  src={product.image}
              alt={product.name}
              className="card_img"
            />
          <Link to={`/Product/${product.id}`} target="_blank" className="btn_text">
              </Link> 


            
            <h3 className="">{product.name}</h3>
            <p className="">{product.description}</p>
            <p className="">{product.price} €</p>
            <button className="btn" >Ajouter au panier</button>
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default Home;
