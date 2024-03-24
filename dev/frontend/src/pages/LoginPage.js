import { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

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
    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((login) => {
        if (login.success) {
          console.log("Login Successful!");
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
    <div className="flex items-center flex-col justify-center h-screen">
      <div className="w-full bg-white rounded-lg shadow-md md:mt-0 max-w-fit xl:p-0">
        <div className="flex flex-col items-center justify-center border px-9 py-8 rounded-md">
          <form>
            <div className="flex flex-col gap-3 ">
              <p className="text-3xl mb-5">
                <b>Memory Math-O-Rama Login!</b>
              </p>
              <Input
                label="Username"
                style={{ color: "black", fontFamily: "" }}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
              <Input
                label="Password"
                type="password"
                style={{
                  color: "black",
                  fontFamily: "Delius Unicase, cursive",
                }}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              {!(loginSuccess) && (
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
                className="mt-5 font-loveYaLikeASister text-black bg-[#F2D13A] text-xl"
                onClick={handleSubmit}
              >
                LOG IN
              </Button>
            </div>
          </form>
        </div>
      </div>
      <p class="text-sm mt-3 font-light text-black-500 py-3">
        Don't have an Account?{" "}
        <a href="/signup" class="font-medium text-primary-600 hover:font-bold">
          Sign Up
        </a>
      </p>
    </div>
  );
};
export default LoginPage;
