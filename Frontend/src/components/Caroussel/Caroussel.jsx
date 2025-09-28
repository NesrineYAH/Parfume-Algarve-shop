import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import "./Caroussel.scss";

const Caroussel = () => {
  const { id } = useParams(); //useParams() renvoie toujours une chaîne de caractères (string). Mais tes p.id venant du backend sont probablement des nombres (number).
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/data/products"); 
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

  //const product = products.find((p) => p.id === id);
const product = products.find((p) => String(p.id) === id);

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
      {product.pictures?.map((pic, index) => (
        <div key={index} className="img_carousel">
          <img src={pic} alt={`photo ${index}`} />
        </div>
      ))}
    </Carousel>
  );
};

export default Caroussel;
