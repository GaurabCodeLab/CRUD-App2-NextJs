"use client";
import { useState, useEffect } from "react";

function useFetch(url) {
  const [response, setResponse] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something Went Wrong");
        }
        return response.json();
      })
      .then((result) => setResponse(result))
      .catch((error) => {
        console.log(error);
      });
  }, [url]);
  return response;
}

export default useFetch;