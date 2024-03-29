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
      <div className="w-full bg-[#ABCBE2] rounded-lg shadow-md md:mt-0 max-w-6xl xl:p-0">
        <div className="flex flex-col items-center justify-center border px-9 py-8 rounded-md">
          <p className="text-6xl justify-center text-center">
            <b>Memory Math-O-Rama!</b>
          </p>
          <div className="flex flex-col gap-4">
            <Button className="font-Delius Unicase text-black text-3xl bg-[#F2D13A]" onClick={handlePlay}>
              Play
            </Button>
            <Button className="font-Delius Unicase text-black text-3xl bg-[#F2D13A]" onClick={handlePlayAsGuest}>
              Play as Guest
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
