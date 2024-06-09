"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { BASE_API_URL } from "@/utils/constants";

function Read() {
  const [show, setShow] = useState(true);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [checkRadio, setCheckRadio] = useState("All");
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch(BASE_API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something Went Wrong");
        }
        return response.json();
      })
      .then((result) => {
        setUsers(result);
      });
  }

  function handleView(id) {
    setShow(false);
    const userDetails = users.find((value) => {
      return value._id == id;
    });
    setName(userDetails.name);
    setEmail(userDetails.email);
    setGender(userDetails.gender);
    setCheckRadio("All");
  }

  function handleDelete(id) {
    fetch(`${BASE_API_URL}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something Went Wrong");
        }
        return response.json();
      })
      .then(() => {
        fetchData();
        alert("Details Deleted Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleEdit(id) {
    router.push(`/update/${id}`);
  }

  function handleClose() {
    setShow(true);
  }

  const filteredUsers = users
    .filter((value) => {
      return value.name.toLowerCase().startsWith(search.toLowerCase());
    })
    .filter((value) => {
      if (checkRadio === "All") {
        return value;
      } else if (checkRadio === "Male") {
        return value.gender === "Male";
      } else {
        return value.gender === "Female";
      }
    });

  return (
    <>
      {show ? (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div className="container-fluid">
              <h1 className="navbar-brand my-0">RTK</h1>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                     href="/create"
                    >
                      Create Post
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      href="/"
                    >
                      All Post ({filteredUsers.length})
                    </Link>
                  </li>
                </ul>

                <form className="d-flex">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </form>
              </div>
            </div>
          </nav>

          <div
            className="container mx-auto text-center mt-4"
            style={{ width: "55vw" }}
          >
            <h1>All Data</h1>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="All"
                onChange={(event) => setCheckRadio(event.target.value)}
                checked={checkRadio === "All"}
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                All
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio3"
                value="Male"
                onChange={(event) => setCheckRadio(event.target.value)}
                checked={checkRadio === "Male"}
              />
              <label className="form-check-label" htmlFor="inlineRadio3">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="Female"
                onChange={(event) => setCheckRadio(event.target.value)}
                checked={checkRadio === "Female"}
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Female
              </label>
            </div>

            {filteredUsers.map((value, index) => (
              <div className="card mt-3 bg-light" key={index}>
                <div className="card-body">
                  <h5 className="card-title">{value.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {value.email}
                  </h6>
                  <p className="card-text">{value.gender}</p>
                  <a
                    href="#"
                    className="card-link btn btn-primary"
                    onClick={() => handleView(value._id)}
                  >
                    View
                  </a>
                  <a
                    className="card-link btn btn-success"
                    onClick={() => handleEdit(value._id)}
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="card-link btn btn-danger"
                    onClick={() => handleDelete(value._id)}
                  >
                    Delete
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div className="container-fluid">
              <h1 className="navbar-brand my-0">RTK</h1>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      href="/create"
                    >
                      Create Post
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      href="/"
                    >
                      All Post ({filteredUsers.length})
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div
            className="d-flex justify-content-center align-items-center border"
            style={{ height: "91vh" }}
          >
            <div
              className="card bg-light"
              style={{ width: "27rem", height: "12rem" }}
            >
              <div className="card-body text-center">
                <h5 className="card-title text-primary">{name}</h5>
                <p className="card-text mb-1">{email}</p>
                <p className="card-text mt-0">{gender}</p>
                <a href="#" className="btn btn-secondary" onClick={handleClose}>
                  Close
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Read;
