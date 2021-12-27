import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
type formvalues = {
  username: string;
  password: string;
};
toast.configure();
export default function AdminLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formvalues>();
  const [fail, setFail] = useState("");
  const errMessage = () => {
    toast(fail, { theme: "dark" });
  };

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit(async (data) => {
          await axios({
            method: "POST",
            url: "http://localhost:3001/admin/login",
            data: {
              username: data.username,
              password: data.password,
            },
          })
            .then((res) => {
              localStorage.setItem("token", res.data.token);
            })
            .catch((err) => {
              setFail(err.response.data.error);
              errMessage();
            });
        })}
      >
        <h1>Admin login</h1>
        <hr className="solid"></hr>
        <div className="fields">
          <label htmlFor="username">Username</label>
          <input
            {...register("username", {
              pattern: {
                value: /^[A-Za-z0-9-]*$/,
                message: "Username can only contain numbers and charcters ",
              },
              required: { value: true, message: "Username is required" },
              maxLength: {
                value: 20,
                message: "The maximum length of Username is 20 characters",
              },
              minLength: {
                value: 5,
                message: "The minimum length of Username is 5 characters",
              },
            })}
            id="username"
          ></input>
        </div>

        <div className="error">{errors.username?.message}</div>
        <div className="fields">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", {
              required: { value: true, message: "Password is required" },
              pattern: {
                value: /^[A-Za-z0-9$&+,:;=?@#|'<>.-^*()%!]*$/,
                message: "Password can only contain numbers and charcters",
              },
              maxLength: {
                value: 20,
                message: "The maximum length of Password is 20 characters",
              },
              minLength: {
                value: 5,
                message: "The minimum length of Password is 5 characters",
              },
            })}
            id="password"
          ></input>
        </div>
        <div className="error">{errors.password?.message}</div>
        <div className="button">
          <button type="submit">Login</button>
          <ToastContainer limit={1} />
        </div>
      </form>
    </div>
  );
}
