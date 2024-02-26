import { useState } from "react";
import { Input, Button } from "@material-tailwind/react";

const LoginPage = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (event) => {
    event.preventDefault(); 
    console.log(username);
    console.log(password);
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="flex flex-col items-center justify-center border px-9 py-8 rounded-md">
          <form>
            <div className="flex flex-col gap-3">
              <p className="text-xl font-bold">MEMORY MATH-O-RAMA LOGIN!</p>
              <Input
                label="Username"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
              <Input
                label="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
                <Button className="mt-5 bg-yellow-400 hover:bg-yellow-500" onClick={handleSubmit}>Log In</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;