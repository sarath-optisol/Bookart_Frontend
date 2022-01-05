import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { Book } from "../components/BookCard/index";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
export default function UpdateBook({ preloadedvalues }: any) {
  const { id } = useParams();
  const [btnState, setBtnState] = useState(false);

  const [flag, setFlag] = useState(false);
  const [text, setText] = useState("");
  const [available, setAvailable] = useState("");
  const [data, setData] = useState<Book>();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<Book>({ defaultValues: preloadedvalues });
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

  function wordCheck(e: any) {
    if (e.target.value) {
      let text = e.target.value;
      let count = text.match(/(\w+)/g).length;
      if (count < 100) {
        setText("Word count should be above 100");
      } else if (count > 200) {
        setText("Word count should be below 200");
      } else {
        setText("");
      }
    }
    return;
  }
  toast.configure();
  return (
    <div className="container-sm mt-5">
      <div className="addbook">
        <p className="text-center display-4">Update book</p>
        <form
          onSubmit={handleSubmit(async (data) => {
            if (!text) {
              setBtnState(true);
              await axios
                .put(
                  `http://localhost:3001/book/update/${id}`,
                  {
                    name: data.name,
                    price: data.price,
                    authorname: data.authorname,
                    publisher: data.publisher,
                    image: data.image,
                    releasedate: data.releasedate,
                    language: data.language,
                    description: data.description,
                    quantity: data.quantity,
                    category: data.category,
                  },
                  {
                    headers: {
                      auth: `Bearer ${localStorage.getItem("admin")}`,
                    },
                  }
                )
                .then((res) => {
                  toast.success("Book Updated");
                  setFlag(true);
                  setBtnState(false);
                  setAvailable("Book Updated");
                })
                .catch((err) => {
                  toast.error(err.response.data.error);
                  setFlag(false);

                  setAvailable(err.response.data.error);
                });
            }
          })}
        >
          <div className="my-5">
            <div className="fields">
              <label htmlFor="name">Name</label>
              <input
                className=" border border-muted"
                // defaultValue={data?.name}
                {...register("name", {
                  pattern: {
                    value: /^[A-Za-z0-9]/,
                    message: "Name can only contain numbers and charcters ",
                  },
                  required: { value: true, message: "Name is required" },
                  maxLength: {
                    value: 50,
                    message: "The maximum length of Name is 50 characters",
                  },
                  minLength: {
                    value: 10,
                    message: "The minimum length of Name is 10 characters",
                  },
                })}
                id="name"
              ></input>
            </div>
            <div className="error">{errors.name?.message}</div>

            <br></br>
            <div className="fields">
              <label htmlFor="image">Book Image URL</label>
              <input
                // defaultValue={data?.image}
                className="border border-muted"
                {...register("image", {
                  required: { value: true, message: "Image URL is required" },
                })}
                id="image"
              ></input>
            </div>
            <div className="error">{errors.image?.message}</div>

            <br></br>
            <div className="fields">
              <label htmlFor="description">Description</label>
              <textarea
                // defaultValue={data?.description}
                id="description"
                {...register("description", {
                  required: true,
                })}
                className="form-control"
                onChange={wordCheck}
                style={{ height: "200px" }}
              ></textarea>
            </div>
            <div className="error">{text}</div>

            <br></br>
            <div className="fields">
              <label htmlFor="price">Price</label>
              <input
                // defaultValue={data?.price}
                className=" border border-muted"
                type={"number"}
                min={0}
                maxLength={10}
                {...register("price", {
                  required: { value: true, message: "price is required" },
                  maxLength: {
                    value: 9,
                    message: "The Maximum limit reached",
                  },
                  min: {
                    value: 0,
                    message: "The minimum value is 0",
                  },
                })}
                id="price"
              ></input>
            </div>
            <div className="error">{errors.price?.message}</div>

            <br></br>
            <div className="fields">
              <label htmlFor="authorname">Author name</label>
              <input
                // defaultValue={data?.authorname}
                className=" border border-muted"
                {...register("authorname", {
                  pattern: {
                    value: /^[A-Za-z ]/,
                    message: "Author name can only contain charcters ",
                  },
                  required: { value: true, message: "Author name is required" },
                  maxLength: {
                    value: 50,
                    message:
                      "The maximum length of author name is 50 characters",
                  },
                  minLength: {
                    value: 2,
                    message:
                      "The minimum length of author name is 2 characters",
                  },
                })}
                id="authorname"
              ></input>
            </div>
            <div className="error">{errors.authorname?.message}</div>

            <br></br>
            <div className="fields">
              <label htmlFor="publisher">Publisher name</label>
              <input
                // defaultValue={data?.publisher}
                className=" border border-muted"
                {...register("publisher", {
                  pattern: {
                    value: /^[A-Za-z]/,
                    message: "Publisher name can only contain characters ",
                  },
                  required: {
                    value: true,
                    message: "Publisher name is required",
                  },
                  maxLength: {
                    value: 50,
                    message:
                      "The maximum length of Publisher name is 50 characters",
                  },
                })}
                id="publisher"
              ></input>
            </div>
            <div className="error">{errors.publisher?.message}</div>

            <br></br>
            <div className="fields">
              <label htmlFor="language">Language</label>
              <input
                // defaultValue={data?.language}
                className=" border border-muted"
                {...register("language", {
                  pattern: {
                    value: /^[A-Za-z]/,
                    message: "Language can only contail alphabets ",
                  },
                  required: {
                    value: true,
                    message: "Language field is required",
                  },
                  maxLength: {
                    value: 50,
                    message:
                      "The maximum length of Language name is 50 characters",
                  },
                })}
                id="language"
              ></input>
            </div>
            <div className="error">{errors.language?.message}</div>

            <br></br>
            <div className="fields">
              <label htmlFor="category">Category</label>
              <input
                // defaultValue={data?.category}
                className="border border-muted"
                {...register("category", {
                  pattern: {
                    value: /^[A-Za-z]/,
                    message: "category name can only contain alphabets ",
                  },
                  required: {
                    value: true,
                    message: "category field is required",
                  },
                  maxLength: {
                    value: 50,
                    message: "The category length  is of 50 characters",
                  },
                })}
                id="category"
              ></input>
            </div>
            <div className="error">{errors.category?.message}</div>

            <br></br>
            <div className="fields">
              <label htmlFor="quantity">Quantity</label>
              <input
                // defaultValue={data?.quantity}
                className=" border border-muted"
                type={"number"}
                min={0}
                maxLength={10}
                {...register("quantity", {
                  required: {
                    value: true,
                    message: "quantity field is required",
                  },
                  maxLength: {
                    value: 10,
                    message: "The quantity length  is 10 characters",
                  },
                })}
                id="quantity"
              ></input>
            </div>
            <div className="error">{errors.quantity?.message}</div>

            <br></br>
            <div className="fields">
              <label htmlFor="releasedate">Release date</label>
              <input
                // defaultValue={data?.releasedate}
                className=" border border-muted"
                type={"number"}
                {...register("releasedate", {
                  required: {
                    value: true,
                    message: "Release date field is required",
                  },
                  max: {
                    value: new Date().getFullYear(),
                    message: "Release Date should be in past",
                  },
                })}
                id="releasedate"
              ></input>
            </div>
            <div className="error">{errors.releasedate?.message}</div>
            <div className="text-center">
              <div
                style={flag ? { color: "green" } : { color: "red" }}
                className="my-2 display-6"
              >
                {/* {available} */}
              </div>
              <button
                disabled={btnState}
                className="btn mt-5 btn-primary btn-lg"
                type="submit"
              >
                Update book
              </button>
              <ToastContainer limit={1} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
