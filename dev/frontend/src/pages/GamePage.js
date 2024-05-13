import { useState, useEffect } from "react";
import Tiles from "../components/Tiles.js";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const GamePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!Cookies.get("auth");
  const [username, setUsername] = useState("");
  const [adminStatus, setAdminStatus] = useState(0);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    if (Cookies.get("auth")) {
      const authCookie = Cookies.get("auth");
      const id = JSON.parse(authCookie).user_id;

      const usernameFromCookie = JSON.parse(authCookie).username;
      setUsername(usernameFromCookie);

      const adminFromCookie = JSON.parse(authCookie).adminStatus;
      setAdminStatus(adminFromCookie);

      fetch(`http://127.0.0.1:5000/user_data?userId=${id}`)
        .then((response) => response.json())
        .then((userData) => {
          setUserInfo(userData);
          console.log(userData);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
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
          <span class="self-center text-xl font-semibold m-[20px] mt-[25px]  text-black">
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
          <Tiles></Tiles>
          {(username &&
          <div
            style={{ fontFamily: "Delius Unicase, cursive" }}
            className="flex flex-row justify-between mt-5"
          >

            <p className="mt-3 text-lg">
              <div>
                <b>SHORTEST TIME:</b> {userInfo["SHORTEST_TIME"] !== 0 ? `${userInfo["SHORTEST_TIME"]}` : "___"} seconds
              </div>
            </p>
            <p className="mt-3 text-lg">
              <b>LOWEST NUMBER OF MISTAKES:</b> {userInfo["LOWEST_NUMBER_OF_MISTAKES"] !== -1 ? userInfo["LOWEST_NUMBER_OF_MISTAKES"] : "___"}
            </p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};
export default GamePage;
