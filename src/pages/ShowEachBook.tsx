import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Nav, Tab, Tabs } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { url } from "inspector";
export default function ShowEachBook() {
  const [availble, setAvailable] = useState("Out of stock");
  const [flag, setFlag] = useState(false);
  const [book, setBook] = useState({
    bookId: 0,
    name: "",
    price: 0,
    authorname: "",
    publisher: "",
    image: "",
    releasedate: "",
    language: "",
    description: " ",
    quantity: 0,
    category: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: null,
  });
  const addBookTocart = async () => {
    await axios
      .post(
        "http://localhost:3001/cart/create",
        {
          bookId: Number(id),
          quantity: 1,
        },
        { headers: { auth: `Bearer ${localStorage.getItem("token")}` ?? "" } }
      )
      .then((res) => {
        toast.success(res.data);
      })
      .catch((err) => {
        toast.error("Login to add books to cart");
      });
  };
  const { id } = useParams();
  const getBook = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:3001/book/searchbyid/${id}`,
    })
      .then((response) => {
        setBook(response.data);
        if (response.data.quantity) {
          setAvailable("In stock");
          setFlag(true);
        } else {
          setAvailable("Out of stock");
          setFlag(false);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getBook();
  }, []);

  return (
    <div className="container-sm  mt-2 mb-3">
      <div className="product-page mx-5">
        <div className="row">
          <div className="col-lg-5">
            <img
              src={book.image}
              alt={book.name}
              height={500}
              width={350}
            ></img>
          </div>
          <div className="col-lg-6">
            <h2 className="display-4 ">{book.name}</h2>
            <hr></hr>
            <div className="d-flex justify-content-between">
              <div>
                <h5 className=""> Author: {book.authorname}</h5>
                <div>
                  Availability:
                  <div
                    style={flag ? { color: "green" } : { color: "red" }}
                    className="m-0 p-0"
                  >
                    {availble}
                  </div>
                </div>
              </div>
              <div className="price lead text-success">
                <p className="m-0">Price:</p>Rs. ₹{book.price}
              </div>

              <div className="addcart mt-3">
                <button className="btn" onClick={addBookTocart}>
                  Add to cart
                </button>
                <ToastContainer limit={1} />
              </div>
            </div>
            <hr className="seprator mb-3"></hr>
            <div className="row">
              <div className="col-12">
                <div className="description">
                  <p>{book.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "block", width: 1000, padding: 30 }}>
          <Tabs defaultActiveKey="description" id="tab-whole" className="mb-3">
            <Tab eventKey="description" title="Description">
              <div className="book-description">
                <h3>Description</h3>
                <p>{book.description}</p>
              </div>
            </Tab>
            <Tab eventKey="details" title="Details">
              <div className="book-details">
                <div className="row">
                  <h3>Details</h3>

                  <div className="col-md-6">
                    <p className="lead">Book name: {book.name}</p>
                    <p className="lead">Author name: {book.authorname}</p>
                    <p className="lead">Publisher: {book.publisher}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="lead">Language: {book.language}</p>
                    <p className="lead">Category: {book.category}</p>
                    <p className="lead">Release date: {book.releasedate}</p>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
