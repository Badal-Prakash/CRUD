import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/")
      .then((res) => setUsers(res.data["users"]))
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const handleClick = (id) => {
    axios
      .delete("http://127.0.0.1:3000/user/" + id)
      .then(() => {
        console.log("User deleted");
      })
      .catch((err) => {
        err.message;
      });
    window.location.reload(true);
  };
  return (
    <div className="d-flex vh-100 vw-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">Name</th>
              <th className="text-center">Email</th>
              <th className="text-center">Age</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.name}>
                  <td className="text-center">{user.name}</td>
                  <td className="text-center">{user.email}</td>
                  <td className="text-center">{user.age}</td>
                  <td>
                    <Link
                      to={`/update/${user._id}`}
                      className="btn btn-success"
                    >
                      Update
                    </Link>
                    <button
                      className="btn
                    btn-success"
                      onClick={(e) => handleClick(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
