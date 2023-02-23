import { useEffect, useState } from "react";
import "./App.css";

export default function Card({ src, handleClick }) {
  return (
    <button onClick={handleClick}>
      <img className="card-img" src={src} alt="Kitten"></img>
    </button>
  );
}
