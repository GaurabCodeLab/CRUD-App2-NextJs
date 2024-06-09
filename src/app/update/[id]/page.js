"use client";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import useFetch from '@/customHooks/useFetch';
import { useState, useEffect } from 'react';
import { BASE_API_URL } from '@/utils/constants';

function Update(context){
  const users = useFetch("http://localhost:3000/api");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const router = useRouter();
  const id = context.params.id;
  useEffect(()=>{
    fetch(`${BASE_API_URL}/${id}`)
    .then((response)=>{
      if(!response.ok){
        throw new Error("Something Went Wrong");
      };
      return response.json();
    })
    .then((result)=>{
      setName(result.name);
      setEmail(result.email);
      setGender(result.gender);
    })
  }, [id]);

  const updatedUser = {name, email, gender};

  function handleSubmit(event){
    event.preventDefault();
    fetch(`${BASE_API_URL}/${id}`, {
      method : "PUT",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(updatedUser)

    })
    .then((response)=>{
      if(!response.ok){
        throw new Error("Something Went Wrong");
      };
      return response.json();
    })
    .then((result)=>{
      alert("Data Updated Successfully");
      router.push("/");
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
          <Link className="nav-link active" aria-current="page" href="/">All Post ({users.length})</Link>
        </li>
      </ul>

    </div>
  </div>
</nav>

        <div className="container mx-auto text-center mt-3 py-3 bg-light" style={{width: "65vw"}}>
        <h2>Edit The Data</h2>
        <hr style={{width : "30%"}} className="mx-auto" />
        <form className="mt-3" onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label fs-4">Name</label>
    <input type="text" className="form-control text-center" id="exampleInputEmail1" value={name} onChange={(event)=>setName(event.target.value)} aria-describedby="emailHelp" placeholder="Enter Your Name" required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label fs-4">Email Address</label>
    <input type="email" className="form-control text-center" id="exampleInputPassword1" value={email} onChange={(event)=>setEmail(event.target.value)} placeholder="Enter Your Email" required/>
  </div>
  <div className="form-check d-flex justify-content-center gap-2 mb-2">
  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="Male" onChange={(event)=>setGender(event.target.value)} checked = {gender === "Male"} />
  <label className="form-check-label" htmlFor="exampleRadios1">
        Male
  </label>
</div>
<div className="form-check d-flex justify-content-center gap-2 mb-3">
  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="Female" onChange={(event)=>setGender(event.target.value)} checked = {gender === "Female"} />
  <label className="form-check-label" htmlFor="exampleRadios2">
    Female
  </label>
</div>
  <button type="submit" className="btn btn-primary me-4">Submit</button>
  <Link href="/">
  <button type="button" className="btn btn-dark">Back</button>
  </Link>
</form>
        </div>
        </>
    )
}

export default Update;