
import { useEffect, useState } from "react";
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
            <img src={product.image} alt={product.name} />
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
