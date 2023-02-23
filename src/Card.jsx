import { useEffect, useState } from "react";
import "./App.css";

export default function Card({ src, onClick }) {
  return (
    <button onClick={onClick}>
      <img className="card-img" src={src} alt="Kitten"></img>
    </button>
  );
}
