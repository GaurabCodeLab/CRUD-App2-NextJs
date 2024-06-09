"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import useFetch from "@/customHooks/useFetch";
import { BASE_API_URL } from "@/utils/constants";

function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const users = useFetch(BASE_API_URL);
  const [num, setNum] = useState(users.length);
  useEffect(()=>{
    setNum(users.length);
  }, [users]);

  const newUser = {name, email, gender};
 
  function handleSubmit(event){
    event.preventDefault();
    fetch(BASE_API_URL, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(newUser)
    })
    .then((response)=>{
      if(!response.ok){
        throw new Error("Something Went Wrong");
      };
      return response.json();
    })
    .then((result)=>{
      alert("Data Created Successfully");
      setName("");
      setEmail("");
      setGender("");
      setNum(num+1);
    })
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
  <div className="container-fluid">
    <h1 className="navbar-brand my-0">RTK</h1>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" href="/create">Create Post</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" href="/">All Post ({num})</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
      
      <div
        className="container mx-auto text-center mt-3 py-3 bg-light"
        style={{ width: "65vw" }}
      >
        <h2>Fill The Data</h2>
        <hr style={{ width: "30%" }} className="mx-auto" />
        <form className="mt-3" onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label fs-4">
              Name
            </label>
            <input
              type="text"
              value={name}
              class="form-control text-center"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Your Name"
              onChange={(event)=>setName(event.target.value)}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label fs-4">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              class="form-control text-center"
              id="exampleInputPassword1"
              placeholder="Enter Your Email"
              onChange={(event)=>setEmail(event.target.value)}
            />
          </div>
          <div class="form-check d-flex justify-content-center gap-2 mb-2">
            <input
              class="form-check-input"
              type="radio"
              name="exampleRadios"
              id="exampleRadios1"
              value="Male"
              onChange={(event)=>setGender(event.target.value)}
              checked = {gender === "Male"}
            />
            <label class="form-check-label" for="exampleRadios1">
              Male
            </label>
          </div>
          <div class="form-check d-flex justify-content-center gap-2 mb-3">
            <input
              class="form-check-input"
              type="radio"
              name="exampleRadios"
              id="exampleRadios2"
              value="Female"
              onChange={(event)=>setGender(event.target.value)}
              checked = {gender === "Female"}
            />
            <label class="form-check-label" for="exampleRadios2">
              Female
            </label>
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Create;
