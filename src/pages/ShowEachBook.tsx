import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Nav, Tab, Tabs } from "react-bootstrap";
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
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    getBook();
  }, []);
  // const checkAvailability = () => {
  //   if (book.quantity) setAvailable("In stock");
  //   else setAvailable("Out of stock");
  // };
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
                <p>
                  Availability:
                  <p
                    style={flag ? { color: "green" } : { color: "red" }}
                    className="m-0 p-0"
                  >
                    {availble}
                  </p>
                </p>
              </div>
              <div className="price lead text-success">
                <p className="m-0">Price:</p>Rs. ₹{book.price}
              </div>

              <div className="addcart mt-3">
                <button className="btn">Add to cart</button>
              </div>
            </div>
            <hr className="seprator m-0"></hr>
            <div className="description">
              <p>{book.description}</p>
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
        {/* <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            className="nav-link active"
            id="nav-description-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-description"
            type="button"
            role="tab"
            aria-controls="nav-description"
            aria-selected="true"
          >
            Description
          </button>
          <button
            className="nav-link active"
            id="nav-details-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-details"
            type="button"
            role="tab"
            aria-controls="nav-details"
            aria-selected="true"
          >
            Details
          </button>
        </div>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active p-3"
            id="nav-description"
            role="tabpanel"
            aria-labelledby="nav-description-tab"
          >
            <h3>Description</h3>
            <p>{book.description}</p>
          </div>
          <div
            className="tab-pane fade show p-3"
            id="nav-details"
            role="tabpanel"
            aria-labelledby="nav-details-tab"
          >
            <h3>Details</h3>
            <p>{book.name}</p>
          </div>
        </div> */}
        {/* <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            this is the table coneteny
          </div>
          <div
            className="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            ...
          </div>
          <div
            className="tab-pane fade"
            id="contact"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            ...
          </div>
        </div> */}
      </div>
    </div>
  );
}

/* {book.price}
      {book.authorname}
      {book.publisher}
      {book.language}
      {book.description}
      {book.releasedate}
      {book.category} */
