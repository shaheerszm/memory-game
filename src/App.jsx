import { useEffect, useState, useRef } from "react";
import "./App.css";
import Card from "./Card";

function App() {
  const numImages = 12;
  const apiKey = import.meta.env.VITE_pixabay_api_key;
  const searchTerm = "kitten";
  var URL = "https://pixabay.com/api/?key=" + apiKey + "&q=" + searchTerm;

  const [images, setImages] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  let prevImgs = useRef([]);

  //on mount, fetch images
  useEffect(() => {
    async function getImages() {
      let response = await fetch(URL);
      response = await response.json();
      let imageList = [];
      for (let hit of response.hits) {
        imageList.push(hit.webformatURL);
      }
      imageList = shuffle(imageList);
      imageList.length = numImages;

      setImages(imageList);
    }
    getImages();
  }, []);

  useEffect(() => {}, [images]);

  // Durstenfeld algorithm
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function correct() {
    setScore((x) => x + 1);
  }
  function incorrect() {
    setScore(0);
    alert("You already picked that one!");
  }

  function cardClick(e) {
    e.preventDefault();

    let picked = e.target.src;
    let nextImages = shuffle(images);
    setImages(nextImages);
    if (prevImgs.current.includes(e.target.src)) {
      incorrect();
    } else {
      correct();
    }
    prevImgs.current.push(picked);
  }

  function listImages(images) {
    return images.map((img) => (
      <Card
        src={img}
        alt="alt-text"
        key={img.slice(-30, -4)}
        onClick={cardClick}
      ></Card>
    ));
  }

  return (
    <>
      <header>
        <h1 className="title">Kitty Memory</h1>
        <div className="score">
          <h2 className="scores" id="score-best">
            Best score: {bestScore}
          </h2>
          <h2 className="scores" id="score-now">
            Current score: {score}
          </h2>
        </div>
      </header>
      <main>{listImages(images)}</main>
      <footer>Copyright © 2023 Shaheer Amjad</footer>
    </>
  );
}

export default App;
