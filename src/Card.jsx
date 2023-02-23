import { useEffect, useState } from "react";
import "./App.css";

export default function Card({ src, handleClick, alt }) {
  return (
    <button onClick={handleClick}>
      <img className="card-img" src={src} alt={alt}></img>
    </button>
  );
}
