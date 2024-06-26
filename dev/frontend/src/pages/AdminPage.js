import { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { setAnimation } from "@material-tailwind/react/components/Tabs/TabsContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  const [adminStatus, setAdminStatus] = useState(0);
  const [adminUsers, setAdminUsers] = useState([]);
  const [nonAdminUsers, setNonAdminUsers] = useState([]);
  const isAuthenticated = !!Cookies.get("auth");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/users/admin")
      .then((response) => response.json())
      .then((users) => {
        setAdminUsers(users);
        console.log(users);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/users/nonadmin")
      .then((response) => response.json())
      .then((users) => {
        setNonAdminUsers(users);
        console.log(users);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  useEffect(() => {
    if (Cookies.get("auth")) {
      const authCookie = Cookies.get("auth");

      const adminFromCookie = JSON.parse(authCookie).adminStatus;
      setAdminStatus(adminFromCookie);
    }
  }, []);

  const deleteUser = (userId) => {
    if (
      window.confirm(
        "Before proceeding, please confirm: Would you like to delete the user with ID " +
          userId +
          "?"
      ) === true
    ) {
      const deleteAccount = {
        user_id: userId,
      };
      fetch("http://127.0.0.1:5000/api/deleteUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteAccount),
      })
        .then((response) => response.json())
        .then((deleteUser) => {
          if (deleteUser.success) {
            console.log("Delete Successful!");
            window.location.reload();
          } else {
            console.log("Delete Failed: ", deleteUser.message);
          }
        })
        .catch((error) => console.log(error));
      console.log(`Deleting user with ID: ${userId}`);
    }
  };

  const changeStatus = (userId) => {
    if (
      window.confirm(
        "Before proceeding, please confirm: Would you like to change the user with ID " +
          userId +
          " to an admin?"
      ) === true
    ) {
      const changeAccount = {
        user_id: userId,
      };
      fetch("http://127.0.0.1:5000/api/update_admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changeAccount),
      })
        .then((response) => response.json())
        .then((changeUser) => {
          console.log(changeUser);
          if (changeUser.success) {
            console.log("Status Changed Successfully!");
            window.location.reload();
          } else {
            console.log("Status Change Failed: ", changeUser.message);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  if (!isAuthenticated) {
    setTimeout(() => {
      navigate("/login");
    }, 0);
    return null;
  }

  return (
    <div className="bg-yellow-50">
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
          <Button
            className=" text-black bg-[#F2D13A] text-md"
            style={{ fontFamily: "Delius Unicase, cursive" }}
            onClick={() => navigate("/admin")}
          >
            Admin Dashboard
          </Button>
          <Button
            className=" text-black bg-[#F2D13A] text-md"
            style={{ fontFamily: "Delius Unicase, cursive" }}
            onClick={() => navigate("/")}
          >
            Log Out
          </Button>
        </div>
      </nav>

      <div className="bg-yellow-50 h-screen">
        <div
          className="flex justify-center text-xl mt-10"
          style={{ fontFamily: "Delius Unicase, cursive" }}
        >
          <b>ADMIMISTRATIVE USERS</b>
        </div>
        <div className="flex justify-center items-start">
          <table className="mt-3 w-3/4 table-auto text-center border-collapse border border-slate-500 border-black ">
            <thead className="bg-[#ABCBE2]">
              <tr
                className="border-b border-black text-bold"
                style={{ fontFamily: "Delius Unicase, cursive" }}
              >
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">FIRST NAME</th>
                <th className="px-4 py-2">LAST NAME</th>
                <th className="px-4 py-2">EMAIL</th>
                <th className="px-4 py-2">USERNAME</th>
              </tr>
            </thead>
            <tbody>
              {adminUsers.map((user) => (
                <tr key={user.id} className="border-b border-black bg-gray-100">
                  <td className="px-4 py-2">{user.USER_ID}</td>
                  <td className="px-4 py-2">{user.FIRST_NAME}</td>
                  <td className="px-4 py-2">{user.LAST_NAME}</td>
                  <td className="px-4 py-2">{user.EMAIL}</td>
                  <td className="px-4 py-2">{user.USERNAME}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className="flex justify-center text-xl mt-10"
          style={{ fontFamily: "Delius Unicase, cursive" }}
        >
          <b>NON-ADMIMISTRATIVE USERS</b>
        </div>
        <div className="flex justify-center items-start">
          <table className="mt-3 w-3/4 table-auto text-center border-collapse border border-slate-500 border-black ">
            <thead className="bg-[#ABCBE2]">
              <tr
                className="border-b border-black text-bold"
                style={{ fontFamily: "Delius Unicase, cursive" }}
              >
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">FIRST NAME</th>
                <th className="px-4 py-2">LAST NAME</th>
                <th className="px-4 py-2">EMAIL</th>
                <th className="px-4 py-2">USERNAME</th>
                <th className="px-4 py-2">DELETE USER</th>
                <th className="px-4 py-2">UPDATE USER STATUS</th>
              </tr>
            </thead>
            <tbody>
              {nonAdminUsers.map((user) => (
                <tr key={user.id} className="border-b border-black bg-gray-100">
                  <td className="px-4 py-2">{user.USER_ID}</td>
                  <td className="px-4 py-2">{user.FIRST_NAME}</td>
                  <td className="px-4 py-2">{user.LAST_NAME}</td>
                  <td className="px-4 py-2">{user.EMAIL}</td>
                  <td className="px-4 py-2">{user.USERNAME}</td>
                  <td className="px-4 py-2">
                    <Button
                      className=" text-black  bg-[#F2D13A]"
                      onClick={() => deleteUser(user.USER_ID)}
                      style={{ fontFamily: "Delius Unicase, cursive" }}
                    >
                      DELETE
                    </Button>
                  </td>
                  <td className="px-4 py-2">
                    <Button
                      className=" text-black  bg-[#F2D13A]"
                      onClick={() => changeStatus(user.USER_ID)}
                      style={{ fontFamily: "Delius Unicase, cursive" }}
                    >
                      CHANGE TO ADMIN
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default AdminPage;
