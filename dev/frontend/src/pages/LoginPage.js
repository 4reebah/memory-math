import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loginSuccess, setLoginSuccess] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      username: username,
      password: password,
    };
    fetch("http://aiqbal.pythonanywhere.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((login) => {
        if (login.success) {
          const userInfo = {
            user_id: login.id,
            username: login.username,
            adminStatus: login.admin,
          }
          console.log("Login Successful!");
          console.log(userInfo);
          const expirationTime = new Date(new Date().getTime() + 3600000);
          Cookies.set('auth', JSON.stringify(userInfo), {expires: expirationTime});
          
          setLoginSuccess(true);
          navigate("/game");
        } else {
          console.log("Login Failed: ", login.message);
          setLoginSuccess(false);
        }
      })
      .catch((error) => console.log(error));
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
      <div className="flex items-center flex-col justify-center h-screen w-full bg-[#ABCBE2]">
        <div className="w-full bg-white rounded-lg shadow-md md:mt-0 max-w-fit xl:p-0">
          <div className="flex flex-col items-center justify-center border px-9 py-8 rounded-md">
            <form>
              <div className="flex flex-col gap-3 ">
                <p
                  className="text-3xl mb-5"
                  style={{ fontFamily: "Delius Unicase, cursive" }}
                >
                  <b>Memory Math-O-Rama Login!</b>
                </p>
                <label for="username" className="block text-xl text-black">
                  Username:{" "}
                </label>
                <input
                  type="text"
                  id="username"
                  class=" bg-gray-50 border border-black text-black text-md focus:border-[#F2D13A] outline:none focus:outline p-2.5"
                  required
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
                <label for="password" className="block mb-1 text-xl text-black">
                  Password:{" "}
                </label>
                <input
                  type="password"
                  id="password"
                  class=" bg-gray-50 border border-black text-black text-md focus:border-[#F2D13A] focus:outline p-2.5"
                  required
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                {!loginSuccess && (
                  <div
                    className="flex items-center p-4 mt-3 text-red-900 rounded-lg bg-red-100"
                    role="alert"
                  >
                    <svg
                      className="flex-shrink-0 w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <div className="ms-3 text-sm font-medium">
                      <b>LOGIN FAILED - INCORRECT USERNAME OR PASSWORD!</b>
                    </div>
                  </div>
                )}
                <Button
                  className="mt-4 text-black bg-[#F2D13A] text-xl "
                  style={{ fontFamily: "Delius Unicase, cursive" }}
                  onClick={handleSubmit}
                >
                  LOG IN
                </Button>
              </div>
            </form>
          </div>
        </div>
        <p class="text-md mt-3 font-light text-black-500 py-3">
          Don't have an Account?{" "}
          <a
            href="/signup"
            class="font-medium text-primary-600 hover:underline underline-offset-4"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;
