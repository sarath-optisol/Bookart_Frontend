import React from "react";
import { useForm } from "react-hook-form";
import type { Book } from "../components/BookCard/index";
export default function Createbook() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<Book>();
  return <div className="container-sm"></div>;
}
