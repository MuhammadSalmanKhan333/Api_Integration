import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }

    // axios
    // .get("http://localhost:3000/users")
    // .then((res) => setData(res.data))
    // .catch((error) => console.log(error));
  };
  useEffect(() => {
    getData();
  }, []);

  const navigate = useNavigate();

  const handelNavigation = (id) => {
    navigate("/update/" + id);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("would you like to delete the record");
    if (confirm) {
      axios
        .delete("http://localhost:3000/users/" + id)
        .then((res) => getData())
        .catch((err) => console.log(err));
    }
  };

  if (!data) {
    return <h2 className="text-danger m-auto">data not found</h2>;
  }
  console.log(data);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <h1>List of Users</h1>
      <div className="w-75 rounded bg-white border shadow p-4">
        <div className="d-flex justify-content-end">
          <Link to="/create" className="btn btn-success">
            Add +
          </Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="ml-3">ID</th>
              <th className="mr-5rem">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>{d.phone}</td>
                <td>
                  <Link
                    to={`/read/${d.id}`}
                    className="btn btn-sm btn-info me-2"
                  >
                    Read
                  </Link>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handelNavigation(d.id)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(d.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
