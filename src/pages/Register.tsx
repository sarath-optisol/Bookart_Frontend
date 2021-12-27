import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
type formvalues = {
  username: string;
  password: string;
  email: string;
};
// toast.configure({ limit: 1 });
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formvalues>();
  const [fail, setFail] = useState("");
  const [sucess, setsucess] = useState("");

  const errMessage = () => {
    toast(fail, { theme: "dark" });
  };
  // console.log(token);
  // localStorage.setItem("token", token);
  return (
    <div className="container">
      <form
        onSubmit={handleSubmit(async (data) => {
          await axios({
            method: "POST",
            url: "http://localhost:3001/user/register",
            data: {
              username: data.username,
              password: data.password,
              email: data.email,
            },
          })
            .then((res) => {
              setsucess(
                res.data + " ,check for verfication message in your email"
              );
            })
            .catch((err) => {
              setFail(err.response.data.err);
              errMessage();
            });
        })}
      >
        <h1>Sign up</h1>
        <hr className="solid"></hr>
        <div className="fields">
          <label htmlFor="username">Username</label>
          <input
            {...register("username", {
              pattern: {
                value: /^[A-Za-z0-9]*$/,
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", {
              required: { value: true, message: "Email is required" },
            })}
            id="email"
          ></input>
        </div>
        <div className="error">{errors.email?.message}</div>
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

        {/* <div className="error">{fail}</div> */}
        {sucess}
        <div className="button">
          <button type="submit">Register</button>
          <ToastContainer limit={1} />
        </div>
        <div className="loginsign">
          <p>
            Already a member?
            <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
