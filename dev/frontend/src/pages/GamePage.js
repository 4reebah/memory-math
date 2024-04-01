import { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Tiles from "../components/Tiles.js"

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
        return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className="bg-[#ABCBE2] w-3/4">
            <Tiles></Tiles>
            <p>{formatTime(time)}</p>

        </div>
        
        
    )
}
export default GamePage;