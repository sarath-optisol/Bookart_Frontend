import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";
export default function EachBook() {
  const [books, setBooks] = useState([
    {
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
    },
  ]);
  const [fail, setFail] = useState("");
  const getAllBooks = async () => {
    await axios({ method: "GET", url: "http://localhost:3001/book/all" })
      .then((response) => {
        setBooks(response.data);
      })
      .catch((err) => {
        setFail(err.response.data);
      });
  };

  useEffect(() => {
    getAllBooks();
  }, []);
  // const bookss =;

  return (
    <div>
      <Row>
        {books.map((book) => (
          <Col className="col-sm-6 col-md-3">
            <Link className="text-decoration-none" to={`/book/${book.bookId}`}>
              <BookCard key={book.bookId} book={book} />
            </Link>
          </Col>
        ))}
      </Row>
      {fail}
    </div>
  );
}
