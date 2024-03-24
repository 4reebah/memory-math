import { useState } from "react";

const Tile = ({item}) => {
  return (
    <div className="bg-white flex justify-center items-center rounded-md text-7xl card">
      <p className=".card number">{item.number}</p>
    </div>
  );
};
export default Tile;
