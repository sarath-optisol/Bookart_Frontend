import React from "react";
import { Card } from "react-bootstrap";

interface Book {
  name: string;
  price: number;
  description: string;
}
interface BookProps {
  book: Book;
}

function BookCard({ book }: BookProps) {
  return (
    <>
      <Card border="primary">
        <Card.Header>{book.name}</Card.Header>
        <Card.Body>
          <Card.Title>
            {book.name} - {book.price}
          </Card.Title>
          <Card.Text>
            <h3>{book.description}</h3>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default BookCard;
