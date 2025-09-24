
/*import { useEffect, useState } from "react";
import "./Home.scss";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/data/products") // adapte l'URL à ton backend
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des produits :", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Chargement...</p>;

  return (
    <div className="home">
      <h1 className="title">Boutique de Parfums</h1>



      

      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <h2>{product.name}</h2>
            <img className="imgParfum" src={product.image} alt ='Image de Parfum'/>
            <p className="description">{product.description}</p>
            <p className="price">{product.price} €</p>
            <button>Ajouter au panier</button>
          </div>
        ))}
      </div>
    </div>
  );
}
*/
// pages/Home.jsx
import React, { useState, useEffect } from "react";
import SearchBar from "../../src/components/searchBar/searchBar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/data/products.json");
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
    navigate(`/product/${id}`); // redirige vers la page produit (carrousel)
  };

  return (
    <div className="p-4">
      <SearchBar onSearch={handleSearch} />

      <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-3">
        {filtered.map((product) => (
          <div
            key={product.id}
            // className="p-3 transition border rounded-lg shadow cursor-pointer hover:shadow-md card"
                       className="card"

            onClick={() => handleClickProduct(product.id)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-40 rounded-md card_img"
            />
            <h3 className="mt-2 font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="mt-1 font-bold text-pink-600">{product.price} €</p>
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default Home;
