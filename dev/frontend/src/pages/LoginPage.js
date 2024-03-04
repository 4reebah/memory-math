import { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://127.0.0.1:5000/users")
      .then((response) => response.json())
      .then((users) => {
        console.log(users);
        const userExists = users.find((user) => user[5] === username);
        if (userExists) {
          const passwordCheck = users.find((user) => user[6] === password);
          if (passwordCheck) {
            console.log("Login successful!");
            navigate("/game");
          } else {
            console.log("Incorrect Password!");
          }
        } else {
          console.log("Account does not exist!");
        }
      })
      .catch((error) => console.error("Error fetching user data:", error));
  };


  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full bg-white rounded-lg shadow-md md:mt-0 max-w-fit xl:p-0">
        <div className="flex flex-col items-center justify-center border px-9 py-8 rounded-md">
          <form>
            <div className="flex flex-col gap-3 ">
              <p className="text-3xl mb-5">MEMORY MATH-O-RAMA LOGIN!</p>
              <Input
                label="Username"
                style={{ color: "black", fontFamily: "Futura, sans-serif" }}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
              <Input
                label="Password"
                type="password"
                style={{ color: "black", fontFamily: "Futura, sans-serif" }}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
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
    </div>
  );
};
export default LoginPage;
