import React from "react";
import { Card } from "react-bootstrap";

interface Book {
  bookId: number;
  name: string;
  price: number;
  description: string;
  image: string;
  authorname: string;
  publisher: string;
  releasedate: string;
  language: string;
  quantity: number;
  category: string;
}
interface BookProps {
  book: Book;
}

function BookCard({ book }: BookProps) {
  return (
    <Card border="muted" className="productimg transition-transform my-5 mx-1">
      {/* <Card.Header>{book.name}</Card.Header> */}
      <Card.Body>
        <Card.Img src={book.image} width={200} height={300}></Card.Img>
        <div className="m-2"></div>
        <Card.Title>
          <p className="text-center text-body"> {book.name}</p>
        </Card.Title>
        <Card.Text>
          <div className="d-flex justify-content-between">
            <small className="text-body">By: {book.authorname}</small>
            <p className="text-success">₹ {book.price}</p>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
export type { Book };
export default BookCard;
