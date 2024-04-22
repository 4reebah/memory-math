import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [usernameExists, setUsernameExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newAccount = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
    };

    fetch("http://127.0.0.1:5000/check/username", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAccount),
    })
      .then((response) => response.json())
      .then((usernameCheck) => {
        console.log(usernameCheck);
        if (usernameCheck.success) {
          console.log(usernameCheck.message);
          setUsernameExists(true);
        } else {
          console.log(usernameCheck.message);
          setUsernameExists(false);
        }
      })
      .catch((error) => console.log(error));

    fetch("http://127.0.0.1:5000/check/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAccount),
    })
      .then((response) => response.json())
      .then((emailCheck) => {
        console.log(emailCheck);
        if (emailCheck.success) {
          console.log(emailCheck.message);
          setEmailExists(true);
        } else {
          console.log(emailCheck.message);
          setEmailExists(false);
        }
      })
      .catch((error) => console.log(error));

    if (!emailExists && !usernameExists) {
      fetch("http://127.0.0.1:5000/add_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAccount),
      })
        .then((response) => response.json())
        .then((account) => {
          console.log(account);
          console.log(account.lastName);

          console.log(account.status);

          if (account.status === 200) {
            console.log(account.message);
            navigate("/login");
          } else {
            console.log(account.message);
          }
        })
        .catch((error) => console.log(error));
    }
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
        <div className="w-full flex-col bg-white rounded-lg shadow md:mt-0 max-w-fit xl:p-0">
          <div className="flex flex-col items-center justify-center border px-9 py-8 rounded-md">
            <form>
              <div className="flex flex-col gap-3">
                <p
                  className="text-3xl mb-5 font-bold"
                  style={{ fontFamily: "Delius Unicase, cursive" }}
                >
                  Memory Math-O-Rama Sign Up!
                </p>
                <label for="firstName" className="block text-xl text-black">
                  First Name:{" "}
                </label>
                <input
                  type="text"
                  id="firstName"
                  class=" bg-gray-50 border border-black text-black text-md focus:border-[#F2D13A] outline:none focus:outline p-2.5"
                  required
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                />

                <label for="lastName" className="block text-xl text-black">
                  Last Name:{" "}
                </label>
                <input
                  type="text"
                  id="lastName"
                  class=" bg-gray-50 border border-black text-black text-md focus:border-[#F2D13A] outline:none focus:outline p-2.5"
                  required
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                />
                <label for="email" className="block text-xl text-black">
                  Email:{" "}
                </label>
                <input
                  type="email"
                  id="email"
                  class=" bg-gray-50 border border-black text-black text-md focus:border-[#F2D13A] outline:none focus:outline p-2.5"
                  required
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
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
                {(emailExists || usernameExists) && (
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
                    {emailExists ? (
                      <div className="ms-3 text-sm font-medium">
                        <b>REGISTRATION FAILED - EMAIL ALREADY EXISTS!</b>
                      </div>
                    ) : (
                      <div className="ms-3 text-sm font-medium">
                        <b>REGISTRATION FAILED - USERNAME ALREADY EXISTS!</b>
                      </div>
                    )}
                  </div>
                )}
                <Button
                  className="mt-4 text-black bg-[#F2D13A] text-xl "
                  style={{ fontFamily: "Delius Unicase, cursive" }}
                  onClick={handleSubmit}
                >
                  Sign Up
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <p class="text-md mt-3 font-light text-black-500 py-3">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-primary-600 hover:underline underline-offset-4"
            >
              Login Here!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
