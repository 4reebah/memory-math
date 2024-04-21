import { useState, useEffect } from "react";
import Tiles from "../components/Tiles.js";

const GamePage = () => {
  return (
    <div>
      <nav
        className="bg-[#ABCBE2]"
        style={{ fontFamily: "Delius Unicase, cursive" }}
      >
        <a href="/" class="flex items-center space-x-2 rtl:space-x-reverse">
          <span class="self-center text-xl font-semibold m-[20px] mt-[25px]  text-black">
            Memory Math-O-Rama
          </span>
        </a>
      </nav>
      <div className="bg-yellow-50 h-screen flex justify-center items-center">
        <div className="bg-[#ABCBE2] w-fit p-5 justify-center align-center mt-5">
          <Tiles></Tiles>
        </div>
      </div>
    </div>    
  );
};
export default GamePage;
