import React from "react";
import UpdateBook from "./updatebook";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Update() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const getBookData = async () => {
    await axios
      .get(`http://localhost:3001/book/searchbyid/${id}`)
      .then((res) => {
        setData(res.data);
      });
  };
  useEffect(() => {
    getBookData();
  }, []);
  return data ? <UpdateBook preloadedvalues={data} /> : <div>loading...</div>;
}
