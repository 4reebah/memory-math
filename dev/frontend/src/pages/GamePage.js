import { useState, useEffect } from "react";
import Tiles from "../components/Tiles.js";
import { Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

const GamePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <nav
        className="bg-[#ABCBE2] flex justify-between items-center"
        style={{ fontFamily: "Delius Unicase, cursive" }}
      >
        <a href="/" class="flex items-center space-x-2 rtl:space-x-reverse">
          <span class="self-center text-xl font-semibold m-[20px] mt-[25px]  text-black">
            Memory Math-O-Rama
          </span>
        </a>
        <div className="space-x-4 mr-5">
          <Button
            className=" text-black bg-[#F2D13A] text-md"
            style={{ fontFamily: "Delius Unicase, cursive" }}
            onClick={() => navigate('/game')}
          >
            Play Game
          </Button>
          <Button
            className=" text-black bg-[#F2D13A] text-md"
            style={{ fontFamily: "Delius Unicase, cursive" }}
            onClick={() => navigate('/admin')}
          >
            Admin Dashboard
          </Button>
          <Button
            className=" text-black bg-[#F2D13A] text-md"
            style={{ fontFamily: "Delius Unicase, cursive" }}
            onClick={() => navigate('/')}
          >
            Log Out
          </Button>
        </div>
      </nav>
      <div className="bg-yellow-50 h-screen flex justify-center items-center">
        <div className="bg-[#ABCBE2] w-fit p-5 justify-center items-center align-center mt-5">
          <Tiles></Tiles>
        </div>
      </div>
    </div>
  );
};
export default GamePage;
