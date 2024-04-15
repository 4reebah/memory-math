import { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Tiles from "../components/Tiles.js";

const GamePage = () => {
  const [running, setRunning] = useState(true);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [running]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

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
        <div className="bg-[#ABCBE2] w-fit p-5 justify-center align-center">
          <Tiles></Tiles>
          <div style={{ fontFamily: "Delius Unicase, cursive" }} className="flex flex-row justify-between">
            <p className="mt-3 text-lg">
              <b> TIMER:</b> {formatTime(time)}
            </p>
            <p className="mt-3 text-lg">
              <b>Number of Mistakes:</b> {0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GamePage;
