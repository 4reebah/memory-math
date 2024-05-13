import { useState, useEffect } from "react";
import Tiles from "../components/Tiles.js";
import { Button } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import Cookies from "js-cookie";

const EndGamePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!Cookies.get("auth");
  const [username, setUsername] = useState("");
  const [adminStatus, setAdminStatus] = useState(0);
  const location = useLocation();
  const [showConfetti, setShowConfetti] = useState(true);
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const { time, numberMistakes } = location.state;

  useEffect(() => {
    if (Cookies.get("auth")) {
      const authCookie = Cookies.get("auth");

      const usernameFromCookie = JSON.parse(authCookie).username;
      setUsername(usernameFromCookie);

      const adminFromCookie = JSON.parse(authCookie).adminStatus;
      setAdminStatus(adminFromCookie);
    }
  }, []);

  useEffect(() => {
    if (Cookies.get("auth")) {
      const authCookie = Cookies.get("auth");
      const id = JSON.parse(authCookie).user_id;
      console.log(id);
      const userStats = {
        userId: id,
        time: time,
        mistakes: numberMistakes,
      };

      fetch("http://127.0.0.1:5000/update_user_data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userStats),
      })
        .then((response) => response.json())
        .then((updateUser) => {
          console.log(updateUser);
          console.log("here");
        })
        .catch((error) => console.log(error));
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 15000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove("auth");
    navigate("/");
  };

  return (
    <div>
      <nav
        className="bg-[#ABCBE2] flex justify-between items-center"
        style={{ fontFamily: "Delius Unicase, cursive" }}
      >
        <a href="/" class="flex items-center space-x-2 rtl:space-x-reverse">
          <span class="self-center text-xl font-semibold m-[20px] mt-[25px] text-black">
            Memory Math-O-Rama
          </span>
        </a>
        <div className="space-x-4 mr-5">
          <Button
            className=" text-black bg-[#F2D13A] text-md"
            style={{ fontFamily: "Delius Unicase, cursive" }}
            onClick={() => navigate("/game")}
          >
            Play Game
          </Button>
          {isAuthenticated && adminStatus === 1 && (
            <Button
              className=" text-black bg-[#F2D13A] text-md"
              style={{ fontFamily: "Delius Unicase, cursive" }}
              onClick={() => navigate("/admin")}
            >
              Admin Dashboard
            </Button>
          )}
          {isAuthenticated && (
            <Button
              className=" text-black bg-[#F2D13A] text-md"
              style={{ fontFamily: "Delius Unicase, cursive" }}
              onClick={handleLogout}
            >
              Log Out
            </Button>
          )}
        </div>
      </nav>
      <div className="bg-yellow-50 h-screen flex justify-center items-center">
        <div className="bg-[#ABCBE2] w-fit p-5 justify-center items-center align-center mt-5 rounded-md">
          <div
            className="end flex flex-col justify-center items-center"
            style={{ fontFamily: "Delius Unicase, cursive" }}
          >
            <div className="text-8xl mb-5 text-bold">You Win!</div>
            {showConfetti && <Confetti width={windowWidth} height={windowHeight} />}
            <div className="text-black text-lg">
              <b>Time:</b> {location.state ? formatTime(time) : 0}{" "}
            </div>
            <div className="text-black text-lg">
              <b>Number of Mistakes:</b> {location.state ? numberMistakes : 0}{" "}
            </div>
            <Button
              className=" text-black text-3xl mt-10 bg-[#F2D13A]"
              style={{ fontFamily: "Delius Unicase, cursive" }}
              onClick={() => navigate("/game")}
            >
              Play Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EndGamePage;
