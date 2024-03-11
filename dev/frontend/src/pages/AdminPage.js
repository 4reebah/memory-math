import {useState, useEffect} from "react";
const AdminPage = () => {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch("http://127.0.0.1:5000/users")
          .then((response) => response.json())
          .then((users) => {
            console.log(users);
            setUsers(users);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }, []);
    
    return (
        <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Username</th>
          <th>Password</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user[0]}>
            <td>{user[0]}</td>
            <td>{user[1]}</td>
            <td>{user[2]}</td>
            <td>{user[3]}</td>
            <td>{user[4]}</td>
            <td>{user[5]}</td>
          </tr>
        ))}
      </tbody>
    </table>
    )
}
export default AdminPage;