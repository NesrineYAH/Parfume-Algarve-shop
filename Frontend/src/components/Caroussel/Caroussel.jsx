import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Caroussel = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // ⚠️ Ici, remplace par ton API backend, ex: "http://localhost:5000/api/products"
        const res = await fetch("http://localhost:5000/api/products"); 
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("Erreur de chargement produits :", err);
      }
    };
    fetchProducts();
  }, []);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return <p>Produit introuvable</p>;
  }

  return (
    <Carousel
      className="carousel"
      showThumbs={false}
      infiniteLoop
      autoPlay
      interval={2000}
      showIndicators={false}
      showStatus={false}
    >
      {product.pictures.map((pic, index) => (
        <div key={index} className="img_carousel">
          <img src={pic} alt={`photo ${index}`} />
        </div>
      ))}
    </Carousel>
  );
};

export default Caroussel;
