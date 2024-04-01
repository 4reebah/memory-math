import { useState } from "react";
import Tile from "./Tile.js";

const Tiles = () => {
  const [tiles, setTiles] = useState([
    { id: 1, number: Math.floor(Math.random() * 20) + 1, stateOfTile: "" },
    { id: 2, number: Math.floor(Math.random() * 20) + 1, stateOfTile: "" },
    { id: 3, number: Math.floor(Math.random() * 20) + 1, stateOfTile: "" },
    { id: 4, number: Math.floor(Math.random() * 20) + 1, stateOfTile: "" },
    { id: 5, number: Math.floor(Math.random() * 20) + 1, stateOfTile: "" },
    { id: 6, number: Math.floor(Math.random() * 20) + 1, stateOfTile: "" },
    { id: 7, number: Math.floor(Math.random() * 20) + 1, stateOfTile: "" },
    { id: 8, number: Math.floor(Math.random() * 20) + 1, stateOfTile: "" },
    { id: 9, number: Math.floor(Math.random() * 20) + 1, stateOfTile: "" },
    { id: 10, number: Math.floor(Math.random() * 20) + 1, stateOfTile: "" },
    { id: 11, number: Math.floor(Math.random() * 20) + 1, stateOfTile: "" },
    { id: 12, number: Math.floor(Math.random() * 20) + 1, stateOfTile: "" },
    { id: 13, number: Math.floor(Math.random() * 20) + 1, stateOfTile: "" },
    { id: 14, number: Math.floor(Math.random() * 20) + 1, stateOfTile: "" },
    { id: 15, number: Math.floor(Math.random() * 20) + 1, stateOfTile: "" },
    { id: 16, number: Math.floor(Math.random() * 20) + 1, stateOfTile: "" },
  ]);

  return (
    <div className="container">
      { tiles.map((tile, index) => (
        <Tile key={index} item={tile} />
      )) }
    </div>
  )
};
export default Tiles;
