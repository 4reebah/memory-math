import { useState } from "react";
import Tile from "./Tile.js";

const Tiles = () => {
  const [tiles, setTiles] = useState([
    { id: 1, number: 1, stateOfTile: "" },
    { id: 2, number: 1, stateOfTile: "" },
    { id: 3, number: 1, stateOfTile: "" },
    { id: 4, number: 1, stateOfTile: "" },
    { id: 5, number: 1, stateOfTile: "" },
    { id: 6, number: 1, stateOfTile: "" },
    { id: 7, number: 1, stateOfTile: "" },
    { id: 8, number: 1, stateOfTile: "" },
    { id: 9, number: 1, stateOfTile: "" },
    { id: 10, number: 1, stateOfTile: "" },
    { id: 11, number: 1, stateOfTile: "" },
    { id: 12, number: 1, stateOfTile: "" },
    { id: 13, number: 1, stateOfTile: "" },
    { id: 14, number: 1, stateOfTile: "" },
    { id: 15, number: 1, stateOfTile: "" },
    { id: 16, number: 1, stateOfTile: "" },
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
