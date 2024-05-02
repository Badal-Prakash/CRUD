import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function UpdateUser() {
  const { id } = useParams();
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [age, SetAge] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .patch("http://127.0.0.1:3000/user/" + id)
      .then((res) => {
        console.log(res.data["user"]);
        SetName(res.data["user"].name);
        SetEmail(res.data["user"].email);
        SetAge(res.data["user"].age);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios
      .patch("http://127.0.0.1:3000/user/" + id, { name, email, age })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="d-flex vh-100 vw-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleUpdate}>
          <h2>Update User</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e) => {
                SetName(e.target.value);
              }}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => {
                SetEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Age</label>
            <input
              type="text"
              placeholder="Enter Age"
              className=" form-control"
              value={age}
              onChange={(e) => {
                SetAge(e.target.value);
              }}
            />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
