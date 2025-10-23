import React, { useState, useEffect } from "react";


export default function Parfum({ parfum }) {
  return (
    <div className="p-4 border rounded-lg shadow">
      <h2>{parfum.nom}</h2>
      <p>{parfum.marque}</p>
      <p>{parfum.prix} €</p>
    </div>
  );
}
