import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handlePlay = (event) => {
    event.preventDefault();
    navigate("/login");
  };
  const handlePlayAsGuest = (event) => {
    event.preventDefault();
    navigate("/game");
  };
  return (
    <div>
       <nav
        className="bg-[#ABCBE2]"
        style={{ fontFamily: "Delius Unicase, cursive" }}
      >
        <a href="/" class="flex items-center space-x-2 rtl:space-x-reverse">
          <span class="self-center text-xl font-semibold ml-[20px] mt-[25px] text-black">
            Memory Math-O-Rama
          </span>
        </a>
      </nav>
    <div className="flex items-center flex-col justify-center h-screen bg-[#ABCBE2]">
          <p className="text-8xl justify-center mb-20 text-center" style={{ fontFamily: "Delius Unicase, cursive" }}>
            <b>Memory Math-O-Rama!</b>
          </p>
          <div className="flex flex-col gap-4">
            <Button className=" text-black text-3xl bg-[#F2D13A]" onClick={handlePlay} style={{ fontFamily: "Delius Unicase, cursive" }}>
              Play
            </Button>
            <Button className=" text-black text-3xl bg-[#F2D13A]" onClick={handlePlayAsGuest} style={{ fontFamily: "Delius Unicase, cursive" }}>
              Play as Guest
            </Button>
          </div>
    
    </div>
    </div>
  );
};
export default HomePage;
