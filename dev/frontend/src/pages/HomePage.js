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
    <div className="flex items-center justify-center h-screen">
      <div className="w-full bg-[#ABCBE2] rounded-lg shadow-md md:mt-0 max-w-4xl xl:p-0">
        <div className="flex flex-col items-center justify-center border px-9 py-8 rounded-md">
          <p className="text-6xl justify-center text-center">
            MEMORY MATH-O-RAMA!
          </p>
          <div className="flex flex-col gap-4">
            <Button className="font-loveYaLikeASister text-black text-3xl bg-[#F2D13A]" onClick={handlePlay}>
              PLAY
            </Button>
            <Button className="font-loveYaLikeASister text-black text-3xl bg-[#F2D13A]" onClick={handlePlayAsGuest}>
              PLAY AS GUEST
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
