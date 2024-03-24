import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Tiles from "../components/Tiles.js"

const GamePage = () => {
    return (
        <div className="bg-[#ABCBE2] w-3/4">
            <Tiles></Tiles>
        </div>
        
        
    )
}
export default GamePage;